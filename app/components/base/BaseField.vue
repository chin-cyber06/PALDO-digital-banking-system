<script setup>
import { computed, ref, useId } from "vue"

const props = defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, required: true },
  placeholder: { type: String, default: "" },
  type: { type: String, default: "text" },
  error: { type: String, default: "" },
  maxLength: { type: Number, default: undefined },
  reveal: { type: Boolean, default: false }, // password show/hide
  inputmode: { type: String, default: undefined },
  autocomplete: { type: String, default: undefined },
  name: { type: String, default: undefined },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(["update:modelValue", "blur"])

const errorId = useId()
const visible = ref(false)
const inputType = computed(() => (props.reveal && visible.value ? "text" : props.type))
</script>

<template>
  <label class="field" :class="{ 'has-error': error }">
    <span>{{ label }}</span>
    <span class="field-control">
      <input
        :value="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :inputmode="inputmode"
        :autocomplete="autocomplete"
        :name="name"
        :disabled="disabled"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="error ? errorId : undefined"
        @input="emit('update:modelValue', $event.target.value)"
        @blur="emit('blur', $event)"
      />
      <button
        v-if="reveal"
        type="button"
        class="field-action"
        :aria-label="visible ? 'Hide password' : 'Show password'"
        @click="visible = !visible"
      >
        <AppIcon :name="visible ? 'eyeOff' : 'eye'" :size="18" />
      </button>
    </span>
    <small v-if="error" :id="errorId" role="alert">{{ error }}</small>
  </label>
</template>
