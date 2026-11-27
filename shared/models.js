/**
 * Frontend data models (JSDoc only). Money is ALWAYS integer centavos
 * inside the frontend (PHP 48,250.75 -> 4825075). Adapters in services/adapters
 * convert from/to whatever the backend sends.
 *
 * @typedef {"savings"|"checking"} AccountType
 * @typedef {"active"|"frozen"|"closed"} AccountStatus
 *
 * @typedef {Object} Account
 * @property {string} id            Internal id (never shown to customers)
 * @property {string} accountNumber 16 digits
 * @property {AccountType} accountType
 * @property {AccountStatus} status
 * @property {number} balance       Integer centavos
 * @property {string} updatedAt     ISO timestamp
 *
 * @typedef {Object} PaldoLookupResult
 * @property {string} accountId
 * @property {string} holderName
 * @property {string} bank
 */
export {}
