<script setup>
definePageMeta({
  layout: "error",
});
</script>

<template>
  <div class="container text-center grid h-screen place-items-center">
    <div class="flex flex-col">
      <h1>Unauthorized</h1>
      <p>You are not authorized to view this page.</p>
      <div>
        back to <nuxt-link class="text-indigo-400" to="/">Home</nuxt-link>
      </div>
    </div>
  </div>
</template>
