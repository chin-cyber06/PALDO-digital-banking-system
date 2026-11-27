import usersSeed from "../data/users.json"
import { loadGlobal, saveGlobal, setMockNamespace } from "../db.js"
import { delay } from "../delay.js"
import { writeAccounts } from "./accounts.mock.js"
import { ApiError } from "~~/shared/errors.js"
import { MOCK } from "~~/config/app.js"

// DEMO AUTH ONLY. No passwords are stored or checked beyond length >= 8.
// Unknown identities sign in as the demo customer so the app can be explored quickly.
const registeredUsers = () => loadGlobal("users", [])
const allUsers = () => [...usersSeed, ...registeredUsers()]
const findUser = (identity) => {
  const key = String(identity).trim().toLowerCase()
  return allUsers().find((user) => user.username.toLowerCase() === key || user.email.toLowerCase() === key)
}
const demoCustomer = () => usersSeed.find((user) => user.username === "alex")
const makeToken = (username) => `mock.${username.toLowerCase()}.${Date.now().toString(36)}`
const usernameFromToken = (token) => (/^mock\.([^.]+)\./.exec(token || "") || [])[1]

const startSession = (user) => {
  setMockNamespace(user.username)
  return { user, accessToken: makeToken(user.username), expiresAt: new Date(Date.now() + 3600_000).toISOString() }
}

export const authMock = {
  async login({ identity }) {
    await delay(650)
    const key = String(identity).trim().toLowerCase()
    if (key === MOCK.lockedIdentity)
      throw new ApiError({ status: 423, code: "ACCOUNT_LOCKED", message: "This account is locked after multiple unsuccessful login attempts." })
    if (key === MOCK.deactivatedIdentity)
      throw new ApiError({ status: 403, code: "ACCOUNT_DEACTIVATED", message: "This account has been deactivated and cannot sign in." })
    return startSession(findUser(identity) ?? demoCustomer())
  },

  async register(payload) {
    await delay(1000)
    const fields = {}
    if (findUser(payload.email)) fields.email = "Email already taken."
    if (findUser(payload.username)) fields.username = "Username already taken."
    if (Object.keys(fields).length)
      throw new ApiError({ status: 409, code: "VALIDATION_ERROR", message: "Please review the highlighted fields.", fields })

    const createdAt = new Date().toISOString()
    const user = {
      fullName: payload.fullName.trim(),
      email: payload.email.trim(),
      username: payload.username,
      phone: payload.phone,
      dateOfBirth: payload.dateOfBirth,
      address: payload.address || undefined,
      role: "customer",
      status: "active",
      createdAt,
      lastPasswordChange: createdAt,
    }
    saveGlobal("users", [...registeredUsers(), user])
    const session = startSession(user)
    // New customers start with one empty savings account (no transactions).
    writeAccounts([
      {
        id: `acc-${Date.now()}`,
        accountNumber: "5" + Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join(""),
        accountType: "savings",
        status: "active",
        balance: 0,
        updatedAt: createdAt,
      },
    ])
    return session
  },

  async logout() {
    await delay(150)
  },

  async forgotPassword() {
    await delay(700) // demo: no email is actually sent
  },

  async me(token) {
    await delay(200)
    const username = usernameFromToken(token)
    const user = username && findUser(username)
    if (!user) throw new ApiError({ status: 401, code: "UNAUTHENTICATED", message: "Your session has expired. Please log in again." })
    setMockNamespace(user.username)
    return user
  },
}
