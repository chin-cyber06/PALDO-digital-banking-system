<script setup>
import { computed } from "vue"
import { passwordChecks } from "~/schemas/auth.js"

const props = defineProps({ password: { type: String, default: "" } })
const checks = computed(() => passwordChecks(props.password))
</script>

<template>
  <div class="strength" role="status" :aria-label="`${checks.filter(Boolean).length} of 4 password requirements met`">
    <i v-for="(passed, index) in checks" :key="index" :class="{ passed }" />
    <span>8+ characters, upper and lowercase, number and symbol</span>
  </div>
</template>
