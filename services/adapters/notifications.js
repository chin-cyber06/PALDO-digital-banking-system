export const fromApiNotification = (raw) => ({
  id: raw.notification_id ?? raw.id,
  title: raw.title,
  description: raw.description ?? raw.message ?? "",
  icon: raw.icon ?? "bell",
  createdAt: raw.created_at,
  read: Boolean(raw.is_read ?? raw.read),
  link: raw.link ?? undefined,
})
