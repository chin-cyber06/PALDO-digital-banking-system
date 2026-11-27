import { defineStore } from "pinia"
import { STORAGE_KEYS } from "~~/config/app.js"

let toastCounter = 0

// App-wide UI state: splash, toasts, connectivity and sidebar.
export const useUiStore = defineStore("ui", {
  state: () => ({
    splashVisible: true,
    toasts: [], // { id, message, type: "success" | "error", duration }
    online: true,
    sidebarCollapsed: false,
  }),
  actions: {
    initSplash() {
      // Show the splash once per browser session.
      try {
        if (sessionStorage.getItem(STORAGE_KEYS.splashSeen) === "1") this.splashVisible = false
      } catch {
        /* ignore */
      }
    },
    dismissSplash() {
      this.splashVisible = false
      try {
        sessionStorage.setItem(STORAGE_KEYS.splashSeen, "1")
      } catch {
        /* ignore */
      }
    },
    setOnline(value) {
      this.online = Boolean(value)
    },
    refreshOnline() {
      this.online = navigator.onLine
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    notify(message, { type = "success", duration = 2800 } = {}) {
      const id = ++toastCounter
      this.toasts.push({ id, message, type, duration })
      setTimeout(() => this.dismissToast(id), duration)
    },
    notifyError(message) {
      this.notify(message, { type: "error", duration: 3600 })
    },
    dismissToast(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id)
    },
  },
})
