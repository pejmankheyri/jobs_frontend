<script setup>
import { useAuthStore } from "@/stores/auth";

const runtimeConfig = useRuntimeConfig();

// import router
const router = useRouter();

const authStore = useAuthStore();

const items = [
  [
    {
      label: "",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      click: () => {
        goToSettings();
      },
    },
  ],
  [
    {
      label: "Applied jobs",
      icon: "i-heroicons-building-office",
      click: () => {
        goToAppliedJobs();
      },
    },
    {
      label: "Change Password",
      icon: "i-heroicons-key",
      click: () => {
        goToChangePassword();
      },
    },
    {
      label: "Change Avatar",
      icon: "i-heroicons-photo",
      click: () => {
        goToChangeAvatar();
      },
    },
    {
      label: "Your CV",
      icon: "i-heroicons-square-3-stack-3d",
      click: () => {
        goToCV();
      },
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        logout();
      },
    },
  ],
];

// Computed property to check if user is authenticated
const isAuthenticated = computed(() => !!authStore.token);
const user = computed(() => JSON.parse(localStorage.getItem("user")));

// Computed property to get user avatar with env variable
const userAvatar = computed(() => {
  return runtimeConfig.public.apiBaseUrl + user.value.avatar;
});

const { $toast } = useNuxtApp();

const logout = async () => {
  await authStore.logout($toast);
};

const goToAppliedJobs = () => {
  router.push("/user/applied");
};

const goToSettings = () => {
  router.push("/user/settings");
};

const goToChangePassword = () => {
  router.push("/user/change-password");
};

const goToChangeAvatar = () => {
  router.push("/user/change-avatar");
};

const goToCV = () => {
  router.push("/user/cv");
};
</script>

<template>
  <div class="place-items-center items-center flex">
    <div v-if="!isAuthenticated" class="flex gap-2">
      <nuxt-link to="/login">
        <UButton color="gray" variant="solid">Login</UButton>
      </nuxt-link>
      <nuxt-link to="/register">
        <UButton color="gray" variant="solid">Register</UButton>
      </nuxt-link>
    </div>
    <UDropdown
      v-else
      :items="items"
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
  </div>
</template>
