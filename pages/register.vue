<script setup>
import { object, string } from "yup";

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
});
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

      <UButton type="submit" color="indigo" block> Register </UButton>
    </UForm>
  </div>
</template>
