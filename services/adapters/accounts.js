// Translates the backend's PROPOSED snake_case account shape into the frontend model.
// Proposed: money fields are decimal numbers in PHP (e.g. 48250.75).
// If the backend team sends something else, only this file needs to change.
export function fromApiAccount(raw) {
  return {
    id: raw.account_id ?? raw.id,
    accountNumber: raw.account_number,
    accountType: raw.account_type,
    status: raw.status,
    balance: Math.round(Number(raw.balance) * 100),
    updatedAt: raw.updated_at,
  }
}

export const fromApiLookup = (raw) => ({
  accountId: raw.account_id ?? raw.id,
  holderName: raw.holder_name ?? raw.full_name,
  bank: raw.bank ?? "PALDO",
})
