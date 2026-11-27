// Tiny localStorage-backed "database" for mock services.
// Everything here is DEMO DATA. It is never sent anywhere.
//
// Data is namespaced per mock user (e.g. "alex", "admin", or a newly registered
// username) so registering a new account never overwrites the demo user's data.
const PREFIX = "paldo_mock_"
let namespace = "default"

export const setMockNamespace = (name) => {
  namespace = String(name || "default").toLowerCase()
}

const userKey = (name) => `${PREFIX}u_${namespace}_${name}`
const globalKey = (name) => `${PREFIX}g_${name}`

const read = (key, seed) => {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch {
    /* storage unavailable: fall back to seed */
  }
  return JSON.parse(JSON.stringify(seed))
}
const write = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    /* ignore quota/privacy-mode errors */
  }
}

// Per-user collections
export const loadCollection = (name, seed) => read(userKey(name), seed)
export const saveCollection = (name, data) => write(userKey(name), data)
// Collections shared by all mock users (e.g. registered users)
export const loadGlobal = (name, seed) => read(globalKey(name), seed)
export const saveGlobal = (name, data) => write(globalKey(name), data)

/**
 * Wipes mock data so it re-seeds from mocks/data/*.json.
 * Default: only the current user's data. { all: true } also removes registered users.
 */
export function resetDemoData({ all = false } = {}) {
  try {
    const own = `${PREFIX}u_${namespace}_`
    Object.keys(localStorage)
      .filter((key) => (all ? key.startsWith(PREFIX) : key.startsWith(own)))
      .forEach((key) => localStorage.removeItem(key))
  } catch {
    /* ignore */
  }
}
