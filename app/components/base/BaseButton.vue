<script setup>
import { computed } from "vue"

const props = defineProps({
  variant: { type: String, default: "primary" }, // primary | secondary | ghost | danger
  type: { type: String, default: "button" },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  arrow: { type: Boolean, default: undefined }, // defaults to true for primary
})
const showArrow = computed(() => props.arrow ?? props.variant === "primary")
</script>

<template>
  <button :type="type" class="btn" :class="`btn-${variant}`" :disabled="disabled || loading" :aria-busy="loading || undefined">
    <span v-if="loading" class="spinner" role="status" aria-label="Loading" />
    <template v-else>
      <slot />
      <AppIcon v-if="showArrow" name="arrow" :size="17" />
    </template>
  </button>
</template>
