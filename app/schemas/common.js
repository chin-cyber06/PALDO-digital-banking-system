import { z } from "zod"
import { FIELD_LIMITS } from "~~/shared/constants.js"
import { toCentavos } from "~/utils/money.js"

// Reusable field schemas. Feature schemas (auth, transfer, bills...) are added in later phases.
export const accountNumberSchema = z
  .string()
  .regex(new RegExp(`^\\d{${FIELD_LIMITS.accountNumber}}$`), `Enter a valid ${FIELD_LIMITS.accountNumber}-digit account number.`)

export const emailSchema = z
  .string()
  .trim()
  .max(FIELD_LIMITS.email, `Email can be up to ${FIELD_LIMITS.email} characters.`)
  .email("Enter a valid email address.")

export const noteSchema = z
  .string()
  .max(FIELD_LIMITS.note, `Note can be up to ${FIELD_LIMITS.note} characters.`)
  .optional()

/** Amount typed by the user as text; must be > 0 with at most 2 decimals. */
export const amountSchema = z
  .string()
  .refine((value) => Number.isFinite(toCentavos(value)), "Enter a valid amount (up to 2 decimals).")
  .refine((value) => toCentavos(value) > 0, "Enter an amount greater than ₱0.00.")
