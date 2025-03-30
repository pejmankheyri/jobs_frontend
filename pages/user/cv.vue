<script setup>
definePageMeta({
  middleware: "auth",
  role: "user",
});

const userStore = useUserStore();
const { t } = useI18n();
const appToast = useAppToast();

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

    await userStore.changeCV(formData, t, appToast);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container max-w-md mx-auto my-10">
    <h1 class="mb-4 text-2xl font-bold">{{ $t("CHANGE_CV") }}</h1>
    <div v-if="user.cv">
      <a
        :href="`${config.public.apiBaseUrl}${user.cv}`"
        target="_blank"
        class="text-black"
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

    <UForm :state="state" class="mt-10 space-y-4" @submit="onSubmit">
      <UFormGroup :label="$t('UPLOAD_NEW_CV')" name="cv">
        <UInput
          v-model="state.cv"
          :ui="{
            base: 'border border-black !ring-transparent focus:border-black dark:border-gray-400 dark:focus:border-gray-400',
          }"
          type="file"
          size="sm"
          icon="i-heroicons-folder"
          @change="onFileChange"
        />
      </UFormGroup>
      <div class="pt-4">
        <UButton type="submit" color="black" :loading="loading" block>
          {{ $t("CHANGE_CV") }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>
