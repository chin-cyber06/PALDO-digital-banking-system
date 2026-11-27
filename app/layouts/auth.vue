<script setup>
import { usePreferencesStore } from "~/stores/preferences"
import { TAGLINE } from "~~/config/app.js"

const prefs = usePreferencesStore()
</script>

<template>
  <div class="auth">
    <AuthBrandPanel />
    <main class="auth-form">
      <button type="button" class="icon-btn theme-auth" :aria-label="prefs.isDark ? 'Switch to light mode' : 'Switch to dark mode'" @click="prefs.toggleTheme()">
        <AppIcon :name="prefs.isDark ? 'sun' : 'moon'" />
      </button>
      <div class="mobile-auth-logo"><PaldoLogo /><p>{{ TAGLINE }}</p></div>
      <slot />
    </main>
  </div>
</template>
