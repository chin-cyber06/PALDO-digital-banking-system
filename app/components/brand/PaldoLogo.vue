<script setup>
defineProps({
  white: { type: Boolean, default: false }, // reversed lockup for red surfaces
  icon: { type: Boolean, default: false }, // compact app icon
  animated: { type: Boolean, default: false }, // splash animation
})
</script>

<template>
  <div v-if="icon" class="logo-icon" role="img" aria-label="PALDO"><span aria-hidden="true">₱</span></div>
  <div v-else class="logo" :class="{ white, 'logo-animated': animated }" role="img" aria-label="PALDO">
    <span class="peso" aria-hidden="true">P<i /><b /></span>
    <span class="letters" aria-hidden="true">ALD<span class="coin-o">O<em /></span></span>
    <span class="growth-line" aria-hidden="true" />
    <span class="arrow-tip" aria-hidden="true" />
  </div>
</template>
