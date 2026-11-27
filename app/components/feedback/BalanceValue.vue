<script setup>
import { computed } from "vue"
import { usePreferencesStore } from "~/stores/preferences"
import { BALANCE_MASK, formatMoney } from "~/utils/money.js"

// `value` is integer centavos. Follows the global hide-balance preference
// unless `hidden` is passed explicitly.
const props = defineProps({
  value: { type: Number, default: 0 },
  hidden: { type: Boolean, default: undefined },
})
const prefs = usePreferencesStore()
const isHidden = computed(() => props.hidden ?? prefs.balanceHidden)
</script>

<template>
  <span :key="isHidden ? 'hidden' : 'visible'" class="balance-switch" :aria-label="isHidden ? 'Balance hidden' : undefined">
    {{ isHidden ? BALANCE_MASK : formatMoney(value) }}
  </span>
</template>
