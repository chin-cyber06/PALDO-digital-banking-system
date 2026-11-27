import { ApiError } from "~~/shared/errors.js"

// Configured once at startup by app/plugins/00.services.client.js.
let settings = { baseURL: "", getToken: () => null, onUnauthorized: null }

export function configureHttp(next) {
  settings = { ...settings, ...next }
}

function normalizeError(error) {
  if (error instanceof ApiError) return error
  const status = error?.response?.status ?? 0
  // Proposed error envelope: { error: { code, message, fields? } }
  const body = error?.data?.error ?? error?.data ?? {}
  return new ApiError({
    status,
    code: body.code || (status ? `HTTP_${status}` : "NETWORK_ERROR"),
    message: body.message || (status ? "The request could not be completed." : "Can’t reach PALDO. Check your connection."),
    fields: body.fields || null,
  })
}

/**
 * Single entry point for real backend calls. Pages/components never call this:
 * only services/*.service.js do.
 * Proposed success envelope: { data: ..., meta?: ... } (the data part is returned).
 */
export async function request(path, { method = "GET", query, body, headers } = {}) {
  if (!settings.baseURL) {
    throw new ApiError({
      code: "NO_API_BASE_URL",
      message: "No backend URL is configured. Set NUXT_PUBLIC_API_BASE_URL or enable mocks.",
    })
  }
  try {
    const token = settings.getToken?.()
    const response = await $fetch(path, {
      baseURL: settings.baseURL,
      method,
      query,
      body,
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    })
    return response && typeof response === "object" && "data" in response ? response.data : response
  } catch (error) {
    const apiError = normalizeError(error)
    // Expired/invalid token on a protected call -> let the app clear the session.
    if (apiError.status === 401 && !path.startsWith("/auth/")) settings.onUnauthorized?.()
    throw apiError
  }
}
