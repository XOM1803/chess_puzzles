import { winningMoves } from './solve.mjs'
const list = JSON.parse(process.argv[2])
for (const [fen, n] of list) {
  try { console.log(n, fen, '=>', winningMoves(fen, n).join(' ')) } catch (e) { console.log('ERR', fen, e.message) }
}
