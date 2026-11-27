<script setup>
defineProps({
  steps: { type: Array, required: true },
  current: { type: Number, default: 0 },
})
</script>

<template>
  <div class="stepper" role="group" aria-label="Progress">
    <div v-for="(step, index) in steps" :key="step" :class="{ active: index <= current }" :aria-current="index === current ? 'step' : undefined">
      <span>{{ index < current ? "✓" : index + 1 }}</span>
      <small>{{ step }}</small>
    </div>
  </div>
</template>
