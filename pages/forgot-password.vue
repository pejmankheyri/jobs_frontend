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
const { locale } = useI18n();

const state = reactive({
  email: "",
});

const loading = ref(false);

const onSubmit = async () => {
  try {
    loading.value = true;

    await authStore.forgotPassword(state, t, locale.value, appToast);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container max-w-md mx-auto my-10">
    <h1 class="mb-4 text-2xl font-bold">{{ $t("FORGOT_PASSWORD") }}</h1>

    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup :label="$t('EMAIL')" name="email">
        <UInput
          v-model="state.email"
          color="indigo"
          type="email"
          size="sm"
          icon="i-heroicons-envelope"
        />
      </UFormGroup>
      <div class="pt-4">
        <UButton type="submit" color="indigo" :loading="loading" block>
          {{ $t("SEND_RESET_LINK") }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>
