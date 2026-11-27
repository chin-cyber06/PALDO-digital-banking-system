<script setup>
import { useUiStore } from "~/stores/ui"
const ui = useUiStore()
</script>

<template>
  <div class="toast-host" role="status" aria-live="polite">
    <div v-for="toast in ui.toasts" :key="toast.id" class="toast" :class="toast.type" :style="{ '--toast-ms': `${toast.duration}ms` }" @click="ui.dismissToast(toast.id)">
      <AppIcon :name="toast.type === 'error' ? 'close' : 'check'" :size="18" />
      {{ toast.message }}
    </div>
  </div>
</template>
