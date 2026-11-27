import { defineStore } from "pinia"
import { services } from "~~/services/index.js"
import { STORAGE_KEYS } from "~~/config/app.js"

let restorePromise = null

const readStored = () => {
  for (const [kind, storage] of [["local", "localStorage"], ["session", "sessionStorage"]]) {
    try {
      const raw = window[storage].getItem(STORAGE_KEYS.session)
      if (raw) return { kind, ...JSON.parse(raw) }
    } catch {
      /* ignore */
    }
  }
  return null
}
const clearStored = () => {
  for (const storage of ["localStorage", "sessionStorage"]) {
    try { window[storage].removeItem(STORAGE_KEYS.session) } catch { /* ignore */ }
  }
}

// NOTE (production): web storage is readable by any injected script. Once the real backend
// exists, prefer an httpOnly refresh cookie and keep the access token in memory only.
export const useSessionStore = defineStore("session", {
  state: () => ({
    user: null,
    accessToken: null,
    persistence: "session", // "local" (Remember me) | "session"
    restored: false,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user && state.accessToken),
    isAdmin: (state) => state.user?.role === "admin",
    firstName: (state) => state.user?.fullName?.trim().split(/\s+/)[0] ?? "",
  },
  actions: {
    persist() {
      clearStored()
      try {
        const storage = this.persistence === "local" ? localStorage : sessionStorage
        storage.setItem(STORAGE_KEYS.session, JSON.stringify({ user: this.user, accessToken: this.accessToken }))
      } catch {
        /* ignore */
      }
    },
    setSession({ user, accessToken }, remember = false) {
      this.user = user
      this.accessToken = accessToken
      this.persistence = remember ? "local" : "session"
      this.restored = true
      this.persist()
    },
    /** Replace the profile (used by Profile settings later). */
    setUser(user) {
      this.user = user
      if (this.accessToken) this.persist()
    },
    async login({ identity, password, remember }) {
      this.setSession(await services.auth.login({ identity, password }), remember)
    },
    async register(payload) {
      this.setSession(await services.auth.register(payload), false)
    },
    async logout() {
      try {
        await services.auth.logout()
      } catch {
        /* the local session is cleared even if the server call fails */
      }
      this.clear()
    },
    clear() {
      this.user = null
      this.accessToken = null
      clearStored()
    },
    /** Called once by the route guard so protected pages wait for session restore. */
    ensureRestored() {
      if (this.restored) return Promise.resolve()
      restorePromise ??= this.restore()
      return restorePromise
    },
    async restore() {
      const stored = readStored()
      if (stored?.accessToken) {
        this.accessToken = stored.accessToken
        this.user = stored.user
        this.persistence = stored.kind
        try {
          this.user = await services.auth.me(stored.accessToken)
          this.persist()
        } catch (error) {
          // Only an explicit 401 ends the session; offline/server errors keep it.
          if (error.status === 401) this.clear()
        }
      }
      this.restored = true
    },
  },
})
