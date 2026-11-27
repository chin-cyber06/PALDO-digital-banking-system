// One error type for real and mock services so stores handle both identically.
export class ApiError extends Error {
  constructor({ status = 0, code = "UNKNOWN", message = "Something went wrong.", fields = null } = {}) {
    super(message)
    this.name = "ApiError"
    this.status = status // HTTP status, 0 = network/unknown
    this.code = code // machine-readable, e.g. INSUFFICIENT_FUNDS
    this.fields = fields // optional { fieldName: "message" } for form errors
  }
}
