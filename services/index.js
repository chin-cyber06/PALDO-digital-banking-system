import { accountsService } from "./accounts.service.js"
import { accountsMock } from "../mocks/handlers/accounts.mock.js"

// Every domain exposes ONE interface with two implementations (real + mock).
// Stores import `services` and never know which one is active.
// NUXT_PUBLIC_USE_MOCKS switches them at startup (see app/plugins/00.services.client.js).
let useMocks = true

export function configureServices({ useMocks: flag }) {
  useMocks = flag
}

const pick = (real, mock) => new Proxy({}, { get: (_, key) => (useMocks ? mock : real)[key] })

export const services = {
  accounts: pick(accountsService, accountsMock),
  // Added in later phases using the same pattern:
  // auth, transactions, deposits, withdrawals, transfers, beneficiaries,
  // bills, savings, notifications, profile
}

export const isUsingMocks = () => useMocks
