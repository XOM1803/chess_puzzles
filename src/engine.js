// Stockfish chess engine running in the browser (Web Worker).
// Files live in public/stockfish/ (lite single-threaded build: works on any static host).

const ENGINE_URL = import.meta.env.BASE_URL + 'stockfish/stockfish-19-lite-single.js'

export const ENGINE_LEVELS = [
  { id: 'beginner', title: 'Новичок', skill: 0, go: 'go depth 1' },
  { id: 'amateur', title: 'Любитель', skill: 4, go: 'go depth 4' },
  { id: 'advanced', title: 'Опытный', skill: 10, go: 'go movetime 600' },
  { id: 'master', title: 'Мастер', skill: 20, go: 'go movetime 1200' },
]

let worker = null
let ready = null
let pending = null // { resolve }

function getEngine() {
  if (ready) return ready
  ready = new Promise((resolve, reject) => {
    try {
      worker = new Worker(ENGINE_URL)
    } catch (e) {
      reject(e)
      return
    }
    worker.onmessage = (event) => {
      const line = typeof event.data === 'string' ? event.data : ''
      if (line === 'uciok') worker.postMessage('isready')
      else if (line === 'readyok') resolve()
      else if (line.startsWith('bestmove') && pending) {
        const move = line.split(' ')[1]
        const done = pending
        pending = null
        done.resolve(move && move !== '(none)' ? move : null)
      }
    }
    worker.onerror = (e) => reject(e)
    worker.postMessage('uci')
  })
  return ready
}

// Returns the engine's move in UCI format (e.g. "e2e4"), or null.
export async function getBestMove(fen, levelId) {
  await getEngine()
  const level = ENGINE_LEVELS.find((l) => l.id === levelId) || ENGINE_LEVELS[0]
  if (pending) {
    worker.postMessage('stop')
    pending.resolve(null)
    pending = null
  }
  return new Promise((resolve) => {
    pending = { resolve }
    worker.postMessage(`setoption name Skill Level value ${level.skill}`)
    worker.postMessage(`position fen ${fen}`)
    worker.postMessage(level.go)
  })
}

// Start loading the engine early (so the first move is fast)
export function preloadEngine() {
  getEngine().catch((e) => console.warn('Engine failed to load', e))
}
