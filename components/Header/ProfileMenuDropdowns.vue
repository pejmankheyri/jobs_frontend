<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const authStore = useAuthStore();

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
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      click: () => {
        router.push("/user/settings");
      },
      isActive: true,
    },
    {
      label: "Change Password",
      icon: "i-heroicons-key",
      click: () => {
        router.push("/user/change-password");
      },
      isActive: true,
    },
    {
      label: "Change Avatar",
      icon: "i-heroicons-photo",
      click: () => {
        router.push("/user/change-avatar");
      },
      isActive: true,
    },
  ],
  [
    {
      label: "Applied jobs",
      icon: "i-heroicons-building-office",
      click: () => {
        router.push("/user/applied");
      },
      isActive: isUser.value,
    },

    {
      label: "Your CV",
      icon: "i-heroicons-square-3-stack-3d",
      click: () => {
        router.push("/user/cv");
      },
      isActive: isUser.value,
    },
    {
      label: "Companies",
      icon: "i-heroicons-building-office",
      click: () => {
        router.push("/company/list");
      },
      isActive: isCompany.value,
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: async () => {
        await authStore.logout($toast);
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

const { $toast } = useNuxtApp();
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
          Signed in as <b>{{ user.role }}</b>
        </p>

        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}{{ user.name }}
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}{{ user.email }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UIcon
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </template>
  </UDropdown>
</template>
