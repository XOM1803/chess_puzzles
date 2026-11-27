// Online games between two players (Firebase Realtime Database).
// Data: games/<id> = { createdAt, updatedAt, status, moves, white, black, whiteName, blackName, result }
//   status: 'waiting' (no opponent yet) | 'playing' | 'over'
//   moves:  UCI moves separated by spaces, e.g. "e2e4 e7e5"
//   white / black: player ids

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue, runTransaction, set } from 'firebase/database'

// Public web config (not a secret: access is controlled by database rules)
const firebaseConfig = {
  apiKey: 'AIzaSyBigiL8isVFlzbcmi6vP3zOBKvs_HJf1Io',
  authDomain: 'chess-b8cf0.firebaseapp.com',
  databaseURL: 'https://chess-b8cf0-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'chess-b8cf0',
  storageBucket: 'chess-b8cf0.firebasestorage.app',
  messagingSenderId: '819054179110',
  appId: '1:819054179110:web:3ea5a25aa632a60a9cc7e7',
}

let db = null
function database() {
  if (!db) db = getDatabase(initializeApp(firebaseConfig))
  return db
}

const gameRef = (id) => ref(database(), `games/${id}`)

// ---- Who am I ----
const tgUser = typeof window !== 'undefined' ? window.Telegram?.WebApp?.initDataUnsafe?.user : null

export function playerId() {
  if (tgUser?.id) return 'tg' + tgUser.id
  try {
    let id = localStorage.getItem('player_id')
    if (!id) {
      id = 'p' + Math.random().toString(36).slice(2, 12)
      localStorage.setItem('player_id', id)
    }
    return id
  } catch {
    return 'p' + Math.random().toString(36).slice(2, 12)
  }
}

export function playerName() {
  return (tgUser?.first_name || 'Игрок').slice(0, 30)
}

function newGameId() {
  const chars = 'abcdefghijkmnpqrstuvwxyz23456789'
  let id = ''
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)]
  return id
}

// ---- Actions ----

// Create a game; color = 'w' | 'b'. Returns the game id.
export async function createGame(color) {
  const id = newGameId()
  const now = Date.now()
  const me = playerId()
  const data = { createdAt: now, updatedAt: now, status: 'waiting', moves: '' }
  if (color === 'w') {
    data.white = me
    data.whiteName = playerName()
  } else {
    data.black = me
    data.blackName = playerName()
  }
  await set(gameRef(id), data)
  return id
}

// Take the free seat in someone else's game (does nothing if I'm already in it).
export async function joinGame(id) {
  const me = playerId()
  await runTransaction(gameRef(id), (game) => {
    if (!game) return game // not loaded yet: Firebase retries with the server value
    if (game.white === me || game.black === me) return // already in: no change
    if (game.status !== 'waiting') return // full or finished
    if (!game.white) {
      game.white = me
      game.whiteName = playerName()
    } else if (!game.black) {
      game.black = me
      game.blackName = playerName()
    } else return
    game.status = 'playing'
    game.updatedAt = Date.now()
    return game
  })
}

// Subscribe to game changes. callback(game | null). Returns unsubscribe function.
export function watchGame(id, callback, onError) {
  return onValue(
    gameRef(id),
    (snap) => callback(snap.val()),
    (err) => onError && onError(err),
  )
}

// Add a move, only if nobody changed the game in between (expectedMoves = moves I saw).
export async function sendMove(id, expectedMoves, uci, result) {
  const res = await runTransaction(gameRef(id), (game) => {
    if (!game) return game // not loaded yet: Firebase retries with the server value
    if (game.status !== 'playing' || (game.moves || '') !== expectedMoves) return
    game.moves = expectedMoves ? `${expectedMoves} ${uci}` : uci
    game.updatedAt = Date.now()
    if (result) {
      game.status = 'over'
      game.result = result
    }
    return game
  })
  return res.committed
}

// Finish the game (resign, or cancel a game nobody joined)
export async function finishGame(id, result) {
  await runTransaction(gameRef(id), (game) => {
    if (!game) return game
    if (game.status === 'over') return
    game.status = 'over'
    game.result = result
    game.updatedAt = Date.now()
    return game
  })
}

export function inviteLink(id) {
  return `https://t.me/chesskage_bot/puzzles?startapp=game_${id}`
}
