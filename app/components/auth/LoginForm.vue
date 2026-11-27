<script setup>
import { reactive, ref } from "vue"
import { loginSchema } from "~/schemas/auth.js"
import { validate } from "~/utils/validation.js"
import { useSessionStore } from "~/stores/session"
import { useUiStore } from "~/stores/ui"
import { safeRedirect } from "~/utils/navigation.js"

const route = useRoute()
const session = useSessionStore()
const ui = useUiStore()
const demo = useDemoMode()

const form = reactive({ identity: "", password: "" })
const remember = ref(false)
const fieldErrors = ref({})
const error = ref("")
const blocked = ref(false)
const loading = ref(false)
const forgotOpen = ref(false)

async function submit() {
  error.value = ""
  blocked.value = false
  const result = validate(loginSchema, form)
  fieldErrors.value = result.errors
  if (!result.success) {
    error.value = "Enter a valid email or username and a password of at least 8 characters."
    return
  }
  loading.value = true
  try {
    await session.login({ ...result.data, remember: remember.value })
    ui.notify(`Login successful. Welcome back, ${session.firstName}.`)
    await navigateTo(safeRedirect(route.query.redirect))
  } catch (e) {
    blocked.value = ["ACCOUNT_LOCKED", "ACCOUNT_DEACTIVATED"].includes(e.code)
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form novalidate @submit.prevent="submit">
    <div v-if="error" class="error-banner" role="alert">
      ×
      <span>
        {{ error }}
        <a v-if="blocked" class="support-link" href="mailto:support@paldo.app">Contact support</a>
      </span>
    </div>
    <BaseField v-model="form.identity" label="Email or username" placeholder="Enter your email or username" autocomplete="username" :error="fieldErrors.identity" />
    <BaseField v-model="form.password" label="Password" type="password" reveal placeholder="Enter your password" autocomplete="current-password" :error="fieldErrors.password" />
    <div class="form-meta">
      <label><input v-model="remember" type="checkbox" /> Remember me</label>
      <button type="button" @click="forgotOpen = true">Forgot password?</button>
    </div>
    <BaseButton type="submit" class="full" :loading="loading">Log in</BaseButton>

    <p v-if="demo" class="demo-hint">
      <strong>Demo mode.</strong> Any email or username with an 8+ character password signs in as Alex Santos.
      Try <code>admin</code> for the administrator, or <code>locked</code> / <code>deactivated</code> to see blocked-account messages.
    </p>
    <ForgotPasswordModal v-if="forgotOpen" :initial-email="form.identity" @close="forgotOpen = false" />
  </form>
</template>
