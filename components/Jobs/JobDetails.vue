<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const { $toast } = useNuxtApp();
const config = useRuntimeConfig();
const authStore = useAuthStore();
const { t } = useI18n();

const isAuthenticated = computed(() => !!authStore.token);

const isApplyBoxOpen = ref(false);
const loading = ref(false);
const coverLetter = ref("");

const props = defineProps({
  selectedJob: Object,
});

const getCompanyRating = (rating) => {
  return rating + ".0";
};

const applyJob = async (id, coverLetter) => {
  try {
    loading.value = true;
    const response = await useFetch(`/jobs/${id}/apply`, {
      method: "POST",
      body: {
        message: coverLetter,
      },
    });

    isApplyBoxOpen.value = false;

    $toast.success(response.message);
  } catch (error) {
    if (error.response.status === 400 || error.response.status === 404) {
      $toast.error(error.response._data.message);
    } else {
      $toast.error(t("ERROR_APPLYING_JOB"));
    }
  } finally {
    loading.value = false;
  }
};

const companyLogoSrc = computed(() => {
  return config.public.apiBaseUrl + props.selectedJob?.company.logo;
});
</script>

<template>
  <div class="p-8">
    <div class="flex pb-2 justify-between">
      <div class="flex">
        <div class="text-xl pr-3 place-items-center flex gap-2">
          <img
            :src="companyLogoSrc"
            alt="company logo"
            class="w-8 h-8 rounded-full"
          />
          {{ selectedJob?.company?.title }}
        </div>

        <div class="flex font-thin text-sm items-center gap-1">
          {{ getCompanyRating(selectedJob?.company?.rating) }}
          <Star class="" />
        </div>
      </div>
      <div>
        <UTooltip
          :text="
            !isAuthenticated
              ? $t('LOGIN_TO_APPLY_JOB')
              : $t('CLICK_TO_APPLY_JOB')
          "
        >
          <UButton
            color="indigo"
            class="ml-auto truncate p-4"
            :disabled="!isAuthenticated"
            @click="isApplyBoxOpen = true"
            >{{ $t("APPLY_THIS_JOB") }}</UButton
          >
        </UTooltip>
        <UModal v-model="isApplyBoxOpen">
          <div class="p-4">
            <UTextarea
              color="indigo"
              variant="outline"
              placeholder="Your cover letter"
              class="pb-4"
              v-model="coverLetter"
            />

            <UButton
              color="indigo"
              class="ml-auto truncate p-4"
              :disabled="!isAuthenticated"
              :loading="loading"
              @click="applyJob(selectedJob.id, coverLetter)"
              block
              >{{ $t("APPLY_THIS_JOB") }}</UButton
            >
          </div>
        </UModal>
      </div>
    </div>
    <div class="flex items-center">
      <div class="flex flex-col">
        <h1 class="text-3xl">
          {{ selectedJob?.title }}
        </h1>
        <span class="">
          {{ selectedJob?.company?.location[0]?.state }},
          {{ selectedJob?.company?.location[0]?.country }}
        </span>
      </div>
    </div>

    <br />
    <p class="pb-8">{{ selectedJob?.description }}</p>
    <br />

    <div class="flex gap-2">
      <div v-for="tag in selectedJob?.tags" :key="tag.id" class="">
        <UBadge variant="subtle" color="indigo">{{ tag.name }}</UBadge>
      </div>
    </div>
  </div>
  <div class="absolute bottom-0 border-t-2">
    <div class="p-8">
      <h2 class="text-2xl">{{ $t("COMPANY_DESCRIPTION") }}</h2>
      <div class="grid grid-cols-2 py-6">
        <p>
          {{ $t("SIZE") }}: {{ selectedJob?.company?.employes }}
          {{ $t("EMPLOYEE") }}
        </p>
        <p>
          {{ $t("WEBSITE") }}:
          <a
            :href="selectedJob?.company?.website"
            target="_blank"
            class="text-indigo-500"
          >
            {{ selectedJob?.company?.website }}</a
          >
        </p>
      </div>
    </div>
  </div>
</template>
