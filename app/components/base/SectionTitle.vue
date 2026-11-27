<script setup>
defineProps({ title: { type: String, required: true } })
</script>

<template>
  <div class="section-title">
    <div><span class="section-mark" /><h2>{{ title }}</h2></div>
    <slot name="action" />
  </div>
</template>
