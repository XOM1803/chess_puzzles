import { useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { haptic } from './telegram.js'

// A board for a real game: tap or drag to move, highlights the last move and check.
// props: fen, orientation ('white' | 'black'), canMove (bool), lastMove ({from,to} | null),
//        onMove(from, to) -> true if the move was accepted
function GameBoard({ fen, orientation, canMove, lastMove, onMove }) {
  const [selected, setSelected] = useState(null)
  const game = new Chess(fen)
  const myColor = orientation === 'white' ? 'w' : 'b'

  function move(from, to) {
    setSelected(null)
    return onMove(from, to)
  }

  function onSquareClick({ square }) {
    if (!canMove) return
    const piece = game.get(square)
    const own = piece && piece.color === myColor
    if (selected && !own) {
      move(selected, square)
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
  if (lastMove) {
    squareStyles[lastMove.from] = { backgroundColor: 'rgba(255, 213, 79, 0.45)' }
    squareStyles[lastMove.to] = { backgroundColor: 'rgba(255, 213, 79, 0.45)' }
  }
  if (game.inCheck()) {
    const king = game
      .board()
      .flat()
      .find((p) => p && p.type === 'k' && p.color === game.turn())
    if (king) {
      squareStyles[king.square] = {
        background: 'radial-gradient(circle, rgba(229,57,53,0.85) 30%, rgba(229,57,53,0) 75%)',
      }
    }
  }
  if (selected) {
    squareStyles[selected] = { backgroundColor: 'rgba(255, 213, 79, 0.7)' }
    for (const m of game.moves({ square: selected, verbose: true })) {
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
    <div className="board">
      <Chessboard
        options={{
          id: 'game-board',
          position: fen,
          boardOrientation: orientation,
          onPieceDrop: ({ sourceSquare, targetSquare }) =>
            targetSquare && canMove ? move(sourceSquare, targetSquare) : false,
          onSquareClick,
          canDragPiece: ({ piece }) => canMove && piece.pieceType[0] === myColor,
          squareStyles,
          animationDurationInMs: 200,
          allowDrawingArrows: false,
          darkSquareStyle: { backgroundColor: '#b58863' },
          lightSquareStyle: { backgroundColor: '#f0d9b5' },
        }}
      />
    </div>
  )
}

// Text for a finished game, or null if the game goes on.
export function gameResult(game, myColor) {
  if (game.isCheckmate()) return game.turn() === myColor ? 'Мат. Ты проиграл(а)' : 'Мат! Ты победил(а) 🎉'
  if (game.isStalemate()) return 'Пат — ничья'
  if (game.isThreefoldRepetition()) return 'Троекратное повторение — ничья'
  if (game.isInsufficientMaterial()) return 'Недостаточно фигур — ничья'
  if (game.isDraw()) return 'Ничья'
  return null
}

export default GameBoard
