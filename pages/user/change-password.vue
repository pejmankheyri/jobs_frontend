<script setup>
definePageMeta({
  middleware: "auth",
});
import { object, string } from "yup";
import { reactive, ref, isProxy, toRaw } from "vue";

import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();
const { t } = useI18n();
const appToast = useAppToast();

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

    await authStore.updatePassword(toRaw(state), t, appToast);

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
    <div class="container max-w-md mx-auto my-10">
      <h1 class="mb-4 text-2xl font-bold">{{ $t("CHANGE_PASSWORD") }}</h1>
      <UForm
        :state="state"
        :schema="schema"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup :label="$t('OLD_PASSWORD')" name="oldPassword">
          <UInput
            v-model="state.oldPassword"
            type="password"
            size="sm"
            icon="i-heroicons-lock-closed"
            :ui="{
              base: 'border border-black !ring-transparent focus:border-black dark:border-gray-400 dark:focus:border-gray-400',
            }"
          />
        </UFormGroup>
        <UFormGroup :label="$t('NEW_PASSWORD')" name="newPassword">
          <UInput
            v-model="state.newPassword"
            type="password"
            size="sm"
            icon="i-heroicons-lock-closed"
            :ui="{
              base: 'border border-black !ring-transparent focus:border-black dark:border-gray-400 dark:focus:border-gray-400',
            }"
          />
        </UFormGroup>
        <UFormGroup
          :label="$t('NEW_PASSWORD_CONFIRMATION')"
          name="confirmPassword"
        >
          <UInput
            v-model="state.confirmPassword"
            type="password"
            size="sm"
            icon="i-heroicons-lock-closed"
            :ui="{
              base: 'border border-black !ring-transparent focus:border-black dark:border-gray-400 dark:focus:border-gray-400',
            }"
          />
        </UFormGroup>
        <div class="pt-4">
          <UButton type="submit" color="black" :loading="loading" block>
            {{ $t("CHANGE_PASSWORD") }}
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
