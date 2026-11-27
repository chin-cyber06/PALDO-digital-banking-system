<script setup>
// Temporary placeholder so every route in the navigation resolves until its phase ships.
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  phase: { type: Number, required: true },
})
</script>

<template>
  <div class="page">
    <header class="page-heading">
      <div><p>{{ eyebrow }}</p><h1>{{ title }}</h1></div>
    </header>
    <BaseCard class="placeholder-card">
      <span aria-hidden="true">₱</span>
      <div>
        <small>COMING IN PHASE {{ phase }}</small>
        <h2>{{ title }} is on its way</h2>
        <p>This screen is part of the rebuild plan and will be completed in Phase {{ phase }}.</p>
      </div>
    </BaseCard>
  </div>
</template>
