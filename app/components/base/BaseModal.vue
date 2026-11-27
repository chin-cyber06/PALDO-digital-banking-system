<script setup>
import { ref, useId } from "vue"
import { useFocusTrap } from "~/composables/useFocusTrap.js"

const props = defineProps({
  title: { type: String, required: true },
  // Banking confirmations should not close by accidental outside click.
  closeOnBackdrop: { type: Boolean, default: false },
})
const emit = defineEmits(["close"])

const titleId = useId()
const dialog = ref(null)
useFocusTrap(dialog, { onEscape: () => emit("close") })
</script>

<template>
  <Teleport to="body">
    <div class="modal-backdrop" @mousedown.self="props.closeOnBackdrop && emit('close')">
      <div ref="dialog" class="modal" role="dialog" aria-modal="true" :aria-labelledby="titleId" tabindex="-1">
        <div class="modal-head">
          <h3 :id="titleId">{{ title }}</h3>
          <button type="button" class="icon-btn" aria-label="Close" @click="emit('close')"><AppIcon name="close" /></button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
