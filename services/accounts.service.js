import { request } from "./http.js"
import { fromApiAccount, fromApiLookup } from "./adapters/accounts.js"

// REAL implementation. Endpoints are PROPOSED (see docs/ in the final phase).
export const accountsService = {
  async list() {
    const rows = await request("/accounts")
    return rows.map(fromApiAccount)
  },
  async get(id) {
    return fromApiAccount(await request(`/accounts/${id}`))
  },
  async lookup(accountNumber) {
    return fromApiLookup(await request("/accounts/lookup", { query: { account_number: accountNumber } }))
  },
  async open(accountType) {
    return fromApiAccount(await request("/accounts", { method: "POST", body: { account_type: accountType } }))
  },
}
