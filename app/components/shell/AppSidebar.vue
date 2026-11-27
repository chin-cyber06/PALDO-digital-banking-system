<script setup>
import { computed } from "vue"
import { useSessionStore } from "~/stores/session"
import { useUiStore } from "~/stores/ui"
import { ADMIN_ITEM, SIDEBAR_ITEMS, isActivePath, isMoneyRoute } from "~/utils/navigation.js"
import { APP_VERSION, TAGLINE } from "~~/config/app.js"

const route = useRoute()
const session = useSessionStore()
const ui = useUiStore()
const items = computed(() => (session.isAdmin ? [...SIDEBAR_ITEMS, ADMIN_ITEM] : SIDEBAR_ITEMS))
</script>

<template>
  <aside class="sidebar" :class="{ collapsed: ui.sidebarCollapsed }">
    <PaldoLogo />
    <nav aria-label="Main">
      <NavItem v-for="item in items" :key="item.to" v-bind="item" :active="isActivePath(route.path, item.to)" :disabled="!ui.online && isMoneyRoute(item.to)" />
    </nav>
    <div class="sidebar-bottom">
      <NavItem to="/settings" icon="user" label="Profile" :active="isActivePath(route.path, '/settings')" />
      <small>PALDO v{{ APP_VERSION }} • Secure banking</small>
      <p class="sidebar-tagline">{{ TAGLINE }}</p>
    </div>
  </aside>
</template>
