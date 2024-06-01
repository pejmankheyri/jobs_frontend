// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  components: [{ path: "~/components", pathPrefix: false }],
});
