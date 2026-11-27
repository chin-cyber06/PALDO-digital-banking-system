import { useSessionStore } from "~/stores/session"
import { useUiStore } from "~/stores/ui"
import { useAccountsStore } from "~/stores/accounts"
import { useNotificationsStore } from "~/stores/notifications"

/** Returns a function that ends the session, clears user data and returns to /login. */
export function useLogout() {
  const session = useSessionStore()
  const ui = useUiStore()
  return async () => {
    await session.logout()
    useAccountsStore().$reset()
    useNotificationsStore().$reset()
    ui.notify("You’re logged out. Your current session was revoked.")
    await navigateTo("/login")
  }
}
