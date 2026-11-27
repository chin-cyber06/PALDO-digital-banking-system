import { useUiStore } from "~/stores/ui"

// Tracks browser connectivity so the app can show the offline banner and lock money actions.
export default defineNuxtPlugin(() => {
  const ui = useUiStore()
  ui.setOnline(navigator.onLine)
  window.addEventListener("offline", () => ui.setOnline(false))
  window.addEventListener("online", () => ui.setOnline(true))
})
