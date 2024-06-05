<script setup>
definePageMeta({
  middleware: "auth",
});

const { $toast } = useNuxtApp();

const authStore = useAuthStore();

const loading = ref(false);
const file = ref(null);

const state = reactive({
  avatar: undefined,
});

const onFileChange = (event) => {
  file.value = event[0];
};
const config = useRuntimeConfig();

const onSubmit = async () => {
  try {
    loading.value = true;

    const formData = new FormData();
    formData.append("avatar", file.value);

    await authStore.changeAvatar(formData, $toast);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container mx-auto max-w-md my-10">
    <h1 class="text-2xl font-bold mb-4">Change Avatar</h1>
    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Avatar" name="avatar">
        <UInput
          v-model="state.avatar"
          color="indigo"
          type="file"
          size="sm"
          icon="i-heroicons-folder"
          @change="onFileChange"
        />
        <!-- <input type="file" @change="onFileChange" /> -->
      </UFormGroup>
      <div class="pt-4">
        <UButton type="submit" color="indigo" :loading="loading" block>
          Change Avatar
        </UButton>
      </div>
    </UForm>
  </div>
</template>
