import { configureHttp } from "~~/services/http.js"
import { configureServices } from "~~/services/index.js"

// Wires runtime config into the framework-free services layer.
export default defineNuxtPlugin(() => {
  const { apiBaseUrl, useMocks } = useRuntimeConfig().public
  configureServices({ useMocks: String(useMocks) !== "false" })
  configureHttp({
    baseURL: apiBaseUrl,
    // Phase 2: read the access token from the session store.
    getToken: () => null,
  })
})
