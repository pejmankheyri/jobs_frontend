<script setup>
// Link to Google Fonts
useHead({
  title: "Jobs Board",
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    { charset: "utf-8" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1,  maximum-scale=1",
    },
    { hid: "description", name: "description", content: "" },
    { name: "format-detection", content: "telephone=no" },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&display=swap",
    },
  ],
});
</script>

<template>
  <div class="container mx-auto max-w-6xl">
    <AppHeader />
    <main class="my-10">
      <slot />
    </main>
  </div>
</template>

<style>
/* Set the background color for the entire site */
body {
  @apply dark:bg-gray-900 bg-white;
}
</style>
