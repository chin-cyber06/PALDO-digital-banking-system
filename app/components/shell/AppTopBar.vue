<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"
import { useNotificationsStore } from "~/stores/notifications"
import { usePreferencesStore } from "~/stores/preferences"
import { useSessionStore } from "~/stores/session"
import { useUiStore } from "~/stores/ui"
import { getInitials } from "~/utils/format.js"
import { useLogout } from "~/composables/useLogout.js"

const session = useSessionStore()
const prefs = usePreferencesStore()
const ui = useUiStore()
const notifications = useNotificationsStore()
const logout = useLogout()

const notificationsOpen = ref(false)
const menuOpen = ref(false)
const logoutOpen = ref(false)
const actions = ref(null)

const onDocClick = (event) => { if (menuOpen.value && !actions.value?.contains(event.target)) menuOpen.value = false }
const onKey = (event) => { if (event.key === "Escape") menuOpen.value = false }
onMounted(() => { document.addEventListener("click", onDocClick); document.addEventListener("keydown", onKey) })
onBeforeUnmount(() => { document.removeEventListener("click", onDocClick); document.removeEventListener("keydown", onKey) })

async function goProfile() {
  menuOpen.value = false
  await navigateTo("/settings")
}
function askLogout() {
  menuOpen.value = false
  logoutOpen.value = true
}
</script>

<template>
  <header class="topbar">
    <div class="topbar-leading">
      <button type="button" class="desktop-nav-toggle" :aria-label="ui.sidebarCollapsed ? 'Show sidebar' : 'Hide sidebar'" :aria-expanded="!ui.sidebarCollapsed" @click="ui.toggleSidebar()">
        <AppIcon name="menu" />
      </button>
      <NuxtLink to="/" class="mobile-logo" aria-label="PALDO home" style="text-decoration: none; color: inherit">
        <PaldoLogo icon /><strong>PALDO</strong>
      </NuxtLink>
    </div>

    <div ref="actions" class="top-actions">
      <button type="button" class="icon-btn" :aria-label="prefs.isDark ? 'Switch to light mode' : 'Switch to dark mode'" @click="prefs.toggleTheme()">
        <AppIcon :name="prefs.isDark ? 'sun' : 'moon'" />
      </button>
      <button type="button" class="icon-btn" :aria-label="notifications.unreadCount ? `Notifications, ${notifications.unreadCount} unread` : 'Notifications'" @click="notificationsOpen = true">
        <AppIcon name="bell" />
        <span v-if="notifications.unreadCount > 0" class="dot" />
      </button>
      <button type="button" class="avatar" :aria-label="`${session.user?.fullName} account menu`" aria-haspopup="menu" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
        {{ getInitials(session.user?.fullName) }}
      </button>
      <div class="user-text">
        <strong>{{ session.user?.fullName }}</strong>
        <small>{{ session.isAdmin ? "Administrator" : "Customer" }}</small>
      </div>
      <div v-if="menuOpen" class="avatar-menu" role="menu">
        <button type="button" role="menuitem" @click="goProfile">Profile</button>
        <button type="button" role="menuitem" @click="askLogout">Log out</button>
      </div>
    </div>

    <NotificationPanel v-if="notificationsOpen" @close="notificationsOpen = false" />
    <BaseModal v-if="logoutOpen" title="Log out of PALDO?" @close="logoutOpen = false">
      <p>Are you sure you want to log out? You’ll need to sign in again to access your account.</p>
      <div class="modal-actions">
        <BaseButton variant="secondary" @click="logoutOpen = false">Cancel</BaseButton>
        <BaseButton variant="danger" @click="logoutOpen = false; logout()">Log out</BaseButton>
      </div>
    </BaseModal>
  </header>
</template>
