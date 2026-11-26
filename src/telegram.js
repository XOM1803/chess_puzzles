// Small helpers around window.Telegram.WebApp (loaded in index.html).
// Everything works outside Telegram too (in a normal browser) — calls just do nothing.

const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined

export function initTelegram() {
  if (!tg) return
  try {
    tg.ready()
    tg.expand()
    if (tg.disableVerticalSwipes) tg.disableVerticalSwipes() // so dragging a piece doesn't close the app
  } catch (e) {
    console.warn('Telegram init failed', e)
  }
}

// Puzzle id from the link t.me/<bot>/<app>?startapp=<id>
// (in a normal browser: ?startapp=<id> in the page address, for testing)
export function getStartParam() {
  try {
    const fromTelegram = tg?.initDataUnsafe?.start_param
    if (fromTelegram) return fromTelegram
    const params = new URLSearchParams(window.location.search)
    return params.get('startapp') || params.get('tgWebAppStartParam')
  } catch {
    return null
  }
}

export function haptic(type) {
  try {
    if (type === 'select') tg?.HapticFeedback?.selectionChanged()
    else tg?.HapticFeedback?.notificationOccurred(type) // 'success' | 'error'
  } catch {
    // not available
  }
}

// Progress storage: Telegram CloudStorage (synced to the account) with localStorage fallback.
const KEY = 'progress_v1'
const cloud = tg?.CloudStorage && tg.isVersionAtLeast?.('6.9') ? tg.CloudStorage : null

export function loadProgress() {
  return new Promise((resolve) => {
    const fromLocal = () => {
      try {
        resolve(JSON.parse(localStorage.getItem(KEY)) || null)
      } catch {
        resolve(null)
      }
    }
    if (!cloud) return fromLocal()
    try {
      cloud.getItem(KEY, (err, value) => {
        if (err || !value) return fromLocal()
        try {
          resolve(JSON.parse(value))
        } catch {
          fromLocal()
        }
      })
    } catch {
      fromLocal()
    }
  })
}

export function saveProgress(progress) {
  const value = JSON.stringify(progress)
  try {
    localStorage.setItem(KEY, value)
  } catch {
    // storage unavailable
  }
  try {
    cloud?.setItem(KEY, value)
  } catch {
    // ignore
  }
}
