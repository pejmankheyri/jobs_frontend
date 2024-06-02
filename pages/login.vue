<template>
  <div class="container mx-auto max-w-md">
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
        <UButton type="submit" color="indigo" block> Login </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup>
import { object, string } from "yup";
import { reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
const { $toast } = useNuxtApp();

const router = useRouter();

const authStore = useAuthStore();

const schema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
});

const state = reactive({
  email: undefined,
  password: undefined,
});

const onSubmit = async () => {
  if (schema.validateSync(state)) {
    await authStore.login(state.email, state.password, router, $toast);
  }
};
</script>
