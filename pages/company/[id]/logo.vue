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
  logo: undefined,
});

const onFileChange = (event) => {
  file.value = event[0];
};

const onSubmit = async () => {
  try {
    loading.value = true;

    const formData = new FormData();
    formData.append("logo", file.value);

    companyObject.value = await companyStore.changeLogo(
      formData,
      companyId,
      t,
      appToast
    );
  } finally {
    loading.value = false;
  }
};

const route = useRoute();
const companyId = computed(() => Number(route.params.id));

onMounted(() => {
  fetchCompany();
});

const fetchCompany = async () => {
  try {
    loading.value = true;
    companyObject.value = await companyStore.fetchCompany(companyId);
  } finally {
    loading.value = false;
  }
};

const companyLogoSrc = computed(() => {
  return runtimeConfig.public.apiBaseUrl + companyObject.value?.logo;
});
</script>

<template>
  <div class="container max-w-md mx-auto my-10">
    <h1 class="mb-4 text-2xl font-bold">{{ $t("COMPANY_LOGO") }}</h1>
    <UAvatar :src="companyLogoSrc" size="3xl" />

    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup :label="$t('LOGO')" name="logo">
        <UInput
          v-model="state.logo"
          color="indigo"
          type="file"
          size="sm"
          icon="i-heroicons-folder"
          @change="onFileChange"
        />
      </UFormGroup>
      <div class="pt-4">
        <UButton type="submit" color="indigo" :loading="loading" block>
          {{ $t("CHANGE_LOGO") }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>
