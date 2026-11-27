// Domain constants shared by services, mocks, schemas and UI.
export const ROLES = { customer: "customer", admin: "admin" }
export const ACCOUNT_TYPES = ["savings", "checking"]
export const ACCOUNT_STATUSES = ["active", "frozen", "closed"]
export const TRANSACTION_TYPES = ["deposit", "withdrawal", "transfer", "bill_payment", "goal_contribution"]
export const TRANSACTION_STATUSES = ["completed", "pending", "failed", "reversed"]

// From the PALDO handoff (ERD v1.2). Enforce on client AND server.
export const FIELD_LIMITS = {
  accountNumber: 16,
  referenceNo: 30,
  note: 100,
  username: 50,
  email: 150,
  fullName: 100,
  phone: 20,
}
