// Backend (PROPOSED snake_case) -> frontend models. Edit only here if the real shape differs.
export const fromApiUser = (raw) => ({
  fullName: raw.full_name,
  email: raw.email,
  username: raw.username,
  phone: raw.phone ?? undefined,
  dateOfBirth: raw.date_of_birth ?? undefined,
  address: raw.address ?? undefined,
  role: raw.role?.name ?? raw.role ?? "customer",
  status: raw.status ?? "active",
  createdAt: raw.created_at,
  lastPasswordChange: raw.last_password_change ?? raw.created_at,
})

export const fromApiSession = (raw) => ({
  user: fromApiUser(raw.user),
  accessToken: raw.access_token,
  expiresAt: raw.expires_at,
})

export const toApiRegistration = (payload) => ({
  full_name: payload.fullName,
  email: payload.email,
  username: payload.username,
  phone: payload.phone,
  date_of_birth: payload.dateOfBirth,
  address: payload.address || null,
  password: payload.password,
})
