<script setup>
definePageMeta({
  middleware: "auth",
  role: "company",
});

import { ref, reactive, computed, onMounted, toRaw } from "vue";

import { useAuthStore } from "@/stores/auth";
import { useCompanyStore } from "@/stores/company";

const runtimeConfig = useRuntimeConfig();
const config = useRuntimeConfig();
const authStore = useAuthStore();
const companyStore = useCompanyStore();
const { t } = useI18n();
const appToast = useAppToast();

const loading = ref(false);
const file = ref(null);
const companyObject = ref(null);

const state = reactive({
  image: undefined,
});

const onFileChange = (event) => {
  file.value = event[0];
};

const onSubmit = async () => {
  try {
    loading.value = true;

    const formData = new FormData();
    formData.append("images[]", file.value);

    companyObject.value = await companyStore.addImage(
      formData,
      route.params.id,
      t,
      appToast
    );
    state.image = undefined;
    fetchCompany();
  } finally {
    loading.value = false;
  }
};

const route = useRoute();

onMounted(() => {
  fetchCompany();
});

const fetchCompany = async () => {
  try {
    loading.value = true;
    companyObject.value = await companyStore.fetchCompany(route.params.id);
  } finally {
    loading.value = false;
  }
};

const removeImage = async (id) => {
  try {
    loading.value = true;
    await companyStore.removeImage(id, t, appToast);
    fetchCompany();
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container max-w-md mx-auto my-10">
    <UButton
      @click="
        navigateTo(
          localePath({
            name: 'company-list',
          })
        )
      "
      color="indigo"
      variant="outline"
      icon="i-heroicons-arrow-left"
      class="mb-4"
    >
      {{ $t("BACK") }}
    </UButton>
    <h1 class="mb-4 text-2xl font-bold">{{ $t("COMPANY_IMAGES") }}</h1>

    <UInput
      v-model="state.image"
      color="indigo"
      type="file"
      size="sm"
      icon="i-heroicons-folder"
      @change="onFileChange"
    />
    <UButton
      @click="onSubmit"
      color="indigo"
      block
      icon="i-heroicons-save"
      class="my-4"
    >
      {{ $t("SAVE") }}
    </UButton>
    <USkeleton v-if="loading" class="h-[100px] w-full mb-auto mt-16" />
    <div v-else>
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div v-for="image in companyObject?.images" :key="image.id">
          <Close class="cursor-pointer" @click="removeImage(image.id)" />

          <img :src="runtimeConfig.public.apiBaseUrl + image.path" />
        </div>
      </div>
    </div>
  </div>
</template>
