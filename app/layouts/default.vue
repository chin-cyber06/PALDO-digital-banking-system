<script setup>
import { onMounted } from "vue"
import { useNotificationsStore } from "~/stores/notifications"
import { useUiStore } from "~/stores/ui"

const ui = useUiStore()
const notifications = useNotificationsStore()
onMounted(() => notifications.fetchAll())
</script>

<template>
  <div class="app-shell" :class="{ 'offline-lock': !ui.online }">
    <OfflineBanner v-if="!ui.online" />
    <AppSidebar />
    <div class="main-shell" :class="{ 'sidebar-collapsed': ui.sidebarCollapsed }">
      <AppTopBar />
      <main id="main" class="main-content">
        <ModuleStateBoundary><slot /></ModuleStateBoundary>
      </main>
    </div>
    <MobileNav />
  </div>
</template>
