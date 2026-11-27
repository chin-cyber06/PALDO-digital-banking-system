<script setup>
// Required by the brief: simulated activity must be clearly labeled as mock.
const demo = useDemoMode()
</script>

<template>
  <div v-if="demo" class="demo-badge" role="note">Demo mode: simulated transactions</div>
</template>
