import tailwindcss from "@tailwindcss/vite"

// Nuxt 4 config. Env vars (see .env.example) override runtimeConfig.public.*
// using the NUXT_PUBLIC_ prefix, e.g. NUXT_PUBLIC_USE_MOCKS=false.
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  // Banking dashboard behind a login: client-rendered SPA keeps mock
  // persistence (localStorage) and route guards simple.
  ssr: false,
  devtools: { enabled: false },
  modules: ["@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  // Use component file names as-is (PaldoLogo, BaseButton, ...) regardless of folder.
  components: [{ path: "~/components", pathPrefix: false }],
  vite: { plugins: [tailwindcss()] },
  runtimeConfig: {
    public: {
      apiBaseUrl: "", // NUXT_PUBLIC_API_BASE_URL
      useMocks: true, // NUXT_PUBLIC_USE_MOCKS
      appEnv: "development", // NUXT_PUBLIC_APP_ENV
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "PALDO | Bank with Ease, Build with Peace.",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
        { name: "description", content: "PALDO digital banking prototype. Demo mode: all transactions are simulated." },
        { name: "theme-color", content: "#d90429" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap",
        },
      ],
      // Apply the saved theme before first paint to avoid a light flash.
      script: [
        {
          innerHTML:
            "try{if(localStorage.getItem('paldo_theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          tagPosition: "head",
        },
      ],
    },
  },
})
