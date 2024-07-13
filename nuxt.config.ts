// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@nuxtjs/device",
  ],
  components: [{ path: "~/components", pathPrefix: false }],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      apiVersion: process.env.API_VERSION,
      gtagId: process.env.GTAG_ID,
    },
  },
  colorMode: {
    classSuffix: "",
  },
  nitro: {
    prerender: {
      concurrency: 250,
      interval: 100,
    },
  },
  css: ["~/assets/css/main.scss"],
  plugins: [],
  i18n: {
    vueI18n: "./i18n.config.ts",
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
      { code: "fr", iso: "fr-FR", name: "French", file: "fr.json" },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "locales/",
  },
});
