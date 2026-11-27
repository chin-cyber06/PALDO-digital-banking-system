import { defineStore } from "pinia"
import { STORAGE_KEYS } from "~~/config/app.js"

const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}
const write = (key, value) => {
  try {
    localStorage.setItem(key, String(value))
  } catch {
    /* ignore */
  }
}

// Theme, language and balance visibility. Persisted in localStorage using the
// same keys as the original prototype.
export const usePreferencesStore = defineStore("preferences", {
  state: () => ({
    themeMode: "light", // "light" | "dark"
    language: "en", // "en" | "fil"
    balanceHidden: false,
    hydrated: false,
  }),
  getters: {
    isDark: (state) => state.themeMode === "dark",
  },
  actions: {
    hydrate() {
      this.themeMode = read(STORAGE_KEYS.theme, "light") === "dark" ? "dark" : "light"
      this.language = read(STORAGE_KEYS.language, "en") === "fil" ? "fil" : "en"
      this.balanceHidden = read(STORAGE_KEYS.balanceHidden, "false") === "true"
      this.hydrated = true
      this.applyToDocument()
    },
    applyToDocument() {
      if (typeof document === "undefined") return
      const root = document.documentElement
      root.classList.toggle("dark", this.isDark)
      root.style.colorScheme = this.isDark ? "dark" : "light"
      root.lang = this.language
    },
    setTheme(mode) {
      this.themeMode = mode === "dark" ? "dark" : "light"
      write(STORAGE_KEYS.theme, this.themeMode)
      this.applyToDocument()
    },
    toggleTheme() {
      this.setTheme(this.isDark ? "light" : "dark")
    },
    setLanguage(language) {
      this.language = language === "fil" ? "fil" : "en"
      write(STORAGE_KEYS.language, this.language)
      this.applyToDocument()
    },
    setBalanceHidden(hidden) {
      this.balanceHidden = Boolean(hidden)
      write(STORAGE_KEYS.balanceHidden, this.balanceHidden)
    },
    toggleBalanceHidden() {
      this.setBalanceHidden(!this.balanceHidden)
    },
  },
})
