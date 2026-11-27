<script setup>
import { ref } from "vue"
import { useFocusTrap } from "~/composables/useFocusTrap.js"
import { useNotificationsStore } from "~/stores/notifications"
import { useUiStore } from "~/stores/ui"
import { timeAgo } from "~/utils/format.js"

const emit = defineEmits(["close"])
const notifications = useNotificationsStore()
const ui = useUiStore()
const panel = ref(null)
useFocusTrap(panel, { onEscape: () => emit("close") })

// Always show fresh data when the panel opens.
notifications.fetchAll()

async function open(item) {
  notifications.markRead(item.id)
  emit("close")
  if (item.link) await navigateTo(item.link)
}
function retry() {
  ui.refreshOnline()
  if (ui.online) notifications.fetchAll()
}
</script>

<template>
  <Teleport to="body">
    <div class="sheet-backdrop notification-backdrop" @mousedown.self="emit('close')">
      <div ref="panel" class="notification-panel" role="dialog" aria-modal="true" aria-label="Notifications" tabindex="-1">
        <div class="modal-head">
          <h3>Notifications</h3>
          <button type="button" class="icon-btn" aria-label="Close notifications" @click="emit('close')"><AppIcon name="close" /></button>
        </div>

        <div v-if="!ui.online" class="notification-state">
          <AppIcon name="close" /><strong>Notifications unavailable</strong>
          <p>Reconnect and retry to load your notifications.</p>
          <BaseButton variant="secondary" @click="retry">Retry</BaseButton>
        </div>
        <div v-else-if="notifications.isLoading && !notifications.items.length" class="notification-skeleton" aria-busy="true">
          <div v-for="n in 4" :key="n" class="skeleton" />
        </div>
        <div v-else-if="notifications.status === 'error'" class="notification-state">
          <AppIcon name="close" /><strong>We couldn’t load notifications</strong>
          <p>{{ notifications.error }}</p>
          <BaseButton variant="secondary" @click="notifications.fetchAll()">Retry</BaseButton>
        </div>
        <div v-else-if="!notifications.items.length" class="notification-state">
          <AppIcon name="bell" /><strong>You’re all caught up</strong>
          <p>New activity will appear here.</p>
        </div>
        <template v-else>
          <button v-for="item in notifications.items" :key="item.id" type="button" class="notification-item" @click="open(item)">
            <i v-if="!item.read" aria-label="Unread" />
            <span><AppIcon :name="item.icon" /></span>
            <div><strong>{{ item.title }}</strong><p>{{ item.description }}</p><small>{{ timeAgo(item.createdAt) }}</small></div>
          </button>
          <BaseButton variant="secondary" class="full" :disabled="notifications.unreadCount === 0" @click="notifications.markAllRead()">
            {{ notifications.unreadCount === 0 ? "All notifications read" : "Mark all as read" }}
          </BaseButton>
        </template>
      </div>
    </div>
  </Teleport>
</template>
