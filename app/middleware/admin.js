import { useSessionStore } from "~/stores/session"

// Use on admin pages: definePageMeta({ middleware: "admin" }). Shows the 403 screen to customers.
export default defineNuxtRouteMiddleware(() => {
  if (!useSessionStore().isAdmin) {
    return abortNavigation(createError({ statusCode: 403, statusMessage: "Forbidden" }))
  }
})
