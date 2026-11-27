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

/**
 * @typedef {"customer"|"admin"} Role
 *
 * @typedef {Object} UserProfile
 * @property {string} fullName
 * @property {string} email
 * @property {string} username
 * @property {string} [phone]
 * @property {string} [dateOfBirth]  YYYY-MM-DD
 * @property {string} [address]
 * @property {Role} role
 * @property {"active"|"locked"|"deactivated"} status
 * @property {string} createdAt
 * @property {string} lastPasswordChange
 *
 * @typedef {Object} AuthSession
 * @property {UserProfile} user
 * @property {string} accessToken
 * @property {string} [expiresAt]
 *
 * @typedef {Object} NotificationItem
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} icon        AppIcon name
 * @property {string} createdAt   ISO timestamp
 * @property {boolean} read
 * @property {string} [link]      In-app path to open on click
 */
