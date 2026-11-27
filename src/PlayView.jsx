import { useEffect, useRef, useState } from 'react'
import { Chess } from 'chess.js'
import GameBoard, { gameResult } from './GameBoard.jsx'
import { ENGINE_LEVELS, getBestMove, preloadEngine } from './engine.js'
import { haptic } from './telegram.js'

const SAVE_KEY = 'vs_computer_v1'

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY)) || null
  } catch {
    return null
  }
}

function save(data) {
  try {
    if (data) localStorage.setItem(SAVE_KEY, JSON.stringify(data))
    else localStorage.removeItem(SAVE_KEY)
  } catch {
    // storage unavailable
  }
}

// Replay a list of UCI moves from the start position
function replay(moves) {
  const game = new Chess()
  for (const m of moves) game.move({ from: m.slice(0, 2), to: m.slice(2, 4), promotion: m[4] || 'q' })
  return game
}

function PlayView() {
  const saved = loadSaved()
  const [screen, setScreen] = useState(saved ? 'game' : 'menu') // menu | setup | game | friend
  const [level, setLevel] = useState(saved?.level || 'amateur')
  const [colorChoice, setColorChoice] = useState('w') // w | b | random
  const [myColor, setMyColor] = useState(saved?.color || 'w')
  const [moves, setMoves] = useState(saved?.moves || [])
  const [thinking, setThinking] = useState(false)
  const [engineError, setEngineError] = useState(false)
  const gameId = useRef(0) // changes on new game / undo, so late engine replies are ignored

  const game = replay(moves)
  const result = gameResult(game, myColor)
  const last = moves[moves.length - 1]
  const lastMove = last ? { from: last.slice(0, 2), to: last.slice(2, 4) } : null
  const myTurn = game.turn() === myColor

  useEffect(() => {
    preloadEngine()
  }, [])

  // Save the game after every move
  useEffect(() => {
    if (screen === 'game') save({ level, color: myColor, moves })
  }, [screen, level, myColor, moves])

  // Computer's turn
  useEffect(() => {
    if (screen !== 'game' || result || myTurn) return
    const id = gameId.current
    setThinking(true)
    getBestMove(game.fen(), level)
      .then((uci) => {
        if (id !== gameId.current || !uci) return
        setMoves((prev) => [...prev, uci])
        haptic('select')
      })
      .catch(() => setEngineError(true))
      .finally(() => {
        if (id === gameId.current) setThinking(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, moves, myTurn, result])

  function onMove(from, to) {
    if (!myTurn || result || thinking) return false
    const g = new Chess(game.fen())
    let move
    try {
      move = g.move({ from, to, promotion: 'q' })
    } catch {
      return false
    }
    setMoves([...moves, move.lan])
    haptic('select')
    return true
  }

  function startGame() {
    const color = colorChoice === 'random' ? (Math.random() < 0.5 ? 'w' : 'b') : colorChoice
    gameId.current++
    setMyColor(color)
    setMoves([])
    setThinking(false)
    setScreen('game')
    haptic('success')
  }

  function undo() {
    // take back my last move (and the computer's answer)
    gameId.current++
    setThinking(false)
    const lastMine = moves.length - 1 - (game.turn() === myColor ? 1 : 0)
    setMoves(moves.slice(0, Math.max(0, lastMine)))
    haptic('select')
  }

  function newGame() {
    gameId.current++
    setThinking(false)
    save(null)
    setScreen('setup')
  }

  if (screen === 'menu') {
    return (
      <div className="play-menu">
        <button className="play-card" onClick={() => setScreen('setup')}>
          <span className="play-card-icon">🤖</span>
          <span>
            <b>С компьютером</b>
            <br />
            <small>4 уровня сложности</small>
          </span>
        </button>
        <button className="play-card" onClick={() => setScreen('friend')}>
          <span className="play-card-icon">👥</span>
          <span>
            <b>С другом</b>
            <br />
            <small>Пригласить по ссылке</small>
          </span>
        </button>
      </div>
    )
  }

  if (screen === 'friend') {
    return (
      <div className="soon">
        <div className="soon-icon">👥</div>
        <div className="soon-title">Скоро</div>
        <div className="soon-text">Игра с другом по ссылке появится совсем скоро.</div>
        <button className="secondary back-button" onClick={() => setScreen('menu')}>
          ← Назад
        </button>
      </div>
    )
  }

  if (screen === 'setup') {
    return (
      <div className="setup">
        <div className="setup-title">Уровень компьютера</div>
        <div className="choice-grid">
          {ENGINE_LEVELS.map((l) => (
            <button
              key={l.id}
              className={'choice' + (level === l.id ? ' active' : '')}
              onClick={() => setLevel(l.id)}
            >
              {l.title}
            </button>
          ))}
        </div>

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

        <div className="buttons">
          <button className="secondary" onClick={() => setScreen('menu')}>
            ← Назад
          </button>
          <button className="primary" onClick={startGame}>
            Начать игру
          </button>
        </div>
      </div>
    )
  }

  // screen === 'game'
  const levelTitle = ENGINE_LEVELS.find((l) => l.id === level)?.title
  let status = myTurn ? 'Твой ход' : 'Компьютер думает…'
  if (!myTurn && !thinking) status = 'Ход компьютера'
  if (game.inCheck() && !result) status = myTurn ? 'Шах! Твой ход' : 'Шах!'
  if (engineError) status = 'Не удалось загрузить компьютер. Проверь интернет и начни новую игру'

  return (
    <>
      <div className="task">
        <div className="task-number">🤖 Компьютер · {levelTitle}</div>
        <div className={'task-goal' + (result ? ' result' : '')}>{result || status}</div>
      </div>

      <GameBoard
        fen={game.fen()}
        orientation={myColor === 'w' ? 'white' : 'black'}
        canMove={myTurn && !result && !thinking}
        lastMove={lastMove}
        onMove={onMove}
      />

      <div className="buttons">
        {!result && (
          <button className="secondary" onClick={undo} disabled={moves.length === 0}>
            ↩️ Отменить ход
          </button>
        )}
        <button className={result ? 'primary' : 'secondary'} onClick={newGame}>
          {result ? 'Сыграть ещё' : 'Новая игра'}
        </button>
      </div>
    </>
  )
}

export default PlayView
