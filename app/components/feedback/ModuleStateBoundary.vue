<script setup>
// Wraps every page. Pages handle their own real loading/error/empty states; this adds the
// handoff's QA preview: append ?state=loading|empty|error|success|disabled to any route.
import { computed, ref, watch } from "vue"

const route = useRoute()
const router = useRouter()
const dismissed = ref(false)
watch(() => route.path, () => { dismissed.value = false })

const forced = computed(() => (dismissed.value ? null : String(route.query.state ?? "")))
const moduleName = computed(() => {
  if (route.path === "/") return "Dashboard"
  return route.path.split("/").filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1)).join(" ")
})

function leavePreview(to) {
  dismissed.value = true
  const { state, ...query } = route.query
  router.replace({ path: to ?? route.path, query: to ? {} : query })
}
</script>

<template>
  <div v-if="forced === 'loading'" class="module-state skeleton-state" :aria-label="`${moduleName} loading`" aria-busy="true">
    <div class="skeleton state-heading" />
    <div class="state-skeleton-grid"><div v-for="n in 6" :key="n" class="skeleton" /></div>
  </div>
  <div v-else-if="forced === 'error'" class="module-state state-message">
    <span><AppIcon name="close" :size="28" /></span>
    <h2>We couldn’t load {{ moduleName }}</h2>
    <p>Check your connection and try again.</p>
    <BaseButton @click="leavePreview()">Retry</BaseButton>
  </div>
  <div v-else-if="forced === 'empty'" class="module-state state-message">
    <span aria-hidden="true">₱</span>
    <h2>No {{ moduleName.toLowerCase() }} data yet</h2>
    <p>Your PALDO activity will appear here when it’s available.</p>
    <BaseButton @click="leavePreview(route.path === '/' ? '/deposit' : '/')">
      {{ route.path === "/" ? "Make your first deposit" : "Back to dashboard" }}
    </BaseButton>
  </div>
  <div v-else class="module-content" :class="{ 'module-disabled': forced === 'disabled' }">
    <div v-if="forced === 'success'" class="state-success" role="status"><AppIcon name="check" /> {{ moduleName }} updated successfully.</div>
    <div v-if="forced === 'disabled'" class="state-disabled-note">Actions are temporarily disabled.</div>
    <slot />
  </div>
</template>
