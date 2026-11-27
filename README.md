# PALDO Frontend (Nuxt 4) — Phase 2: Auth & App Shell

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
4. Deploy. After the first deploy, open a deep link such as `/bills`, refresh, and confirm you land on the login screen (logged out) or the page (logged in).

## Structure (through Phase 2)
```
app/
  assets/css/     tokens, base, brand, components, layout, shell, auth, states
  components/     brand/ base/ feedback/ shell/ auth/
  layouts/        default (app shell), auth (split brand panel), blank
  middleware/     auth.global.js (login guard), admin.js (403 for non-admins)
  pages/          login, register, index (Home), design (style guide) + placeholder routes
  plugins/        00 services wiring, 01 preferences/splash, 02 network status
  schemas/        common.js, auth.js (Zod)
  stores/         session, notifications, accounts, preferences, ui
  composables/    useFocusTrap, useLogout, useDemoMode
  error.vue       403 / 404 / generic error screen
config/ shared/ services/ mocks/   (framework-free; see below)
```

## Routes
| Route | Access | Status |
|---|---|---|
| `/login`, `/register` | public | **done** |
| `/` Home | signed in | greeting + balance (full Dashboard in Phase 3) |
| `/accounts`, `/history` | signed in | Phase 3 |
| `/deposit`, `/withdraw`, `/transfer`, `/beneficiaries` | signed in | Phase 4 |
| `/bills`, `/goals` | signed in | Phase 5 |
| `/settings`, `/admin`, `/admin/billers`, `/admin/categories` | signed in / admin only | Phase 6 |
| `/design` | signed in | component reference |

Unknown routes show the 404 screen. Admin routes show the 403 screen to customers.
Append `?state=loading|empty|error|success|disabled` to any route to preview module states.

## Demo credentials (mock mode only)
- Any email/username + 8+ character password -> signs in as **Alex Santos** (customer)
- `admin` -> **PALDO Admin**
- `locked` / `deactivated` -> blocked-account messages
- Registration taken values: `alex@paldo.app`, usernames `alex` and `admin`
- Each mock user has separate data (namespaced in localStorage), so registering never overwrites Alex.
- **Remember me** keeps the session in localStorage; otherwise it lasts for the browser tab.

## How services work (the backend-swap pattern)
Each domain has **one interface, two implementations**, e.g. `services/auth.service.js` (real, `$fetch`)
and `mocks/handlers/auth.mock.js` (simulated). `services/index.js` picks one from `NUXT_PUBLIC_USE_MOCKS`.
Stores call `services.auth.login(...)`; components never call APIs. Backend field-name differences are
absorbed in `services/adapters/`. Errors are always `ApiError {status, code, message, fields}`.
A 401 on a protected real call clears the session and returns to `/login`.

**Money rule:** all amounts are **integer centavos** (`4825075` = ₱48,250.75). Use `formatMoney()` / `toCentavos()`.

**Security note:** the mock keeps the token in web storage for convenience. With a real backend prefer an
httpOnly refresh cookie and an in-memory access token.

## Phase 2 verification checklist
After `npm install && npm run dev`:
- [ ] Opening `/` while logged out redirects to `/login` (deep links keep `?redirect=`).
- [ ] Login: empty/invalid input shows field errors; `locked` and `deactivated` show a banner with **Contact support**; valid login lands on Home with a welcome toast.
- [ ] **Remember me** ON survives closing and reopening the tab; OFF does not.
- [ ] Forgot password: invalid email errors; valid email shows "Check your email".
- [ ] Register: all rules reported at once (weak password, mismatch, under 18, terms); `alex@paldo.app` and username `alex` are rejected; success opens Home with a **zero-balance** savings account.
- [ ] Desktop (>1100 px): sidebar, collapse toggle, top bar, avatar menu (Esc / outside click closes).
- [ ] Tablet/mobile: sidebar hidden, floating tab bar with raised Transfer; notifications full-screen on mobile.
- [ ] Notifications: unread dot, click marks read and navigates, **Mark all as read**, Esc closes, focus is trapped.
- [ ] DevTools -> Network -> Offline: banner appears, Transfer/Bills/Savings nav is disabled, notifications show "unavailable"; going online + Retry recovers.
- [ ] Logging in as `admin` shows **Admin Dashboard** in the sidebar; as Alex, visiting `/admin` shows 403.
- [ ] `/nope` shows 404 with a working button.
- [ ] Theme toggle works on login and in the app (sun/moon icon, persists on refresh).
- [ ] Log out (avatar menu -> confirm) clears data, returns to `/login`, and `/` is protected again.
- [ ] `npm run build` completes with no errors.

## Not yet built
Dashboard, accounts, history (Phase 3); money movement (4); bills and goals (5); settings and admin (6);
full README/API contract and QA pass (7).
