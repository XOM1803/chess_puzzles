import { useEffect, useMemo, useState } from 'react'
import { LEVELS, PUZZLES, TRAPS } from './puzzles.js'
import { initTelegram, haptic, loadProgress, saveProgress, getStartParam } from './telegram.js'
import PuzzleView from './PuzzleView.jsx'
import PlayView from './PlayView.jsx'
import './App.css'

const EMPTY_PROGRESS = { solved: [], streak: 0, lastDay: null }

function dayString(offset = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

// If the app was opened from a channel post link (?startapp=<id>), start on that puzzle
function startState() {
  const id = getStartParam()
  const trapIndex = TRAPS.findIndex((t) => t.id === id)
  if (trapIndex !== -1) return { tab: 'traps', levelId: 'easy', taskIndex: 0, trapIndex }
  const puzzle = PUZZLES.find((p) => p.id === id) || PUZZLES[0]
  const taskIndex = PUZZLES.filter((p) => p.level === puzzle.level).indexOf(puzzle)
  return { tab: 'tasks', levelId: puzzle.level, taskIndex, trapIndex: 0 }
}
const START = startState()

// Next index after `index` that isn't solved yet (or simply the next one)
function nextIndex(list, index, solved) {
  for (let k = 1; k <= list.length; k++) {
    const i = (index + k) % list.length
    if (!solved.includes(list[i].id)) return i
  }
  return (index + 1) % list.length
}

function App() {
  const [progress, setProgress] = useState(EMPTY_PROGRESS)
  const [tab, setTab] = useState(START.tab) // tasks | traps | play
  const [levelId, setLevelId] = useState(START.levelId)
  const [taskIndex, setTaskIndex] = useState(START.taskIndex)
  const [trapIndex, setTrapIndex] = useState(START.trapIndex)
  const [menuOpen, setMenuOpen] = useState(false)

  const levelPuzzles = useMemo(() => PUZZLES.filter((p) => p.level === levelId), [levelId])
  const level = LEVELS.find((l) => l.id === levelId)

  useEffect(() => {
    initTelegram()
    loadProgress().then((saved) => {
      if (saved) setProgress({ ...EMPTY_PROGRESS, ...saved })
    })
  }, [])

  function markSolved(id) {
    const today = dayString()
    let streak = progress.streak
    if (progress.lastDay !== today) streak = progress.lastDay === dayString(-1) ? streak + 1 : 1
    const solved = progress.solved.includes(id) ? progress.solved : [...progress.solved, id]
    const next = { solved, streak, lastDay: today }
    setProgress(next)
    saveProgress(next)
  }

  function chooseLevel(id) {
    const list = PUZZLES.filter((p) => p.level === id)
    const firstUnsolved = list.findIndex((p) => !progress.solved.includes(p.id))
    setLevelId(id)
    setTaskIndex(firstUnsolved === -1 ? 0 : firstUnsolved)
    setMenuOpen(false)
    haptic('select')
  }

  function openTab(id) {
    setTab(id)
    setMenuOpen(false)
    haptic('select')
  }

  const streakNow =
    progress.lastDay === dayString() || progress.lastDay === dayString(-1) ? progress.streak : 0

  const task = levelPuzzles[taskIndex]
  const trap = TRAPS[trapIndex]

  return (
    <div className="app">
      <div className="topbar">
        {tab === 'tasks' ? (
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            ☰ <span>{level.title}</span>
          </button>
        ) : (
          <div className="topbar-title">{tab === 'traps' ? 'Ловушки' : 'Играть'}</div>
        )}
        <div className="stats">
          <span>✓ {progress.solved.length}</span>
          <span>🔥 {streakNow}</span>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
          <div className="menu">
            {LEVELS.map((l) => {
              const list = PUZZLES.filter((p) => p.level === l.id)
              const done = list.filter((p) => progress.solved.includes(p.id)).length
              return (
                <button
                  key={l.id}
                  className={'menu-item' + (l.id === levelId ? ' active' : '')}
                  onClick={() => chooseLevel(l.id)}
                >
                  <span>{l.title}</span>
                  <span className="menu-count">
                    {done}/{list.length}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )}

      <main className="content">
        {tab === 'tasks' && (
          <PuzzleView
            puzzle={task}
            label={`Задача ${taskIndex + 1} из ${levelPuzzles.length}`}
            solved={progress.solved.includes(task.id)}
            onSolved={() => markSolved(task.id)}
            onNext={() => setTaskIndex(nextIndex(levelPuzzles, taskIndex, progress.solved))}
          />
        )}

        {tab === 'traps' && (
          <PuzzleView
            puzzle={trap}
            label={`Ловушка ${trapIndex + 1} из ${TRAPS.length}`}
            solved={progress.solved.includes(trap.id)}
            onSolved={() => markSolved(trap.id)}
            onNext={() => setTrapIndex(nextIndex(TRAPS, trapIndex, progress.solved))}
          />
        )}

        {tab === 'play' && <PlayView />}
      </main>

      <nav className="tabbar">
        {[
          { id: 'tasks', icon: '🧩', title: 'Задачи' },
          { id: 'traps', icon: '🪤', title: 'Ловушки' },
          { id: 'play', icon: '♟️', title: 'Играть' },
        ].map((t) => (
          <button key={t.id} className={'tab' + (tab === t.id ? ' active' : '')} onClick={() => openTab(t.id)}>
            <span className="tab-icon">{t.icon}</span>
            <span>{t.title}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
