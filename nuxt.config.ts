// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  components: [{ path: "~/components", pathPrefix: false }],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      apiVersion: process.env.API_VERSION,
    },
    // axios: {
    //   baseURL: process.env.API_BASE_URL,
    // },
  },
});
