<script setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { object, string } from "yup";
import { useCompanyStore } from "@/stores/company";

definePageMeta({
  middleware: "auth",
  role: "company",
});

const { t } = useI18n();
const companyStore = useCompanyStore();
const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();
const localeRoute = useLocaleRoute();
const appToast = useAppToast();

const loadingSave = ref(false);
const loadingCompany = ref(false);
const selectedTags = ref([]);
const newTag = ref("");

const schema = object({
  title: string().required(t("THIS_FIELD_IS_REQUIRED")),
  description: string().required(t("THIS_FIELD_IS_REQUIRED")),
});

const state = reactive({
  title: "",
  description: "",
  rating: 0,
  website: "",
  employes: "",
});

const ratingOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
];

const onSubmit = async () => {
  if (schema.validateSync(state)) {
    try {
      loadingSave.value = true;

      await companyStore.updateCompany(state, route.params.id, t, appToast);
    } finally {
      loadingSave.value = false;
    }
  }
};

const fetchCompany = async () => {
  try {
    loadingCompany.value = true;
    const response = await companyStore.fetchCompany(route.params.id);

    state.title = response.title;
    state.description = response.description;
    state.rating = response.rating;
    state.website = response.website;
    state.employes = response.employes;
  } finally {
    loadingCompany.value = false;
  }
};

onMounted(() => {
  fetchCompany();
});
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
      color="black"
      variant="outline"
      icon="i-heroicons-arrow-left"
      class="mb-4"
    >
      {{ $t("BACK") }}
    </UButton>
    <h1 class="mb-4 text-2xl font-bold">{{ $t("EDIT_COMPANY") }}</h1>

    <USkeleton v-if="loadingCompany" class="h-[100px] w-full mb-auto mt-16" />

    <UForm
      v-else
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup :label="$t('JOB_TITLE')" name="title">
        <UInput
          v-model="state.title"
          icon="i-heroicons-briefcase"
          :ui="{
            base: 'border border-black !ring-transparent focus:border-black dark:border-gray-400 dark:focus:border-gray-400',
          }"
        />
      </UFormGroup>
      <UFormGroup :label="$t('JOB_DESCRIPTION')" name="description">
        <UTextarea
          v-model="state.description"
          icon="i-heroicons-document-text"
          :ui="{
            base: 'border border-black !ring-transparent focus:border-black dark:border-gray-400 dark:focus:border-gray-400',
          }"
        />
      </UFormGroup>
      <UFormGroup :label="$t('RATING')" name="rating">
        <USelect
          v-model="state.rating"
          :ui="{
            base: 'border border-black !ring-transparent focus:border-black dark:border-gray-400 dark:focus:border-gray-400',
          }"
          :options="ratingOptions"
        />
      </UFormGroup>
      <UFormGroup :label="$t('WEBSITE')" name="website">
        <UInput
          v-model="state.website"
          icon="i-heroicons-cursor-arrow-ripple"
          :ui="{
            base: 'border border-black !ring-transparent focus:border-black dark:border-gray-400 dark:focus:border-gray-400',
          }"
        />
      </UFormGroup>
      <UFormGroup :label="$t('EMPLOYEES')" name="employes">
        <UInput
          v-model="state.employes"
          icon="i-heroicons-users"
          :ui="{
            base: 'border border-black !ring-transparent focus:border-black dark:border-gray-400 dark:focus:border-gray-400',
          }"
        />
      </UFormGroup>

      <div class="pt-4">
        <UButton type="submit" color="black" :loading="loadingSave" block>
          {{ $t("SAVE_CHANGES") }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>
