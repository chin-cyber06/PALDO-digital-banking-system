/**
 * Run a Zod schema and return form-friendly output.
 * @returns {{ success: boolean, data?: any, errors: Record<string,string> }}
 */
export function validate(schema, values) {
  const result = schema.safeParse(values)
  if (result.success) return { success: true, data: result.data, errors: {} }
  const errors = {}
  for (const issue of result.error.issues) {
    const key = issue.path.join(".") || "_form"
    if (!errors[key]) errors[key] = issue.message
  }
  return { success: false, errors }
}
