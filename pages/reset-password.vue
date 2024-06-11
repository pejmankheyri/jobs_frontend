<script setup>
definePageMeta({
  middleware: "guest",
});

import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useAppToast } from "@/composables/useAppToast";
import { useAuthStore } from "@/stores/auth";

const { t } = useI18n();
const appToast = useAppToast();
const authStore = useAuthStore();
const route = useRoute();
const localeRoute = useLocaleRoute();

const state = reactive({
  newPassword: "",
  confirmPassword: "",
});

const loading = ref(false);

const onSubmit = async () => {
  try {
    loading.value = true;

    const vars = {
      password: state.newPassword,
      confirmPassword: state.confirmPassword,
      email: route.query.email,
      token: route.query.token,
    };

    await authStore.resetPassword(vars, t, localeRoute, appToast);

    state.newPassword = "";
    state.confirmPassword = "";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container max-w-md mx-auto my-10">
    <h1 class="mb-4 text-2xl font-bold">{{ $t("RESET_PASSWORD") }}</h1>

    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup :label="$t('NEW_PASSWORD')" name="newPassword">
        <UInput
          v-model="state.newPassword"
          color="indigo"
          type="password"
          size="sm"
          icon="i-heroicons-lock-closed"
        />
      </UFormGroup>
      <UFormGroup
        :label="$t('NEW_PASSWORD_CONFIRMATION')"
        name="confirmPassword"
      >
        <UInput
          v-model="state.confirmPassword"
          color="indigo"
          type="password"
          size="sm"
          icon="i-heroicons-lock-closed"
        />
      </UFormGroup>
      <div class="pt-4">
        <UButton type="submit" color="indigo" :loading="loading" block>
          {{ $t("RESET_PASSWORD") }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>
