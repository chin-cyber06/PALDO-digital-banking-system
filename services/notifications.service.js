import { request } from "./http.js"
import { fromApiNotification } from "./adapters/notifications.js"

// PROPOSED endpoints. GET /notifications is in the handoff; the two POST routes are new proposals.
export const notificationsService = {
  async list() {
    const rows = await request("/notifications")
    return rows.map(fromApiNotification)
  },
  async markRead(ids) {
    await request("/notifications/read", { method: "POST", body: { ids } })
  },
  async markAllRead() {
    await request("/notifications/read-all", { method: "POST" })
  },
}
