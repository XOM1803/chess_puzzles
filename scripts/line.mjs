// Build a solution line where every non-final player move is the ONLY winning move.
import { Chess } from 'chess.js'
import { winningMoves, mateIn } from './solve.mjs'
export function buildLine(fen, n) {
  const moves = []
  let cur = fen
  for (let k = n; k >= 1; k--) {
    const w = winningMoves(cur, k)
    if (w.length === 0) return { ok: false, why: 'no win at ' + k }
    if (k > 1 && w.length !== 1) return { ok: false, why: `ambiguous at ${k}: ${w}` }
    if (k > 1 && winningMoves(cur, k - 1).length) return { ok: false, why: 'faster mate exists' }
    const g = new Chess(cur); g.move(w[0]); moves.push(w[0])
    if (k === 1) { if (!g.isCheckmate()) return { ok: false, why: 'not mate' }; break }
    // opponent: pick reply that does NOT allow faster mate and keeps next win unique
    let chosen = null
    for (const r of g.moves({ verbose: true })) {
      g.move(r)
      const f = g.fen()
      const slow = k - 1 === 1 || !mateIn(f, k - 2)
      const uniq = k - 1 === 1 || winningMoves(f, k - 1).length === 1
      g.undo()
      if (slow && uniq) { chosen = r.lan; break }
    }
    if (!chosen) return { ok: false, why: 'no good defense line' }
    g.move(chosen); moves.push(chosen); cur = g.fen()
  }
  return { ok: true, moves }
}
if (process.argv[2]) {
  for (const [fen, n] of JSON.parse(process.argv[2])) console.log(n, fen, JSON.stringify(buildLine(fen, n)))
}
