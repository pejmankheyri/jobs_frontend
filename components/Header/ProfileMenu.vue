<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const { isMobile, isDesktop } = useDevice();

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
        <UButton color="gray" variant="solid">
          <UIcon
            name="i-heroicons-arrow-right-end-on-rectangle"
            class="px-2 py-3"
          />
          <span v-if="$device.isDesktop">
            {{ $t("LOGIN") }}
          </span>
        </UButton>
      </nuxt-link>
      <nuxt-link :to="localePath('/register')">
        <UButton color="gray" variant="solid">
          <UIcon name="i-heroicons-user-plus" class="px-2 py-3" />
          <span v-if="$device.isDesktop">
            {{ $t("REGISTER") }}
          </span>
        </UButton>
      </nuxt-link>
    </div>
    <ProfileMenuDropdowns v-else />
  </div>
</template>
