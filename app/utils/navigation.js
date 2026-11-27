// Single source of truth for navigation (sidebar + mobile tab bar).
// Pages that move money are disabled while offline.
export const MONEY_ROUTES = ["/deposit", "/withdraw", "/transfer", "/bills", "/goals"]

export const SIDEBAR_ITEMS = [
  { to: "/", icon: "home", label: "Home" },
  { to: "/accounts", icon: "card", label: "Accounts" },
  { to: "/transfer", icon: "transfer", label: "Transfer" },
  { to: "/bills", icon: "bills", label: "Bills" },
  { to: "/goals", icon: "goals", label: "Savings" },
  { to: "/history", icon: "history", label: "History" },
]
export const ADMIN_ITEM = { to: "/admin", icon: "settings", label: "Admin Dashboard" }

export const MOBILE_ITEMS = [
  { to: "/", icon: "home", label: "Home" },
  { to: "/history", icon: "history", label: "History" },
  { to: "/transfer", icon: "transfer", label: "Transfer", center: true },
  { to: "/bills", icon: "bills", label: "Bills" },
  { to: "/settings", icon: "user", label: "Profile" },
]

export const isActivePath = (current, to) => (to === "/" ? current === "/" : current === to || current.startsWith(`${to}/`))
export const isMoneyRoute = (to) => MONEY_ROUTES.some((route) => isActivePath(to, route))

/** Only allow same-site relative redirects (prevents open-redirect after login). */
export const safeRedirect = (value) => (typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : "/")
