<script setup>
import { useUiStore } from "~/stores/ui"
import { MOBILE_ITEMS, isActivePath, isMoneyRoute } from "~/utils/navigation.js"

const route = useRoute()
const ui = useUiStore()
</script>

<template>
  <nav class="mobile-nav" aria-label="Main">
    <NavItem v-for="item in MOBILE_ITEMS" :key="item.to" v-bind="item" :active="isActivePath(route.path, item.to)" :disabled="!ui.online && isMoneyRoute(item.to)" />
  </nav>
</template>
