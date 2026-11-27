<script setup>
// Phase 2 home: greeting + balance summary. The full Dashboard arrives in Phase 3.
import { onMounted } from "vue"
import { useAccountsStore } from "~/stores/accounts"
import { usePreferencesStore } from "~/stores/preferences"
import { useSessionStore } from "~/stores/session"
import { getGreeting } from "~/utils/format.js"

const session = useSessionStore()
const accounts = useAccountsStore()
const prefs = usePreferencesStore()
onMounted(() => accounts.fetchAll())

const today = new Date().toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric" })
</script>

<template>
  <div class="page">
    <header class="page-heading">
      <div>
        <p>{{ today }}</p>
        <h1>{{ getGreeting() }}, {{ session.firstName }}</h1>
        <span>Here’s what’s happening with your money.</span>
      </div>
    </header>

    <BaseCard class="placeholder-card" style="margin-bottom: 18px">
      <span aria-hidden="true">₱</span>
      <div>
        <small>TOTAL AVAILABLE BALANCE</small>
        <h2 v-if="accounts.isLoading">Loading…</h2>
        <h2 v-else><BalanceValue :value="accounts.totalAvailable" /></h2>
        <p>
          <button class="text-btn" style="display: inline-flex" @click="prefs.toggleBalanceHidden()">
            <AppIcon :name="prefs.balanceHidden ? 'eyeOff' : 'eye'" :size="16" /> {{ prefs.balanceHidden ? "Show" : "Hide" }} balance
          </button>
        </p>
      </div>
    </BaseCard>

    <BaseCard class="placeholder-card">
      <span aria-hidden="true">↗</span>
      <div>
        <small>COMING IN PHASE 3</small>
        <h2>Full dashboard is on its way</h2>
        <p>Spending overview, quick actions, recent transactions, savings goals and accounts arrive in Phase 3.</p>
      </div>
    </BaseCard>
  </div>
</template>
