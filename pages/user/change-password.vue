<script setup>
definePageMeta({
  middleware: "auth",
});
import { object, string } from "yup";
import { reactive, ref, isProxy, toRaw } from "vue";

import { useRouter } from "vue-router";
const { $toast } = useNuxtApp();
const authStore = useAuthStore();
const router = useRouter();
const { t } = useI18n();

const schema = object({
  oldPassword: string().required(t("THIS_FIELD_IS_REQUIRED")),
  newPassword: string()
    .min(8, t("THIS_FIELD_MUST_BE_AT_LEAST_8_CHARACTERS"))
    .required(t("THIS_FIELD_IS_REQUIRED")),
  confirmPassword: string().required(t("THIS_FIELD_IS_REQUIRED")),
});

const loading = ref(false);
const state = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const onSubmit = async () => {
  try {
    loading.value = true;

    await authStore.updatePassword(toRaw(state), $toast, t);

    state.oldPassword = "";
    state.newPassword = "";
    state.confirmPassword = "";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <div class="container mx-auto max-w-md my-10">
      <h1 class="text-2xl font-bold mb-4">{{ $t("CHANGE_PASSWORD") }}</h1>
      <UForm
        :state="state"
        :schema="schema"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup :label="$t('OLD_PASSWORD')" name="oldPassword">
          <UInput
            v-model="state.oldPassword"
            color="indigo"
            type="password"
            size="sm"
            icon="i-heroicons-lock-closed"
          />
        </UFormGroup>
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
            {{ $t("CHANGE_PASSWORD") }}
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
