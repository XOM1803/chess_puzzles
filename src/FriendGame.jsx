import { useEffect, useState } from 'react'
import { Chess } from 'chess.js'
import GameBoard from './GameBoard.jsx'
import { createGame, joinGame, watchGame, sendMove, finishGame, playerId, inviteLink } from './online.js'
import { haptic } from './telegram.js'

const SAVE_KEY = 'online_game_v1'

function savedGameId() {
  try {
    return localStorage.getItem(SAVE_KEY)
  } catch {
    return null
  }
}

function saveGameId(id) {
  try {
    if (id) localStorage.setItem(SAVE_KEY, id)
    else localStorage.removeItem(SAVE_KEY)
  } catch {
    // storage unavailable
  }
}

function replay(moves) {
  const game = new Chess()
  for (const m of moves ? moves.split(' ') : []) {
    game.move({ from: m.slice(0, 2), to: m.slice(2, 4), promotion: m[4] || 'q' })
  }
  return game
}

// Result code after a move, or null if the game goes on
function resultCode(game) {
  if (game.isCheckmate()) return game.turn() === 'w' ? 'mate_b' : 'mate_w' // the side to move is mated
  if (game.isStalemate()) return 'draw_stalemate'
  if (game.isThreefoldRepetition()) return 'draw_repetition'
  if (game.isInsufficientMaterial()) return 'draw_material'
  if (game.isDraw()) return 'draw'
  return null
}

function resultText(code, myColor) {
  const winner = { mate_w: 'w', mate_b: 'b', resign_b: 'w', resign_w: 'b' }[code]
  if (code === 'cancel') return 'Игра отменена'
  if (winner) {
    const how = code.startsWith('mate') ? 'Мат' : 'Соперник сдался'
    if (winner === myColor) return `${how}! Ты победил(а) 🎉`
    return code.startsWith('mate') ? 'Мат. Ты проиграл(а)' : 'Ты сдался(ась)'
  }
  return {
    draw_stalemate: 'Пат — ничья',
    draw_repetition: 'Троекратное повторение — ничья',
    draw_material: 'Недостаточно фигур — ничья',
  }[code] || 'Ничья'
}

function share(id) {
  const link = inviteLink(id)
  const text = 'Сыграем в шахматы? ♟️'
  const tg = window.Telegram?.WebApp
  try {
    if (tg?.openTelegramLink) {
      tg.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`,
      )
      return
    }
  } catch {
    // fall back below
  }
  if (navigator.share) navigator.share({ text, url: link }).catch(() => {})
  else copy(link)
}

function copy(text) {
  try {
    navigator.clipboard.writeText(text)
    haptic('success')
  } catch {
    // clipboard unavailable
  }
}

// props: joinId (game id from an invite link, or null), onBack()
function FriendGame({ joinId, onBack }) {
  const [gameId, setGameId] = useState(joinId || savedGameId())
  const [game, setGame] = useState(undefined) // undefined = loading, null = not found
  const [colorChoice, setColorChoice] = useState('random')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [pendingMoves, setPendingMoves] = useState(null) // my move shown before the server confirms
  const [confirmResign, setConfirmResign] = useState(false)
  const [copied, setCopied] = useState(false)
  const me = playerId()

  // Subscribe to the game
  useEffect(() => {
    if (!gameId) return
    setGame(undefined)
    setError(null)
    let unsubscribe = () => {}
    try {
      unsubscribe = watchGame(
        gameId,
        (data) => {
          setGame(data)
          setPendingMoves(null)
        },
        () => setError('Нет связи с сервером. Проверь интернет.'),
      )
    } catch {
      setError('Нет связи с сервером. Проверь интернет.')
    }
    return () => unsubscribe()
  }, [gameId])

  // Join someone else's game when it's waiting for an opponent
  useEffect(() => {
    if (!game || !gameId) return
    const inGame = game.white === me || game.black === me
    if (inGame) saveGameId(gameId)
    else if (game.status === 'waiting') joinGame(gameId).catch(() => setError('Не получилось присоединиться'))
  }, [game, gameId, me])

  async function create() {
    setBusy(true)
    setError(null)
    try {
      const color = colorChoice === 'random' ? (Math.random() < 0.5 ? 'w' : 'b') : colorChoice
      const id = await createGame(color)
      saveGameId(id)
      setGameId(id)
      haptic('success')
    } catch {
      setError('Не получилось создать игру. Проверь интернет.')
    }
    setBusy(false)
  }

  function leave() {
    if (game && game.status === 'waiting' && (game.white === me || game.black === me)) {
      finishGame(gameId, 'cancel').catch(() => {})
    }
    saveGameId(null)
    setGameId(null)
    setGame(undefined)
    setConfirmResign(false)
  }

  // ---- No game yet: create one ----
  if (!gameId) {
    return (
      <div className="setup">
        <div className="setup-title">Я играю</div>
        <div className="choice-row">
          {[
            { id: 'w', title: '♔ Белыми' },
            { id: 'random', title: '🎲 Случайно' },
            { id: 'b', title: '♚ Чёрными' },
          ].map((c) => (
            <button
              key={c.id}
              className={'choice' + (colorChoice === c.id ? ' active' : '')}
              onClick={() => setColorChoice(c.id)}
            >
              {c.title}
            </button>
          ))}
        </div>
        <div className="setup-hint">Создай игру и отправь другу ссылку. Партия начнётся, когда он её откроет.</div>
        {error && <div className="message bad">{error}</div>}
        <div className="buttons">
          <button className="secondary" onClick={onBack}>
            ← Назад
          </button>
          <button className="primary" onClick={create} disabled={busy}>
            {busy ? 'Создаю…' : 'Создать игру'}
          </button>
        </div>
      </div>
    )
  }

  // ---- Loading / errors ----
  if (error || game === undefined || game === null) {
    return (
      <div className="soon">
        <div className="soon-icon">{error || game === null ? '😕' : '⏳'}</div>
        <div className="soon-text">
          {error || (game === null ? 'Игра не найдена. Возможно, ссылка неверная.' : 'Загружаю игру…')}
        </div>
        {(error || game === null) && (
          <button className="secondary back-button" onClick={leave}>
            ← Назад
          </button>
        )}
      </div>
    )
  }

  const myColor = game.white === me ? 'w' : game.black === me ? 'b' : null

  if (!myColor) {
    return (
      <div className="soon">
        <div className="soon-icon">🙈</div>
        <div className="soon-text">
          {game.status === 'waiting' ? 'Присоединяюсь…' : 'В этой партии уже играют двое.'}
        </div>
        <button className="secondary back-button" onClick={leave}>
          ← Назад
        </button>
      </div>
    )
  }

  // ---- Waiting for the friend ----
  if (game.status === 'waiting') {
    const link = inviteLink(gameId)
    return (
      <div className="soon">
        <div className="soon-icon">⏳</div>
        <div className="soon-title">Ждём соперника</div>
        <div className="soon-text">Отправь другу ссылку. Игра начнётся сама, когда он её откроет.</div>
        <div className="invite-link">{link}</div>
        <div className="buttons">
          <button
            className="secondary"
            onClick={() => {
              copy(link)
              setCopied(true)
            }}
          >
            {copied ? '✓ Скопировано' : '📋 Копировать'}
          </button>
          <button className="primary" onClick={() => share(gameId)}>
            📤 Отправить
          </button>
        </div>
        <button className="link-button" onClick={leave}>
          Отменить игру
        </button>
      </div>
    )
  }

  // ---- The game ----
  const moves = pendingMoves ?? (game.moves || '')
  const board = replay(moves)
  const moveList = moves ? moves.split(' ') : []
  const last = moveList[moveList.length - 1]
  const over = game.status === 'over'
  const myTurn = board.turn() === myColor && !over && pendingMoves === null
  const opponentName = (myColor === 'w' ? game.blackName : game.whiteName) || 'Соперник'

  let status = myTurn ? 'Твой ход' : 'Ход соперника'
  if (board.inCheck() && !over) status = myTurn ? 'Шах! Твой ход' : 'Шах!'

  function onMove(from, to) {
    if (!myTurn) return false
    const g = new Chess(board.fen())
    let move
    try {
      move = g.move({ from, to, promotion: 'q' })
    } catch {
      return false
    }
    const before = game.moves || ''
    const next = before ? `${before} ${move.lan}` : move.lan
    setPendingMoves(next)
    haptic('select')
    sendMove(gameId, before, move.lan, resultCode(g))
      .then((ok) => {
        if (!ok) setPendingMoves(null)
      })
      .catch(() => {
        setPendingMoves(null)
        haptic('error')
      })
    return true
  }

  function resign() {
    if (!confirmResign) {
      setConfirmResign(true)
      return
    }
    finishGame(gameId, myColor === 'w' ? 'resign_w' : 'resign_b').catch(() => {})
    setConfirmResign(false)
  }

  return (
    <>
      <div className="task">
        <div className="task-number">👥 против {opponentName}</div>
        <div className={'task-goal' + (over ? ' result' : '')}>
          {over ? resultText(game.result, myColor) : status}
        </div>
      </div>

      <GameBoard
        fen={board.fen()}
        orientation={myColor === 'w' ? 'white' : 'black'}
        canMove={myTurn}
        lastMove={last ? { from: last.slice(0, 2), to: last.slice(2, 4) } : null}
        onMove={onMove}
      />

      <div className="buttons">
        {over ? (
          <button className="primary" onClick={leave}>
            Новая игра
          </button>
        ) : (
          <button className={confirmResign ? 'danger' : 'secondary'} onClick={resign}>
            {confirmResign ? 'Точно сдаться?' : '🏳️ Сдаться'}
          </button>
        )}
      </div>
    </>
  )
}

export default FriendGame
