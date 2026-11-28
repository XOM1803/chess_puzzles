import { useEffect, useRef, useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { haptic } from './telegram.js'
import Icon from './Icon.jsx'

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

// One puzzle: board + checking moves + hint/next buttons.
// props: puzzle, label ("Задача 3 из 10"), solved (bool), onSolved(), onNext()
function PuzzleView({ puzzle, label, solved, onSolved, onNext }) {
  const [fen, setFen] = useState(puzzle.fen)
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState('play') // play | wait | wrong | solved
  const [marks, setMarks] = useState({})
  const [selected, setSelected] = useState(null)
  const timer = useRef(null)

  const playerColor = new Chess(puzzle.fen).turn()
  const isMatePuzzle = puzzle.mate !== false
  const mateIn = Math.ceil(puzzle.moves.length / 2)
  const sideName = playerColor === 'w' ? 'Белые' : 'Чёрные'
  const goal = puzzle.goal || `${sideName} ставят мат в ${mateIn} ${movesWord(mateIn)}`

  // Reset when the puzzle changes
  useEffect(() => {
    clearTimeout(timer.current)
    setFen(puzzle.fen)
    setStep(0)
    setStatus('play')
    setMarks({})
    setSelected(null)
  }, [puzzle])

  useEffect(() => () => clearTimeout(timer.current), [])

  function tryMove(from, to) {
    if (status !== 'play' || from === to) return false
    const before = fen
    const game = new Chess(before)
    let move
    try {
      move = game.move({ from, to, promotion: 'q' })
    } catch {
      return false // illegal: piece goes back
    }
    setSelected(null)

    const expected = puzzle.moves[step]
    const isLast = step === puzzle.moves.length - 1
    const correct =
      move.lan.slice(0, 4) === expected.slice(0, 4) || (isLast && isMatePuzzle && game.isCheckmate())

    setFen(game.fen())

    if (!correct) {
      haptic('error')
      setMarks({ [from]: COLORS.bad, [to]: COLORS.bad })
      setStatus('wrong')
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
      onSolved()
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
    setMarks({ [puzzle.moves[step].slice(0, 2)]: COLORS.hint })
    haptic('select')
  }

  // Tap a piece, then tap a square
  function onSquareClick({ square }) {
    if (status !== 'play') return
    const piece = new Chess(fen).get(square)
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

  const squareStyles = {}
  for (const [sq, color] of Object.entries(marks)) squareStyles[sq] = { backgroundColor: color }
  if (selected) {
    squareStyles[selected] = { backgroundColor: COLORS.selected }
    for (const m of new Chess(fen).moves({ square: selected, verbose: true })) {
      squareStyles[m.to] = {
        ...squareStyles[m.to],
        // dot for an empty square, ring for a capture
        backgroundImage: m.captured
          ? 'radial-gradient(circle, transparent 62%, rgba(0,0,0,0.3) 64%)'
          : 'radial-gradient(circle, rgba(0,0,0,0.25) 22%, transparent 24%)',
      }
    }
  }

  return (
    <>
      <div className="task">
        <div className="task-number">
          {label} {solved && '✓'}
        </div>
        {puzzle.title && <div className="task-title">{puzzle.title}</div>}
        <div className="task-goal">{goal}</div>
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
        {status === 'wrong' && <span className="bad">Не тот ход, попробуй ещё</span>}
      </div>

      {status === 'solved' && puzzle.explanation && (
        <div className="explanation">{puzzle.explanation}</div>
      )}

      <div className="buttons">
        {status === 'solved' ? (
          <button className="primary" onClick={onNext}>
            Дальше →
          </button>
        ) : (
          <>
            <button className="secondary" onClick={showHint} disabled={status !== 'play'}>
              <Icon name="hint" /> Подсказка
            </button>
            <button className="secondary" onClick={onNext}>
              Следующая →
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default PuzzleView
