<script setup>
import { useUiStore } from "~/stores/ui"
const ui = useUiStore()
</script>

<template>
  <div class="offline-banner" role="status">
    <span>You’re offline. Reconnect to continue.</span>
    <button type="button" @click="ui.refreshOnline()">Retry</button>
  </div>
</template>
