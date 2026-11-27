<script setup>
import { computed } from "vue"
import {
  ArrowLeftRight, ArrowRight, Bell, Check, CreditCard, Copy, Eye, EyeOff, History, Home,
  Menu, MoreHorizontal, Moon, Plus, Receipt, Search, Settings, Sun, Target, User, X,
} from "lucide-vue-next"

// Prototype icon names -> Lucide icons. Add new names here only.
const icons = {
  home: Home, transfer: ArrowLeftRight, bills: Receipt, history: History, goals: Target,
  settings: Settings, eye: Eye, eyeOff: EyeOff, moon: Moon, sun: Sun, bell: Bell,
  search: Search, arrow: ArrowRight, close: X, check: Check, plus: Plus, copy: Copy,
  user: User, card: CreditCard, more: MoreHorizontal, menu: Menu,
}

const props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 20 },
})
const component = computed(() => icons[props.name] ?? null)
</script>

<template>
  <component :is="component" v-if="component" :size="size" :stroke-width="1.8" aria-hidden="true" />
</template>
