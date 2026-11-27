# PALDO Frontend (Nuxt 4) — Phase 1: Foundation

> **Demo / mock only.** This frontend uses simulated data. No real money moves.
> *Bank with Ease, Build with Peace.*

## Requirements
- Node.js **20.19+** (22 recommended, see `.nvmrc`)
- npm (or pnpm/yarn)

## Run locally
```bash
cp .env.example .env
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run preview    # serve the production build
```
No backend is needed while `NUXT_PUBLIC_USE_MOCKS=true`.

## Environment variables
| Variable | Default | Purpose |
|---|---|---|
| `NUXT_PUBLIC_USE_MOCKS` | `true` | `true` = mock services, `false` = real backend |
| `NUXT_PUBLIC_API_BASE_URL` | _(empty)_ | Backend base URL, used only when mocks are off |
| `NUXT_PUBLIC_APP_ENV` | `development` | Informational |

## Deploy to GitHub + Vercel
1. `git init && git add . && git commit -m "PALDO phase 1"`, then push to a GitHub repo.
2. In Vercel: **Add New → Project → import the repo**. Framework preset: **Nuxt** (auto-detected).
3. Add the env vars above in **Settings → Environment Variables** (`NUXT_PUBLIC_USE_MOCKS=true`).
4. Deploy. After the first deploy, open a deep link (e.g. `/transfer` once it exists) and refresh to confirm routing works.

## Structure (Phase 1)
```
app/
  assets/css/     tokens, base, brand, components, layout (ported from the prototype)
  components/     brand/ base/ feedback/
  layouts/        default, auth, blank (full shell arrives in Phase 2)
  pages/          index.vue = foundation preview (becomes Dashboard in Phase 3)
  plugins/        wires runtime config into services; restores preferences
  schemas/        Zod schemas (common field rules)
  stores/         preferences (theme/language/hide-balance), ui (splash/toasts), accounts
  utils/          money (integer centavos), format, validation
  composables/    useDemoMode
config/app.js     app constants + mock-only magic values
shared/           constants, ApiError, JSDoc models
services/         real API layer (http.js, *.service.js, adapters/)
mocks/            mock data (JSON), localStorage db, mock handlers
```

## How services work (the backend-swap pattern)
Each domain has **one interface, two implementations**:
`services/accounts.service.js` (real, `$fetch`) and `mocks/handlers/accounts.mock.js` (simulated).
`services/index.js` picks one based on `NUXT_PUBLIC_USE_MOCKS`. Stores call `services.accounts.list()`;
components never call APIs. Backend field-name differences are absorbed in `services/adapters/`.

**Money rule:** all amounts are **integer centavos** inside the frontend (`4825075` = ₱48,250.75).
Use `formatMoney()` to display and `toCentavos()` to parse typed input.

## Phase 1 verification checklist
Run after `npm install && npm run dev`:
- [ ] Splash plays (~5 s, tap to skip), then the preview page appears; it does not replay in the same tab session.
- [ ] Logo renders in all three variants (light, reversed, icon).
- [ ] Theme button switches light/dark (icon changes sun/moon), survives refresh with no flash.
- [ ] Buttons: hover, pressed, disabled, loading demo.
- [ ] Account field shows a Zod error on blur unless exactly 16 digits; password eye toggles.
- [ ] All 12 status badges render with an icon and text.
- [ ] Stepper Back/Next works; modal opens, traps Tab focus, closes with Esc.
- [ ] Success and error toasts appear and auto-dismiss.
- [ ] Mock accounts load (3 accounts, ₱48,250.75 savings); **Hide balances** masks every amount, and total available excludes the frozen account (₱60,730.75).
- [ ] **Reset demo data** reloads the seed accounts.
- [ ] "Demo mode: simulated transactions" badge is visible.
- [ ] `npm run build` completes with no errors.

## Not in Phase 1
Auth, app shell/navigation, dashboard, money flows, bills, goals, settings, admin, and the full API contract doc.
See the phase plan.
