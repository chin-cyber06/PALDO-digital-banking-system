import { request } from "./http.js"
import { fromApiSession, fromApiUser, toApiRegistration } from "./adapters/auth.js"

// REAL implementation. Endpoints PROPOSED unless marked confirmed in the final contract doc.
export const authService = {
  async login({ identity, password }) {
    return fromApiSession(await request("/auth/login", { method: "POST", body: { identity, password } }))
  },
  async register(payload) {
    return fromApiSession(await request("/auth/register", { method: "POST", body: toApiRegistration(payload) }))
  },
  async logout() {
    await request("/auth/logout", { method: "POST" })
  },
  // NEW proposed endpoint: not in the original handoff route list.
  async forgotPassword(email) {
    await request("/auth/forgot-password", { method: "POST", body: { email } })
  },
  // `token` is unused here: http.js already sends the Authorization header.
  async me() {
    return fromApiUser(await request("/me"))
  },
}
