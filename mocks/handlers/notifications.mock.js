import seed from "../data/notifications.json"
import { loadCollection, saveCollection } from "../db.js"
import { delay } from "../delay.js"

const KEY = "notifications"

const build = () =>
  seed.map(({ minutesAgo, ...item }) => ({ ...item, createdAt: new Date(Date.now() - minutesAgo * 60000).toISOString() }))

export const readNotifications = () => {
  const stored = loadCollection(KEY, null)
  if (stored) return stored
  const fresh = build()
  saveCollection(KEY, fresh)
  return fresh
}
export const writeNotifications = (items) => saveCollection(KEY, items)

// Phase 3 will also add transaction-based notifications here.
export const notificationsMock = {
  async list() {
    await delay(450)
    return [...readNotifications()].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },
  async markRead(ids) {
    await delay(100)
    writeNotifications(readNotifications().map((item) => (ids.includes(item.id) ? { ...item, read: true } : item)))
  },
  async markAllRead() {
    await delay(150)
    writeNotifications(readNotifications().map((item) => ({ ...item, read: true })))
  },
}
