<script setup>
import { onBeforeUnmount, onMounted, ref, useId } from "vue"

const props = defineProps({
  title: { type: String, required: true },
  // Banking confirmations should not close by accidental outside click.
  closeOnBackdrop: { type: Boolean, default: false },
})
const emit = defineEmits(["close"])

const titleId = useId()
const dialog = ref(null)
let previouslyFocused = null
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

function onKeydown(event) {
  if (event.key === "Escape") {
    event.stopPropagation()
    emit("close")
    return
  }
  if (event.key !== "Tab") return
  const nodes = dialog.value?.querySelectorAll(FOCUSABLE)
  if (!nodes?.length) return
  const first = nodes[0]
  const last = nodes[nodes.length - 1]
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
}

onMounted(() => {
  previouslyFocused = document.activeElement
  document.body.style.overflow = "hidden"
  const firstField = dialog.value?.querySelector("input,select,textarea")
  ;(firstField ?? dialog.value)?.focus()
})
onBeforeUnmount(() => {
  document.body.style.overflow = ""
  previouslyFocused?.focus?.()
})
</script>

<template>
  <Teleport to="body">
    <div class="modal-backdrop" @mousedown.self="props.closeOnBackdrop && emit('close')" @keydown="onKeydown">
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
