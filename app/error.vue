<script setup>
import { computed } from "vue"
import { useSessionStore } from "~/stores/session"

const props = defineProps({ error: { type: Object, required: true } })
const session = useSessionStore()

const code = computed(() => props.error?.statusCode ?? 500)
const copy = computed(() => {
  if (code.value === 403) return { title: "You don’t have access to this.", text: "This area is reserved for PALDO administrators." }
  if (code.value === 404) return { title: "This page wandered off.", text: "The page you’re looking for doesn’t exist in PALDO." }
  return { title: "Something went wrong.", text: "Please try again. If it keeps happening, contact support." }
})
const home = () => clearError({ redirect: session.isAuthenticated ? "/" : "/login" })
</script>

<template>
  <NuxtLayout :name="session.isAuthenticated ? 'default' : 'blank'">
    <div class="page access-state" :class="{ 'error-screen': !session.isAuthenticated }">
      <div>
        <div class="access-code">{{ code }}</div>
        <h1>{{ copy.title }}</h1>
        <p>{{ copy.text }}</p>
        <BaseButton @click="home">{{ session.isAuthenticated ? "Back to dashboard" : "Back to login" }}</BaseButton>
      </div>
    </div>
  </NuxtLayout>
</template>
