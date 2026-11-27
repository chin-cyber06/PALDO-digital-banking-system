import { usePreferencesStore } from "~/stores/preferences"
import { useUiStore } from "~/stores/ui"

// Restore saved preferences and splash state before the app mounts.
export default defineNuxtPlugin(() => {
  usePreferencesStore().hydrate()
  useUiStore().initSplash()
})
