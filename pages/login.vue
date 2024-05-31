<script setup>
import { object, string } from "yup";

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
</script>

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

      <UButton type="submit" color="indigo" block> Login </UButton>
    </UForm>
  </div>
</template>
