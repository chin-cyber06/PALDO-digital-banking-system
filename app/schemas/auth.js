import { z } from "zod"
import { FIELD_LIMITS } from "~~/shared/constants.js"
import { emailSchema } from "./common.js"

export const STRONG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

export const passwordChecks = (password = "") => [
  password.length >= 8,
  /[a-z]/.test(password) && /[A-Z]/.test(password),
  /\d/.test(password),
  /[^A-Za-z0-9]/.test(password),
]

const isAdult = (value) => {
  const birth = new Date(value)
  if (Number.isNaN(birth.getTime())) return false
  const cutoff = new Date()
  cutoff.setFullYear(cutoff.getFullYear() - 18)
  return birth <= cutoff
}

export const loginSchema = z.object({
  identity: z
    .string()
    .trim()
    .refine(
      (value) => /^[a-zA-Z0-9._-]{4,}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Enter a valid email or username.",
    ),
  password: z.string().min(8, "Password must be at least 8 characters."),
})

export const forgotPasswordSchema = z.object({ email: emailSchema })

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required.").max(FIELD_LIMITS.fullName, `Full name can be up to ${FIELD_LIMITS.fullName} characters.`),
  email: emailSchema,
  username: z.string().regex(/^[a-zA-Z0-9]{4,20}$/, "Use 4–20 letters or numbers."),
  phone: z.string().trim().min(1, "Phone number is required.").max(FIELD_LIMITS.phone, `Phone can be up to ${FIELD_LIMITS.phone} characters.`),
  dateOfBirth: z.string().min(1, "Date of birth is required.").refine(isAdult, "You must be at least 18 years old."),
  address: z.string().trim().max(200, "Address is too long.").optional(),
  password: z.string().regex(STRONG_PASSWORD, "Weak password. Complete all four requirements."),
  confirm: z.string().min(1, "Confirm your password."),
  terms: z.literal(true, { errorMap: () => ({ message: "You must agree to the terms to continue." }) }),
})

/** Registration validation that reports ALL errors at once, including password mismatch. */
export function validateRegistration(values) {
  const result = registerSchema.safeParse(values)
  const errors = {}
  if (!result.success) {
    for (const issue of result.error.issues) {
      const key = issue.path.join(".") || "_form"
      if (!errors[key]) errors[key] = issue.message
    }
  }
  if (!errors.confirm && values.password !== values.confirm) errors.confirm = "Passwords don't match."
  return { success: !Object.keys(errors).length, data: result.success ? result.data : undefined, errors }
}
