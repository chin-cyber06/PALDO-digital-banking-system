import { defineStore } from "pinia"
import { services } from "~~/services/index.js"

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({ items: [], status: "idle", error: null }),
  getters: {
    isLoading: (state) => state.status === "loading",
    unreadCount: (state) => state.items.filter((item) => !item.read).length,
  },
  actions: {
    async fetchAll() {
      this.status = "loading"
      this.error = null
      try {
        this.items = await services.notifications.list()
        this.status = "success"
      } catch (error) {
        this.error = error.message
        this.status = "error"
      }
    },
    async markRead(id) {
      const item = this.items.find((entry) => entry.id === id)
      if (!item || item.read) return
      item.read = true // optimistic
      try {
        await services.notifications.markRead([id])
      } catch {
        item.read = false
      }
    },
    async markAllRead() {
      const unread = this.items.filter((item) => !item.read)
      unread.forEach((item) => (item.read = true))
      try {
        await services.notifications.markAllRead()
      } catch {
        unread.forEach((item) => (item.read = false))
      }
    },
  },
})
