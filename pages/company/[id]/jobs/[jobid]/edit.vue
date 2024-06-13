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
const loadingJob = ref(false);
const selectedTags = ref([]);
const newTag = ref("");

const schema = object({
  title: string().required(t("THIS_FIELD_IS_REQUIRED")),
  description: string().required(t("THIS_FIELD_IS_REQUIRED")),
});

const state = reactive({
  title: "",
  description: "",
  tags: "",
});

const onSubmit = async () => {
  if (schema.validateSync(state)) {
    try {
      loadingSave.value = true;
      state.tags = selectedTags.value.map((tag) => tag.name);
      await companyStore.editJob(
        state,
        route.params.jobid,
        t,
        localeRoute,
        appToast
      );
    } finally {
      loadingSave.value = false;
    }
  }
};

const fetchJob = async () => {
  try {
    loadingJob.value = true;
    const job = await companyStore.getJob(route.params.jobid);
    state.title = job.title;
    state.description = job.description;

    selectedTags.value = job.tags;
  } finally {
    loadingJob.value = false;
  }
};

const addTag = (event) => {
  if (!selectedTags.value.find((t) => t.title === event.target.value)) {
    selectedTags.value.push({
      id: event.target.value.id,
      name: event.target.value,
    });
    newTag.value = "";
  }
};

const removeTag = (tag) => {
  selectedTags.value = selectedTags.value.filter((t) => t.id !== tag.id);
  onSubmit();
};

onMounted(() => {
  fetchJob();
});
</script>
<template>
  <div class="container max-w-md mx-auto my-10">
    <UButton
      @click="
        navigateTo(
          localePath({
            name: 'company-id-jobs',
            params: { id: route.params.id },
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
    <h1 class="mb-4 text-2xl font-bold">{{ $t("EDIT_JOB") }}</h1>

    <USkeleton v-if="loadingJob" class="h-[100px] w-full mb-auto mt-16" />

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
          color="indigo"
        />
      </UFormGroup>
      <UFormGroup :label="$t('JOB_DESCRIPTION')" name="description">
        <UTextarea
          v-model="state.description"
          icon="i-heroicons-document-text"
          color="indigo"
        />
      </UFormGroup>

      <UInput
        v-model="newTag"
        icon="i-heroicons-tag"
        color="indigo"
        @keydown.enter="addTag"
        :placeholder="$t('ADD_NEW_TAG_AND_HIT_ENTER')"
      />
      <div class="mt-4">
        <h2 class="mb-2">{{ $t("SELECTED_TAGS") }}:</h2>
        <ul class="grid grid-cols-2 gap-2">
          <li v-for="tag in selectedTags" :key="tag.id">
            <UBadge
              variant="subtle"
              color="indigo"
              class="cursor-pointer"
              @click="removeTag(tag)"
              ><Close />{{ tag.name }}</UBadge
            >
          </li>
        </ul>
      </div>

      <div class="pt-4">
        <UButton type="submit" color="indigo" :loading="loadingSave" block>
          {{ $t("SAVE_CHANGES") }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>
