<script setup>
import { TAGLINE } from "~~/config/app.js"
</script>

<template>
  <section class="brand-panel">
    <PaldoLogo white />
    <div class="brand-welcome">
      <span class="eyebrow">WELCOME TO PALDO</span>
      <h1>Banking made calm and simple.</h1>
      <p>{{ TAGLINE }}</p>
    </div>
    <div class="brand-art" aria-hidden="true">
      <div class="brand-orbit">
        <div class="orbit-ring orbit-ring-outer" />
        <div class="orbit-ring orbit-ring-inner" />
        <div class="orbit-core">₱</div>
        <span class="orbit-chip orbit-chip-transfer"><AppIcon name="transfer" :size="17" /> Move money</span>
        <span class="orbit-chip orbit-chip-bills"><AppIcon name="bills" :size="17" /> Pay bills</span>
        <span class="orbit-chip orbit-chip-goals"><AppIcon name="goals" :size="17" /> Build goals</span>
      </div>
    </div>
    <small class="brand-assurance">Secure digital banking, built around you.</small>
  </section>
</template>
