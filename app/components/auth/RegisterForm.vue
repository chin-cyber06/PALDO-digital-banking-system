<script setup>
import { reactive, ref } from "vue"
import { validateRegistration } from "~/schemas/auth.js"
import { useSessionStore } from "~/stores/session"
import { useUiStore } from "~/stores/ui"

const session = useSessionStore()
const ui = useUiStore()
const demo = useDemoMode()

const form = reactive({ fullName: "", email: "", username: "", phone: "", dateOfBirth: "", address: "", password: "", confirm: "", terms: false })
const fieldErrors = ref({})
const error = ref("")
const loading = ref(false)
const termsOpen = ref(false)

async function submit() {
  error.value = ""
  const result = validateRegistration({ ...form, address: form.address || undefined })
  fieldErrors.value = result.errors
  if (!result.success) {
    error.value = "Please review the highlighted fields."
    return
  }
  loading.value = true
  try {
    const { confirm, terms, ...payload } = result.data
    await session.register(payload)
    ui.notify(`Welcome to PALDO, ${session.firstName}! Your account is ready.`)
    await navigateTo("/")
  } catch (e) {
    fieldErrors.value = e.fields ?? {}
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form novalidate @submit.prevent="submit">
    <div v-if="error" class="error-banner" role="alert">× <span>{{ error }}</span></div>
    <BaseField v-model="form.fullName" label="Full name" autocomplete="name" :error="fieldErrors.fullName" />
    <div class="form-row">
      <BaseField v-model="form.email" label="Email" type="email" placeholder="you@email.com" autocomplete="email" :error="fieldErrors.email" />
      <BaseField v-model="form.username" label="Username" autocomplete="username" :error="fieldErrors.username" />
    </div>
    <BaseField v-model="form.phone" label="Phone number" type="tel" inputmode="tel" placeholder="+63 917 000 0000" autocomplete="tel" :error="fieldErrors.phone" />
    <div class="form-row">
      <BaseField v-model="form.dateOfBirth" label="Date of birth" type="date" autocomplete="bday" :error="fieldErrors.dateOfBirth" />
      <BaseField v-model="form.address" label="Address (optional)" placeholder="City, Province" autocomplete="street-address" :error="fieldErrors.address" />
    </div>
    <BaseField v-model="form.password" label="Password" type="password" reveal placeholder="Enter your password" autocomplete="new-password" :error="fieldErrors.password" />
    <BaseField v-model="form.confirm" label="Confirm password" type="password" reveal placeholder="Repeat your password" autocomplete="new-password" :error="fieldErrors.confirm" />
    <PasswordStrength :password="form.password" />
    <div class="form-meta">
      <label><input v-model="form.terms" type="checkbox" /> <span>I agree to the <button type="button" class="inline-link" @click.prevent="termsOpen = true">terms</button></span></label>
    </div>
    <p v-if="fieldErrors.terms" class="field-error terms-error" role="alert">{{ fieldErrors.terms }}</p>
    <BaseButton type="submit" class="full" :loading="loading">Create account</BaseButton>

    <p v-if="demo" class="demo-hint"><strong>Demo mode.</strong> Your account is created only in this browser. Taken examples: <code>alex@paldo.app</code>, usernames <code>alex</code> and <code>admin</code>.</p>

    <BaseModal v-if="termsOpen" title="PALDO terms (demo)" @close="termsOpen = false">
      <p>This is a prototype. Accounts, balances and transactions are simulated in your browser and are not real financial services. Do not enter real banking credentials.</p>
      <BaseButton class="full" @click="termsOpen = false">Got it</BaseButton>
    </BaseModal>
  </form>
</template>
