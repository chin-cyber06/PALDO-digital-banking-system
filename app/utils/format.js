export function getInitials(fullName = "") {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return "?"
  return `${parts[0][0]}${parts.length > 1 ? parts[parts.length - 1][0] : ""}`.toUpperCase()
}

/** Masked account number for general display; full number only in secure details. */
export const maskAccountNumber = (accountNumber = "") => `•••• ${String(accountNumber).slice(-4)}`

export const formatDate = (iso, options = { month: "short", day: "numeric", year: "numeric" }) =>
  new Date(iso).toLocaleDateString("en-PH", options)

export const formatDateTime = (iso) => new Date(iso).toLocaleString("en-PH")

export const uid = (prefix = "id") => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`
