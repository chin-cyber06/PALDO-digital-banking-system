<script setup>
// Pass `clickable` to make the card keyboard-accessible; listen with @click.
defineProps({ clickable: { type: Boolean, default: false } })
</script>

<template>
  <div
    class="card"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @keydown.enter.self="clickable && $event.target.click()"
  >
    <slot />
  </div>
</template>
