<script setup>
import { computed } from "vue"

const props = defineProps({ status: { type: String, required: true } })
// A glyph accompanies the label so status never relies on color alone.
const glyphs = { completed: "✓", pending: "◷", failed: "×", reversed: "↶", cancelled: "×" }
const glyph = computed(() => glyphs[props.status] ?? "↗")
</script>

<template>
  <span class="badge" :class="status"><span aria-hidden="true">{{ glyph }}</span>{{ status }}</span>
</template>
