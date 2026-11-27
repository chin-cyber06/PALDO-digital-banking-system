import { defineStore } from "pinia"
import { services } from "~~/services/index.js"

// Reference pattern for every data store: status + error + items, all API
// access through `services` (never fetch inside components).
export const useAccountsStore = defineStore("accounts", {
  state: () => ({
    items: [],
    status: "idle", // "idle" | "loading" | "success" | "error"
    error: null,
  }),
  getters: {
    isLoading: (state) => state.status === "loading",
    isEmpty: (state) => state.status === "success" && state.items.length === 0,
    activeItems: (state) => state.items.filter((account) => account.status === "active"),
    // Integer centavos
    totalAvailable() {
      return this.activeItems.reduce((sum, account) => sum + account.balance, 0)
    },
  },
  actions: {
    async fetchAll() {
      this.status = "loading"
      this.error = null
      try {
        this.items = await services.accounts.list()
        this.status = "success"
      } catch (error) {
        this.error = error.message
        this.status = "error"
      }
    },
  },
})
