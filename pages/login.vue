<script setup>
definePageMeta({
  middleware: "guest",
});

import { object, string } from "yup";
import { reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();
const localeRoute = useLocaleRoute();
const appToast = useAppToast();

const loading = ref(false);

const schema = object({
  email: string()
    .email(t("THIS_FIELD_MUST_BE_AN_EMAIL"))
    .required(t("THIS_FIELD_IS_REQUIRED")),
  password: string()
    .min(8, t("THIS_FIELD_MUST_BE_AT_LEAST_8_CHARACTERS"))
    .required(t("THIS_FIELD_IS_REQUIRED")),
});

const state = reactive({
  email: "admin@example.com",
  password: "password",
});

const onSubmit = async () => {
  if (schema.validateSync(state)) {
    try {
      loading.value = true;
      await authStore.login(
        state.email,
        state.password,
        t,
        localeRoute,
        appToast
      );
    } finally {
      loading.value = false;
    }
  }
};

const submitAsAdmin = () => {
  state.email = "admin@example.com";
  state.password = "password";

  onSubmit();
};

const submitAsUser = () => {
  state.email = "user@example.com";
  state.password = "password";

  onSubmit();
};

const submitAsCompany = () => {
  state.email = "company@example.com";
  state.password = "password";

  onSubmit();
};
</script>

<template>
  <div class="container max-w-md mx-auto my-10">
    <h1 class="mb-4 text-2xl font-bold">{{ $t("LOGIN") }}</h1>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup :label="$t('EMAIL')" name="email">
        <UInput
          v-model="state.email"
          icon="i-heroicons-envelope"
          :ui="{
            base: 'border border-black !ring-transparent focus:border-black dark:border-gray-400 dark:focus:border-gray-400',
          }"
        />
      </UFormGroup>

      <UFormGroup :label="$t('PASSWORD')" name="password">
        <UInput
          v-model="state.password"
          type="password"
          icon="i-heroicons-key"
          :ui="{
            base: 'border border-black !ring-transparent focus:border-black dark:border-gray-400 dark:focus:border-gray-400',
          }"
        />
      </UFormGroup>
      <div class="pt-4">
        <UButton type="submit" color="black" :loading="loading" block>
          {{ $t("LOGIN") }}
        </UButton>
      </div>
      <div class="">
        <ULink :to="localePath('/forgot-password')" color="black">
          {{ $t("FORGOT_PASSWORD") }}
        </ULink>
      </div>
    </UForm>

    <UDivider label="OR" orientation="vertical" type="dashed" class="py-4" />

    <div class="grid grid-cols-1 gap-4">
      <UAlert
        icon="i-heroicons-arrow-right-end-on-rectangle"
        class="cursor-pointer"
        color="blue"
        variant="solid"
        :title="$t('LOGIN_AS_ADMIN')"
        :description="$t('LOGIN_AS_ADMIN_DESC')"
        @click="submitAsAdmin"
      />
      <UAlert
        icon="i-heroicons-arrow-right-end-on-rectangle"
        class="cursor-pointer"
        color="teal"
        variant="solid"
        :title="$t('LOGIN_AS_COMPANY')"
        :description="$t('LOGIN_AS_COMPANY_DESC')"
        @click="submitAsCompany"
      />
      <UAlert
        icon="i-heroicons-arrow-right-end-on-rectangle"
        class="cursor-pointer"
        color="purple"
        variant="solid"
        :title="$t('LOGIN_AS_USER')"
        :description="$t('LOGIN_AS_USER_DESC')"
        @click="submitAsUser"
      />
    </div>
  </div>
</template>
