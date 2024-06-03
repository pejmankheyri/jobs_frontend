<script setup>
import { object, string } from "yup";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
const { $toast } = useNuxtApp();

const router = useRouter();
const authStore = useAuthStore();

const schema = object({
  name: string().required("Required"),
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(8, "Must be at least 8 characters")
    .required("Required"),
  password_confirmation: string().required("Required"),
});

const state = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
  password_confirmation: undefined,
  role: undefined,
});

const roleOptions = ["Company", "Job Seeker"];

const onSubmit = async () => {
  if (schema.validateSync(state)) {
    await authStore.register(
      state.name,
      state.email,
      state.password,
      state.password_confirmation,
      state.role,
      router,
      $toast
    );
  }
};
</script>

<template>
  <div class="container mx-auto max-w-md">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" color="indigo" icon="i-heroicons-user" />
      </UFormGroup>

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" icon="i-heroicons-envelope" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput
          v-model="state.password"
          type="password"
          icon="i-heroicons-key"
          color="indigo"
        />
      </UFormGroup>
      <UFormGroup label="Password confirmation" name="password_confirmation">
        <UInput
          v-model="state.password_confirmation"
          type="password"
          icon="i-heroicons-key"
          color="indigo"
        />
      </UFormGroup>

      <UFormGroup label="User type" name="role">
        <USelect
          icon="i-heroicons-users"
          :options="roleOptions"
          color="indigo"
          class="w-full"
          v-model="state.role"
        />
      </UFormGroup>
      <div class="pt-4">
        <UButton type="submit" color="indigo" block> Register </UButton>
      </div>
    </UForm>
  </div>
</template>
