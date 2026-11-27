<script setup>
defineProps({
  to: { type: String, required: true },
  icon: { type: String, required: true },
  label: { type: String, required: true },
  active: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  center: { type: Boolean, default: false }, // raised Transfer button on the mobile tab bar
})
</script>

<template>
  <span v-if="disabled" class="nav-item disabled" aria-disabled="true" :title="`${label} (unavailable offline)`">
    <AppIcon :name="icon" /><span>{{ label }}</span>
  </span>
  <NuxtLink v-else :to="to" class="nav-item" :class="{ active, 'center-transfer': center }" :aria-current="active ? 'page' : undefined" :aria-label="label" :title="label">
    <AppIcon :name="icon" /><span>{{ label }}</span>
  </NuxtLink>
</template>
