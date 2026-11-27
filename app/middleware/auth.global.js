import { useSessionStore } from "~/stores/session"
import { safeRedirect } from "~/utils/navigation.js"

const PUBLIC_ROUTES = ["/login", "/register"]

export default defineNuxtRouteMiddleware(async (to) => {
  const session = useSessionStore()
  await session.ensureRestored()
  const isPublic = PUBLIC_ROUTES.includes(to.path)

  if (!session.isAuthenticated && !isPublic) {
    return navigateTo({ path: "/login", query: to.fullPath === "/" ? {} : { redirect: to.fullPath } })
  }
  if (session.isAuthenticated && isPublic) return navigateTo(safeRedirect(to.query.redirect))
})
