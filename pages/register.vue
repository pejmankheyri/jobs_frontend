<script setup>
definePageMeta({
  middleware: "guest",
});

import { object, string } from "yup";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const { $toast } = useNuxtApp();
const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();
const localeRoute = useLocaleRoute();

const loading = ref(false);

const schema = object({
  name: string().required(t("THIS_FIELD_IS_REQUIRED")),
  email: string()
    .email("THIS_FIELD_MUST_BE_AN_EMAIL")
    .required(t("THIS_FIELD_IS_REQUIRED")),
  phone: string().required(t("THIS_FIELD_IS_REQUIRED")),
  password: string()
    .min(8, t("THIS_FIELD_MUST_BE_AT_LEAST_8_CHARACTERS"))
    .required(t("THIS_FIELD_IS_REQUIRED")),
  password_confirmation: string().required(t("THIS_FIELD_IS_REQUIRED")),
});

const state = reactive({
  name: undefined,
  email: undefined,
  phone: undefined,
  password: undefined,
  password_confirmation: undefined,
  role: undefined,
});

const roleOptions = ["Company", "User"];

const onSubmit = async () => {
  if (schema.validateSync(state)) {
    try {
      loading.value = true;

      await authStore.register(
        state.name,
        state.email,
        state.phone,
        state.password,
        state.password_confirmation,
        state.role,
        router,
        $toast,
        t,
        localeRoute
      );
    } finally {
      loading.value = false;
    }
  }
};
</script>

<template>
  <div class="container max-w-md mx-auto my-10">
    <h1 class="mb-4 text-2xl font-bold">{{ $t("REGISTER") }}</h1>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup :label="$t('NAME')" name="name">
        <UInput v-model="state.name" color="indigo" icon="i-heroicons-user" />
      </UFormGroup>

      <UFormGroup :label="$t('EMAIL')" name="email">
        <UInput v-model="state.email" icon="i-heroicons-envelope" />
      </UFormGroup>

      <UFormGroup :label="$t('PHONE')" name="phone">
        <UInput v-model="state.phone" icon="i-heroicons-phone" />
      </UFormGroup>

      <UFormGroup :label="$t('PASSWORD')" name="password">
        <UInput
          v-model="state.password"
          type="password"
          icon="i-heroicons-key"
          color="indigo"
        />
      </UFormGroup>
      <UFormGroup
        :label="$t('PASSWORD_CONFIRMATION')"
        name="password_confirmation"
      >
        <UInput
          v-model="state.password_confirmation"
          type="password"
          icon="i-heroicons-key"
          color="indigo"
        />
      </UFormGroup>

      <UFormGroup :label="$t('USER_ROLE')" name="role">
        <USelect
          icon="i-heroicons-users"
          :options="roleOptions"
          color="indigo"
          class="w-full"
          v-model="state.role"
        />
      </UFormGroup>
      <div class="pt-4">
        <UButton type="submit" color="indigo" :loading="loading" block>
          {{ $t("REGISTER") }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>
