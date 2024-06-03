<script setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>

<template>
  <section class="mb-10">
    <DashboardIndex />
  </section>
</template>
