<script setup>
definePageMeta({
  middleware: "guest",
});

import { object, string } from "yup";
import { reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const { $toast } = useNuxtApp();

const router = useRouter();

const authStore = useAuthStore();

const loading = ref(false);

const schema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

const state = reactive({
  email: "admin@example.com",
  password: "password",
});

const onSubmit = async () => {
  if (schema.validateSync(state)) {
    try {
      loading.value = true;
      await authStore.login(state.email, state.password, router, $toast);
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
  <div class="container mx-auto max-w-md my-10">
    <h1 class="text-2xl font-bold mb-4">Login</h1>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput
          v-model="state.email"
          icon="i-heroicons-envelope"
          color="indigo"
        />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput
          v-model="state.password"
          type="password"
          icon="i-heroicons-key"
          color="indigo"
        />
      </UFormGroup>
      <div class="pt-4">
        <UButton type="submit" color="indigo" :loading="loading" block>
          Login
        </UButton>
      </div>
    </UForm>

    <div class="grid grid-cols-3 gap-4 mt-8">
      <UButton
        label="Login As Admin"
        size="lg"
        class="truncate text-center"
        color="red"
        @click="submitAsAdmin"
      >
      </UButton>
      <UButton label="Login As User" color="blue" @click="submitAsUser">
      </UButton>
      <UButton
        label="Login As Company"
        class="truncate"
        color="green"
        @click="submitAsCompany"
      >
      </UButton>
    </div>
  </div>
</template>
