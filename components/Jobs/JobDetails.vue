<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const config = useRuntimeConfig();
const authStore = useAuthStore();
const colorMode = useColorMode();
const { t } = useI18n();
const appToast = useAppToast();

const isAuthenticated = computed(() => !!authStore.token);

const isApplyBoxOpen = ref(false);
const loading = ref(false);
const coverLetter = ref("");

const props = defineProps({
  selectedJob: Object,
});

const starIconColor = computed(() => {
  return colorMode.preference === "light" ? "#000000" : "#ffffff";
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

    appToast.toastSuccess({
      title: t("SUCCESS"),
      description: t("JOB_APPLIED_SUCCESSFULLY"),
    });
  } catch (error) {
    if (error.response.status === 400 || error.response.status === 404) {
      appToast.toastError({
        title: t("ERROR"),
        description: error.response._data.message,
      });
    } else {
      appToast.toastError({
        title: t("ERROR"),
        description: t("ERROR_APPLYING_JOB"),
      });
    }
  } finally {
    loading.value = false;
  }
};

// get job ids from local storage jobs array
const jobIds = computed(() => {
  const jobs = JSON.parse(localStorage.getItem("jobs"));
  return jobs.map((job) => job.id);
});

// check if job is already applied
const isJobApplied = computed(() => {
  return jobIds.value.includes(props.selectedJob?.id);
});

const isJobOwner = computed(() => {
  return authStore.user?.id === props.selectedJob?.company?.user?.id;
});

const isJobApplyDisabled = computed(() => {
  return isJobApplied.value || isJobOwner.value || !isAuthenticated.value;
});

const companyLogoSrc = computed(() => {
  return config.public.apiBaseUrl + props.selectedJob?.company.logo;
});

const applyJobButtonTitle = computed(() => {
  if (isJobOwner.value) {
    return t("YOU_OWN_THIS_JOB");
  } else if (isJobApplied.value) {
    return t("JOB_ALREADY_APPLIED_TO_THIS_JOB");
  } else if (!isAuthenticated.value) {
    return t("LOGIN_TO_APPLY_JOB");
  } else {
    return t("CLICK_TO_APPLY_JOB");
  }
});
</script>

<template>
  <div class="p-8">
    <div class="flex justify-between pb-2">
      <div class="flex">
        <div class="flex gap-2 pr-3 text-xl place-items-center">
          <img
            :src="companyLogoSrc"
            alt="company logo"
            class="w-8 h-8 rounded-full"
          />
          {{ selectedJob?.company?.title }}
        </div>

        <div class="flex items-center gap-1 text-sm font-thin">
          {{ getCompanyRating(selectedJob?.company?.rating) }}
          <Star class="" :color="starIconColor" />
        </div>
      </div>
      <div>
        <UTooltip :text="applyJobButtonTitle">
          <UButton
            color="indigo"
            class="p-4 ml-auto truncate"
            :disabled="isJobApplyDisabled"
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
              class="p-4 ml-auto truncate"
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
  <div class="absolute bottom-0 w-full border-t-2">
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
