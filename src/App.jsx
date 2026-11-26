import { useEffect, useMemo, useRef, useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { LEVELS, PUZZLES } from './puzzles.js'
import { initTelegram, haptic, loadProgress, saveProgress } from './telegram.js'
import './App.css'

const OPPONENT_DELAY = 500
const WRONG_DELAY = 700

const COLORS = {
  good: 'rgba(76, 175, 80, 0.55)',
  bad: 'rgba(229, 57, 53, 0.6)',
  last: 'rgba(255, 213, 79, 0.55)',
  selected: 'rgba(255, 213, 79, 0.7)',
  hint: 'rgba(66, 165, 245, 0.6)',
}

function movesWord(n) {
  if (n === 1) return 'ход'
  if (n >= 2 && n <= 4) return 'хода'
  return 'ходов'
}

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function yesterday() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

const EMPTY_PROGRESS = { solved: [], streak: 0, lastDay: null }

function App() {
  const [progress, setProgress] = useState(EMPTY_PROGRESS)
  const [levelId, setLevelId] = useState('easy')
  const [index, setIndex] = useState(0)
  const [fen, setFen] = useState(PUZZLES[0].fen)
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState('play') // play | wait | solved
  const [marks, setMarks] = useState({}) // square -> color
  const [selected, setSelected] = useState(null)
  const timer = useRef(null)

  const levelPuzzles = useMemo(() => PUZZLES.filter((p) => p.level === levelId), [levelId])
  const level = LEVELS.find((l) => l.id === levelId)
  const puzzle = levelPuzzles[index]
  const playerColor = new Chess(puzzle.fen).turn() // 'w' | 'b'

  // Start: Telegram setup + load saved progress
  useEffect(() => {
    initTelegram()
    loadProgress().then((saved) => {
      if (saved) setProgress({ ...EMPTY_PROGRESS, ...saved })
    })
  }, [])

  // Reset the board whenever the puzzle changes
  useEffect(() => {
    clearTimeout(timer.current)
    setFen(puzzle.fen)
    setStep(0)
    setStatus('play')
    setMarks({})
    setSelected(null)
  }, [puzzle])

  function openLevel(id) {
    const list = PUZZLES.filter((p) => p.level === id)
    const firstUnsolved = list.findIndex((p) => !progress.solved.includes(p.id))
    setLevelId(id)
    setIndex(firstUnsolved === -1 ? 0 : firstUnsolved)
    haptic('select')
  }

  function nextPuzzle() {
    // next unsolved puzzle after the current one, or simply the next one
    for (let k = 1; k <= levelPuzzles.length; k++) {
      const i = (index + k) % levelPuzzles.length
      if (!progress.solved.includes(levelPuzzles[i].id)) return setIndex(i)
    }
    setIndex((index + 1) % levelPuzzles.length)
  }

  function markSolved() {
    const day = today()
    let streak = progress.streak
    if (progress.lastDay !== day) streak = progress.lastDay === yesterday() ? streak + 1 : 1
    const solved = progress.solved.includes(puzzle.id) ? progress.solved : [...progress.solved, puzzle.id]
    const next = { solved, streak, lastDay: day }
    setProgress(next)
    saveProgress(next)
  }

  function tryMove(from, to) {
    if (status !== 'play' || from === to) return false
    const before = fen
    const game = new Chess(before)
    let move
    try {
      move = game.move({ from, to, promotion: 'q' })
    } catch {
      return false // illegal move: piece goes back
    }
    setSelected(null)

    const expected = puzzle.moves[step]
    const isLast = step === puzzle.moves.length - 1
    const correct = move.lan.slice(0, 4) === expected.slice(0, 4) || (isLast && game.isCheckmate())

    setFen(game.fen())

    if (!correct) {
      haptic('error')
      setMarks({ [from]: COLORS.bad, [to]: COLORS.bad })
      setStatus('wait')
      timer.current = setTimeout(() => {
        setFen(before)
        setMarks({})
        setStatus('play')
      }, WRONG_DELAY)
      return true
    }

    setMarks({ [from]: COLORS.good, [to]: COLORS.good })

    if (isLast) {
      haptic('success')
      setStatus('solved')
      markSolved()
      return true
    }

    // Opponent replies
    haptic('select')
    setStatus('wait')
    const reply = puzzle.moves[step + 1]
    timer.current = setTimeout(() => {
      game.move({ from: reply.slice(0, 2), to: reply.slice(2, 4), promotion: reply[4] || 'q' })
      setFen(game.fen())
      setMarks({ [reply.slice(0, 2)]: COLORS.last, [reply.slice(2, 4)]: COLORS.last })
      setStep(step + 2)
      setStatus('play')
    }, OPPONENT_DELAY)
    return true
  }

  function showHint() {
    if (status !== 'play') return
    const from = puzzle.moves[step].slice(0, 2)
    setMarks({ [from]: COLORS.hint })
    haptic('select')
  }

  // Tap-to-move: tap a piece, then tap a square
  function onSquareClick({ square }) {
    if (status !== 'play') return
    const game = new Chess(fen)
    const piece = game.get(square)
    const own = piece && piece.color === playerColor

    if (selected && !own) {
      tryMove(selected, square)
      return
    }
    if (own) {
      setSelected(square === selected ? null : square)
      haptic('select')
    } else {
      setSelected(null)
    }
  }

  // Square colors: marks + selected piece + dots on legal moves
  const squareStyles = {}
  for (const [sq, color] of Object.entries(marks)) squareStyles[sq] = { backgroundColor: color }
  if (selected) {
    squareStyles[selected] = { backgroundColor: COLORS.selected }
    const game = new Chess(fen)
    for (const m of game.moves({ square: selected, verbose: true })) {
      squareStyles[m.to] = {
        ...squareStyles[m.to],
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.25) 22%, transparent 24%)',
      }
    }
  }

  const sideName = playerColor === 'w' ? 'Белые' : 'Чёрные'
  const isSolved = progress.solved.includes(puzzle.id)
  const streakNow = progress.lastDay === today() || progress.lastDay === yesterday() ? progress.streak : 0

  return (
    <div className="app">
      <div className="stats">
        <span>Решено: {progress.solved.length}</span>
        <span>🔥 {streakNow}</span>
      </div>

      <div className="levels">
        {LEVELS.map((l) => (
          <button
            key={l.id}
            className={'level' + (l.id === levelId ? ' active' : '')}
            onClick={() => openLevel(l.id)}
          >
            {l.title}
          </button>
        ))}
      </div>

      <div className="task">
        <div className="task-number">
          Задача {index + 1} из {levelPuzzles.length} {isSolved && '✓'}
        </div>
        <div className="task-goal">
          {sideName} ставят мат в {level.mateIn} {movesWord(level.mateIn)}
        </div>
      </div>

      <div className="board">
        <Chessboard
          options={{
            id: 'puzzle-board',
            position: fen,
            boardOrientation: playerColor === 'w' ? 'white' : 'black',
            onPieceDrop: ({ sourceSquare, targetSquare }) =>
              targetSquare ? tryMove(sourceSquare, targetSquare) : false,
            onSquareClick,
            canDragPiece: ({ piece }) => status === 'play' && piece.pieceType[0] === playerColor,
            squareStyles,
            animationDurationInMs: 200,
            allowDrawingArrows: false,
            darkSquareStyle: { backgroundColor: '#b58863' },
            lightSquareStyle: { backgroundColor: '#f0d9b5' },
          }}
        />
      </div>

      <div className="message">
        {status === 'solved' && <span className="ok">Отлично! Задача решена 🎉</span>}
        {status === 'wait' && Object.values(marks)[0] === COLORS.bad && (
          <span className="bad">Не тот ход, попробуй ещё</span>
        )}
      </div>

      <div className="buttons">
        {status === 'solved' ? (
          <button className="primary" onClick={nextPuzzle}>
            Дальше →
          </button>
        ) : (
          <>
            <button className="secondary" onClick={showHint} disabled={status !== 'play'}>
              💡 Подсказка
            </button>
            <button className="secondary" onClick={nextPuzzle}>
              Следующая →
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default App
