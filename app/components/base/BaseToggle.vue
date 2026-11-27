<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, required: true },
  description: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(["update:modelValue", "change"])
</script>

<template>
  <div class="toggle-row">
    <div>
      <strong>{{ label }}</strong>
      <small v-if="description">{{ description }}</small>
    </div>
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="label"
      :class="{ on: modelValue }"
      :disabled="disabled"
      @click="emit('update:modelValue', !modelValue); emit('change', !modelValue)"
    >
      <i />
    </button>
  </div>
</template>
