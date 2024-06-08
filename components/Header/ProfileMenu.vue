<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const isAuthenticated = computed(() => !!authStore.token);
</script>

<template>
  <div class="place-items-center items-center flex gap-3">
    <ClientOnly>
      <ColorModeSelector />
    </ClientOnly>
    <LanguageSwitcher />

    <div v-if="!isAuthenticated" class="flex gap-2">
      <nuxt-link :to="localePath('/login')">
        <UButton color="gray" variant="solid">{{ $t("LOGIN") }}</UButton>
      </nuxt-link>
      <nuxt-link :to="localePath('/register')">
        <UButton color="gray" variant="solid">{{ $t("REGISTER") }}</UButton>
      </nuxt-link>
    </div>
    <ProfileMenuDropdowns v-else />
  </div>
</template>
