<script setup>
definePageMeta({
  middleware: "auth",
  role: "user",
});

const { $toast } = useNuxtApp();
const authStore = useAuthStore();
const { t } = useI18n();

const loading = ref(false);
const file = ref(null);

const state = reactive({
  cv: undefined,
});

const user = computed(() => JSON.parse(localStorage.getItem("user")));

const onFileChange = (event) => {
  file.value = event[0];
};
const config = useRuntimeConfig();

const onSubmit = async () => {
  try {
    loading.value = true;

    const formData = new FormData();
    formData.append("cv", file.value);

    await authStore.changeCV(formData, $toast, t);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container mx-auto max-w-md my-10">
    <h1 class="text-2xl font-bold mb-4">{{ $t("CHANGE_CV") }}</h1>
    <div v-if="user.cv">
      <a
        :href="`${config.public.apiBaseUrl}${user.cv}`"
        target="_blank"
        class="text-indigo-600"
        >{{ $t("DOWNLOAD_CV") }}</a
      >
    </div>
    <embed
      :src="`${config.public.apiBaseUrl}${user.cv}`"
      height="200px"
      width="100%"
      type="application/pdf"
      frameBorder="0"
      scrolling="auto"
    />

    <UForm :state="state" class="space-y-4 mt-10" @submit="onSubmit">
      <UFormGroup :label="$t('UPLOAD_NEW_CV')" name="cv">
        <UInput
          v-model="state.cv"
          color="indigo"
          type="file"
          size="sm"
          icon="i-heroicons-folder"
          @change="onFileChange"
        />
      </UFormGroup>
      <div class="pt-4">
        <UButton type="submit" color="indigo" :loading="loading" block>
          {{ $t("CHANGE_CV") }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>
