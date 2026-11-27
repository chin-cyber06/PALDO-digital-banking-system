import { configureHttp } from "~~/services/http.js"
import { configureServices } from "~~/services/index.js"
import { useSessionStore } from "~/stores/session"

// Wires runtime config + session into the framework-free services layer.
export default defineNuxtPlugin(() => {
  const { apiBaseUrl, useMocks } = useRuntimeConfig().public
  configureServices({ useMocks: String(useMocks) !== "false" })
  configureHttp({
    baseURL: apiBaseUrl,
    getToken: () => useSessionStore().accessToken,
    onUnauthorized: () => {
      useSessionStore().clear()
      navigateTo("/login")
    },
  })
})
