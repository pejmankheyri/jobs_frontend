<script setup>
definePageMeta({
  middleware: "auth",
});

const runtimeConfig = useRuntimeConfig();
const { $toast } = useNuxtApp();
const authStore = useAuthStore();
const { t } = useI18n();

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

    await authStore.changeAvatar(formData, $toast, t);
  } finally {
    loading.value = false;
  }
};

const user = computed(() => JSON.parse(localStorage.getItem("user")));

// Computed property to get user avatar with env variable
const userAvatar = computed(() => {
  return runtimeConfig.public.apiBaseUrl + user.value.avatar;
});
</script>

<template>
  <div class="container mx-auto max-w-md my-10">
    <h1 class="text-2xl font-bold mb-4">{{ $t("CHANGE_AVATAR") }}</h1>

    <UAvatar :src="userAvatar" size="3xl" />

    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup :label="$t('AVATAR')" name="avatar">
        <UInput
          v-model="state.avatar"
          color="indigo"
          type="file"
          size="sm"
          icon="i-heroicons-folder"
          @change="onFileChange"
        />
      </UFormGroup>
      <div class="pt-4">
        <UButton type="submit" color="indigo" :loading="loading" block>
          {{ $t("CHANGE_AVATAR") }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>
