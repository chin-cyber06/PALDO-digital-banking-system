<script setup>
import { useUiStore } from "~/stores/ui"
const ui = useUiStore()
</script>

<template>
  <SplashScreen v-if="ui.splashVisible" @done="ui.dismissSplash()" />
  <template v-else>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <DemoModeBadge />
  </template>
  <ToastHost />
</template>
