<script setup>
import { ref } from "vue"
import { forgotPasswordSchema } from "~/schemas/auth.js"
import { validate } from "~/utils/validation.js"
import { services } from "~~/services/index.js"

const props = defineProps({ initialEmail: { type: String, default: "" } })
const emit = defineEmits(["close"])

const demo = useDemoMode()
const email = ref(props.initialEmail.includes("@") ? props.initialEmail : "")
const error = ref("")
const sent = ref(false)
const loading = ref(false)

async function submit() {
  const result = validate(forgotPasswordSchema, { email: email.value })
  if (!result.success) { error.value = result.errors.email; return }
  error.value = ""
  loading.value = true
  try {
    await services.auth.forgotPassword(result.data.email)
    sent.value = true
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <BaseModal title="Reset your password" @close="emit('close')">
    <div v-if="sent" class="forgot-success">
      <span><AppIcon name="check" :size="28" /></span>
      <h3>Check your email</h3>
      <p>Password reset instructions were sent to {{ email }}.<template v-if="demo"> (Demo: no email is actually sent.)</template></p>
      <BaseButton variant="secondary" class="full" @click="emit('close')">Back to login</BaseButton>
    </div>
    <form v-else novalidate @submit.prevent="submit">
      <p>Enter your PALDO email and we’ll send password reset instructions.</p>
      <BaseField v-model="email" label="Email address" type="email" autocomplete="email" placeholder="you@email.com" :error="error" @update:model-value="error = ''" />
      <BaseButton type="submit" class="full" :loading="loading">Send reset link</BaseButton>
    </form>
  </BaseModal>
</template>
