// Central, framework-free application constants.
export const APP_NAME = "PALDO"
export const APP_VERSION = "1.2"
export const TAGLINE = "Bank with Ease, Build with Peace."
export const SPLASH_DURATION_MS = 5000

export const STORAGE_KEYS = {
  theme: "paldo_theme",
  language: "paldo_language",
  balanceHidden: "paldo_balance_hidden",
  splashSeen: "paldo_splash_seen",
  session: "paldo_session",
}

// Fixed values used ONLY by mock services. They reproduce the prototype's
// demo behaviour and must never be relied on once a real backend is connected.
export const MOCK = {
  adminIdentity: "admin",
  lockedIdentity: "locked",
  deactivatedIdentity: "deactivated",
  otp: "123456",
  palDoLookupAccount: "1024783456001234",
  failAmountCentavos: 1300000, // PHP 13,000.00 always fails in mock transfers
  failAccountSuffix: "0000",
}
