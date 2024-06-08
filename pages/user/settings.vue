<script setup>
definePageMeta({
  middleware: "auth",
});
import { object, string } from "yup";

const authStore = useAuthStore();
const { $toast } = useNuxtApp();
const { t } = useI18n();

const user = computed(() => JSON.parse(localStorage.getItem("user")));

const loading = ref(false);

const roleOptions = ["admin", "company", "user"];

const schema = object({
  name: string().required(t("THIS_FIELD_IS_REQUIRED")),
  phone: string().required(t("THIS_FIELD_IS_REQUIRED")),
});

const state = reactive({
  id: user?.value?.id,
  name: user?.value?.name,
  email: user?.value?.email,
  phone: user?.value?.phone,
  role: user?.value?.role,
});

const onSubmit = async () => {
  if (schema.validateSync(state)) {
    try {
      loading.value = true;
      await authStore.updateProfile(state.name, state.phone, $toast, t);
    } finally {
      loading.value = false;
    }
  }
};
</script>

<template>
  <div class="container mx-auto max-w-md my-10">
    <h1 class="text-2xl font-bold mb-4">{{ $t("SETTINGS") }}</h1>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup :label="$t('NAME')" name="name">
        <UInput v-model="state.name" color="indigo" icon="i-heroicons-user" />
      </UFormGroup>

      <UFormGroup :label="$t('EMAIL')" name="email">
        <UInput v-model="state.email" icon="i-heroicons-envelope" disabled />
      </UFormGroup>

      <UFormGroup :label="$t('PHONE')" name="phone">
        <UInput v-model="state.phone" color="indigo" icon="i-heroicons-phone" />
      </UFormGroup>

      <UFormGroup :label="$t('USER_ROLE')" name="role">
        <USelect
          icon="i-heroicons-users"
          :options="roleOptions"
          color="indigo"
          class="w-full"
          v-model="state.role"
          disabled
        />
      </UFormGroup>

      <div class="pt-4">
        <UButton type="submit" color="indigo" :loading="loading" block>
          {{ $t("SAVE_SETTINGS") }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>
