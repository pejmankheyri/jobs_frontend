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

const schema = object({
  oldPassword: string().required("Required"),
  newPassword: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
  confirmPassword: string().required("Required"),
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

    await authStore.updatePassword(toRaw(state), $toast);

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
      <h1 class="text-2xl font-bold mb-4">Change Password</h1>
      <UForm
        :state="state"
        :schema="schema"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Old Password" name="oldPassword">
          <UInput
            v-model="state.oldPassword"
            color="indigo"
            type="password"
            size="sm"
            icon="i-heroicons-lock-closed"
          />
        </UFormGroup>
        <UFormGroup label="New Password" name="newPassword">
          <UInput
            v-model="state.newPassword"
            color="indigo"
            type="password"
            size="sm"
            icon="i-heroicons-lock-closed"
          />
        </UFormGroup>
        <UFormGroup label="Confirm Password" name="confirmPassword">
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
            Change Password
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>
