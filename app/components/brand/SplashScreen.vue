<script setup>
import { onBeforeUnmount, onMounted } from "vue"
import { SPLASH_DURATION_MS, TAGLINE } from "~~/config/app.js"

const emit = defineEmits(["done"])
let timer
onMounted(() => { timer = setTimeout(() => emit("done"), SPLASH_DURATION_MS) })
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="splash" role="presentation" title="Tap to skip" @click="emit('done')">
    <PaldoLogo animated white />
    <p>{{ TAGLINE }}</p>
  </div>
</template>
