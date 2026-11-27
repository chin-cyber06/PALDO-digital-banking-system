import accountsSeed from "../data/accounts.json"
import { loadCollection, saveCollection } from "../db.js"
import { delay } from "../delay.js"
import { ApiError } from "~~/shared/errors.js"
import { MOCK } from "~~/config/app.js"

const KEY = "accounts"

// Other PALDO accounts that the "Another PALDO account" transfer can find.
const directory = {
  [MOCK.palDoLookupAccount]: { accountId: "acc-maria", holderName: "Maria Reyes", bank: "PALDO" },
}

export const readAccounts = () => loadCollection(KEY, accountsSeed)
export const writeAccounts = (items) => saveCollection(KEY, items)

const randomAccountNumber = () =>
  "5" + Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join("")

// Same method names/arguments/return shapes as services/accounts.service.js
export const accountsMock = {
  async list() {
    await delay()
    return readAccounts()
  },
  async get(id) {
    await delay(200)
    const account = readAccounts().find((item) => item.id === id)
    if (!account) throw new ApiError({ status: 404, code: "ACCOUNT_NOT_FOUND", message: "Account not found." })
    return account
  },
  async lookup(accountNumber) {
    await delay(450)
    const hit = directory[accountNumber]
    if (!hit) throw new ApiError({ status: 404, code: "ACCOUNT_NOT_FOUND", message: "We couldn’t find that PALDO account." })
    return hit
  },
  async open(accountType) {
    await delay(500)
    const account = {
      id: `acc-${Date.now()}`,
      accountNumber: randomAccountNumber(),
      accountType,
      status: "active",
      balance: 0,
      updatedAt: new Date().toISOString(),
    }
    writeAccounts([...readAccounts(), account])
    return account
  },
}
