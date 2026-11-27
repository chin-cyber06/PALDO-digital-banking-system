<script setup>
// FOUNDATION PREVIEW (Phase 1) at /design: living style guide for QA and the backend team.
// Exercises every base component plus the service -> store -> UI chain.
import { onMounted, ref } from "vue"
import { TAGLINE, APP_VERSION } from "~~/config/app.js"
import { resetDemoData } from "~~/mocks/db.js"
import { accountNumberSchema } from "~/schemas/common.js"
import { validate } from "~/utils/validation.js"
import { maskAccountNumber } from "~/utils/format.js"
import { useAccountsStore } from "~/stores/accounts"
import { usePreferencesStore } from "~/stores/preferences"
import { useUiStore } from "~/stores/ui"

const prefs = usePreferencesStore()
const ui = useUiStore()
const accounts = useAccountsStore()

const statuses = ["completed", "pending", "failed", "reversed", "active", "inactive", "frozen", "closed", "revoked", "cancelled", "locked", "deactivated"]

const step = ref(0)
const steps = ["Details", "Review", "Processing", "Receipt"]

const accountNumber = ref("")
const accountError = ref("")
const password = ref("")
function checkAccountNumber() {
  const result = validate(accountNumberSchema, accountNumber.value)
  accountError.value = result.success ? "" : result.errors._form
}

const loadingDemo = ref(false)
function runLoadingDemo() {
  loadingDemo.value = true
  setTimeout(() => { loadingDemo.value = false; ui.notify("Done: loading state finished") }, 1500)
}

const modalOpen = ref(false)
const toggleA = ref(true)
const toggleB = ref(false)

async function resetDemo() {
  resetDemoData()
  await accounts.fetchAll()
  ui.notify("Demo data reset")
}
onMounted(() => accounts.fetchAll())
</script>

<template>
  <div class="page">
    <header class="page-heading">
      <div>
        <p>DESIGN SYSTEM · /design</p>
        <h1>PALDO design system preview</h1>
        <span>{{ TAGLINE }} · v{{ APP_VERSION }} · Component reference page.</span>
      </div>
      <button class="icon-btn" :aria-label="prefs.isDark ? 'Switch to light mode' : 'Switch to dark mode'" @click="prefs.toggleTheme()">
        <AppIcon :name="prefs.isDark ? 'sun' : 'moon'" />
      </button>
    </header>

    <SectionTitle title="Logo" />
    <div class="grid gap-4 md:grid-cols-3">
      <BaseCard class="p-6 flex items-center justify-center"><PaldoLogo /></BaseCard>
      <BaseCard class="p-6 flex items-center justify-center" style="background: var(--gradient); border: 0"><PaldoLogo white /></BaseCard>
      <BaseCard class="p-6 flex items-center justify-center"><PaldoLogo icon /></BaseCard>
    </div>

    <SectionTitle title="Buttons" />
    <BaseCard class="p-6 flex flex-wrap gap-3 items-center">
      <BaseButton>Primary</BaseButton>
      <BaseButton variant="secondary">Secondary</BaseButton>
      <BaseButton variant="ghost">Ghost</BaseButton>
      <BaseButton variant="danger">Danger</BaseButton>
      <BaseButton disabled>Disabled</BaseButton>
      <BaseButton :loading="loadingDemo" @click="runLoadingDemo">Loading demo</BaseButton>
    </BaseCard>

    <SectionTitle title="Fields (validated with Zod)" />
    <BaseCard class="p-6">
      <div class="form-row">
        <BaseField v-model="accountNumber" label="16-digit PALDO account number" placeholder="Enter account number" inputmode="numeric" :max-length="16" :error="accountError" @blur="checkAccountNumber" />
        <BaseField v-model="password" label="Password" type="password" reveal placeholder="Enter your password" />
      </div>
    </BaseCard>

    <SectionTitle title="Status badges" />
    <BaseCard class="p-6 flex flex-wrap gap-2"><StatusBadge v-for="s in statuses" :key="s" :status="s" /></BaseCard>

    <SectionTitle title="Stepper" />
    <BaseCard class="p-6">
      <FlowStepper :steps="steps" :current="step" />
      <div class="flow-actions" style="margin-top: 38px">
        <BaseButton variant="secondary" :disabled="step === 0" @click="step--">Back</BaseButton>
        <BaseButton :disabled="step === steps.length - 1" @click="step++">Next</BaseButton>
      </div>
    </BaseCard>

    <SectionTitle title="Toggles, modal and toasts" />
    <BaseCard class="p-6">
      <BaseToggle v-model="toggleA" label="Transaction alerts" description="Stay updated on activity that matters." />
      <BaseToggle v-model="toggleB" label="Promotions & offers" description="Off by default." />
      <div class="flex flex-wrap gap-3 mt-5">
        <BaseButton variant="secondary" @click="modalOpen = true">Open modal</BaseButton>
        <BaseButton variant="secondary" @click="ui.notify('Saved successfully')">Success toast</BaseButton>
        <BaseButton variant="secondary" @click="ui.notifyError('Something went wrong')">Error toast</BaseButton>
      </div>
    </BaseCard>

    <SectionTitle title="Service → store → UI check (mock accounts)">
      <template #action>
        <div class="flex gap-2">
          <button class="text-btn" @click="prefs.toggleBalanceHidden()"><AppIcon :name="prefs.balanceHidden ? 'eyeOff' : 'eye'" :size="16" />{{ prefs.balanceHidden ? "Show" : "Hide" }} balances</button>
          <button class="text-btn" @click="resetDemo">Reset demo data</button>
        </div>
      </template>
    </SectionTitle>
    <BaseCard class="p-6">
      <div v-if="accounts.isLoading"><div v-for="n in 3" :key="n" class="skeleton" /></div>
      <div v-else-if="accounts.error" class="error-banner">× <span>{{ accounts.error }}</span></div>
      <p v-else-if="accounts.isEmpty">No accounts yet.</p>
      <template v-else>
        <div v-for="account in accounts.items" :key="account.id" class="flex items-center justify-between gap-3 py-3" style="border-bottom: 1px solid var(--border)">
          <div>
            <strong style="text-transform: capitalize">{{ account.accountType }}</strong>
            <div style="font-size: 11px; color: var(--muted)">{{ maskAccountNumber(account.accountNumber) }}</div>
          </div>
          <StatusBadge :status="account.status" />
          <strong><BalanceValue :value="account.balance" /></strong>
        </div>
        <div class="flex justify-between pt-4"><span style="color: var(--muted)">Total available (active accounts)</span><strong><BalanceValue :value="accounts.totalAvailable" /></strong></div>
      </template>
    </BaseCard>

    <BaseModal v-if="modalOpen" title="Confirm action" @close="modalOpen = false">
      <p>This is a mock confirmation. Press Esc or Close to dismiss. Focus stays inside this dialog.</p>
      <BaseField v-model="password" label="Password" type="password" reveal />
      <div class="modal-actions">
        <BaseButton variant="secondary" @click="modalOpen = false">Cancel</BaseButton>
        <BaseButton @click="modalOpen = false; ui.notify('Confirmed (mock)')">Confirm</BaseButton>
      </div>
    </BaseModal>
  </div>
</template>
