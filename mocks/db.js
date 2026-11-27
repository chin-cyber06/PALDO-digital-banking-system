// Tiny localStorage-backed "database" for mock services.
// Everything here is DEMO DATA. It is never sent anywhere.
const PREFIX = "paldo_mock_"

export function loadCollection(name, seed) {
  try {
    const raw = localStorage.getItem(PREFIX + name)
    if (raw) return JSON.parse(raw)
  } catch {
    /* storage unavailable: fall back to seed */
  }
  return JSON.parse(JSON.stringify(seed))
}

export function saveCollection(name, data) {
  try {
    localStorage.setItem(PREFIX + name, JSON.stringify(data))
  } catch {
    /* ignore quota/privacy-mode errors */
  }
}

/** Wipes all mock collections so the next read re-seeds from mocks/data/*.json. */
export function resetDemoData() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => localStorage.removeItem(key))
  } catch {
    /* ignore */
  }
}
