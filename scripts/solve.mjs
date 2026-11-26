// Mate solver used to verify puzzles: node scripts/solve.mjs
import { Chess } from 'chess.js'

// can side to move force mate within n of its own moves?
export function mateIn(fen, n) {
  const g = new Chess(fen)
  for (const m of g.moves({ verbose: true })) {
    g.move(m)
    const ok = g.isCheckmate() || (n > 1 && !g.isGameOver() && allRepliesLose(g.fen(), n - 1))
    g.undo()
    if (ok) return true
  }
  return false
}
function allRepliesLose(fen, n) {
  const g = new Chess(fen)
  for (const r of g.moves({ verbose: true })) {
    g.move(r)
    const lose = mateIn(g.fen(), n)
    g.undo()
    if (!lose) return false
  }
  return true
}
// all first moves that force mate in n
export function winningMoves(fen, n) {
  const g = new Chess(fen)
  const res = []
  for (const m of g.moves({ verbose: true })) {
    g.move(m)
    const ok = g.isCheckmate() || (n > 1 && !g.isGameOver() && allRepliesLose(g.fen(), n - 1))
    g.undo()
    if (ok) res.push(m.lan)
  }
  return res
}
