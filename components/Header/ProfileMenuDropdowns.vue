<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const { t, localePath } = useI18n();
const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const authStore = useAuthStore();
const localeRoute = useLocaleRoute();
const appToast = useAppToast();

const dropdownItemsArray = computed(() => [
  [
    {
      label: "",
      slot: "account",
      disabled: true,
      isActive: true,
    },
  ],
  [
    {
      label: t("SETTINGS"),
      icon: "i-heroicons-cog-8-tooth",
      click: () => {
        const route = localeRoute({ name: "user-settings" });
        navigateTo(route.fullPath);
      },
      isActive: true,
    },
    {
      label: t("CHANGE_PASSWORD"),
      icon: "i-heroicons-key",
      click: () => {
        const route = localeRoute({ name: "user-change-password" });
        navigateTo(route.fullPath);
      },
      isActive: true,
    },
    {
      label: t("CHANGE_AVATAR"),
      icon: "i-heroicons-photo",
      click: () => {
        const route = localeRoute({ name: "user-change-avatar" });
        navigateTo(route.fullPath);
      },
      isActive: true,
    },
  ],
  [
    {
      label: t("APPLIED_JOBS"),
      icon: "i-heroicons-building-office",
      click: () => {
        const route = localeRoute({ name: "user-applied" });
        navigateTo(route.fullPath);
      },
      isActive: isUser.value,
    },

    {
      label: t("YOUR_CV"),
      icon: "i-heroicons-square-3-stack-3d",
      click: () => {
        const route = localeRoute({ name: "user-cv" });
        navigateTo(route.fullPath);
      },
      isActive: isUser.value,
    },
    {
      label: t("COMPANIES"),
      icon: "i-heroicons-building-office",
      click: () => {
        const route = localeRoute({ name: "company-list" });
        navigateTo(route.fullPath);
      },
      isActive: isCompany.value,
    },
  ],
  [
    {
      label: t("LOGOUT"),
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: async () => {
        await authStore.logout(t, localeRoute, appToast);
      },
      isActive: true,
    },
  ],
]);

const activeDropdownItems = computed(() => {
  return dropdownItemsArray.value.map((items) => {
    return items.filter((item) => {
      return item.isActive === true;
    });
  });
});

const isAuthenticated = computed(() => !!authStore.token);
const user = computed(() => authStore.user);

const isUser = computed(() => authStore.userRole === "user");
const isCompany = computed(() => authStore.userRole === "company");
const isAdmin = computed(() => authStore.userRole === "admin");

const userAvatar = computed(() => {
  return runtimeConfig.public.apiBaseUrl + user.value?.avatar;
});
</script>

<template>
  <UDropdown
    :items="activeDropdownItems"
    mode="hover"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-end' }"
  >
    <UAvatar :src="userAvatar" />

    <template #account="{ item }">
      <div class="text-left">
        <p>
          {{ $t("SIGNED_IN_AS") }} <b>{{ user.role }}</b>
        </p>

        <p class="font-medium text-gray-900 truncate dark:text-white">
          {{ item.label }}{{ user.name }}
        </p>
        <p class="font-medium text-gray-900 truncate dark:text-white">
          {{ item.label }}{{ user.email }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UIcon
        :name="item.icon"
        class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </template>
  </UDropdown>
</template>
