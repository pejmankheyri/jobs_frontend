<script setup>
import { useSavedJobsStore } from "@/stores/savedJobs";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
  job: Object,
  loading: Boolean,
  error: String,
  selectedJob: Object,
});

const emit = defineEmits(["selectJob"]);

const runtimeConfig = useRuntimeConfig();
const colorMode = useColorMode();
const { isMobile, isDesktop } = useDevice();
const router = useRouter();
const { t } = useI18n();
const appToast = useAppToast();
const savedJobsStore = useSavedJobsStore();
const authStore = useAuthStore();
const savingJob = ref(false);

const isAuthenticated = computed(() => !!authStore.token);

const isJobSaved = computed(() => {
  return savedJobsStore.isJobSaved(props.job.id);
});

const emptyStarColor = computed(() => {
  return colorMode.preference === "light" ? "#cccccc" : "#555555";
});

// Generate array of stars for company rating
const getCompanyRatingStars = computed(() => {
  if (!props.job?.company?.rating) return [];

  const rating = props.job.company.rating;
  const stars = [];

  // Create array of 5 stars with filled or empty state
  for (let i = 1; i <= 5; i++) {
    stars.push({
      filled: i <= rating,
      id: i,
    });
  }

  return stars;
});

const starIconColor = computed(() => {
  return colorMode.preference === "light" ? "#000000" : "#ffffff";
});

const companyLogoSrc = computed(() => {
  return runtimeConfig.public.apiBaseUrl + props.job.company.logo;
});

const formattedLocation = computed(() => {
  const locations = props.job?.company?.location || [];
  if (locations.length === 0) return "Remote";

  const location = locations[0];
  return `${location.state || ""}, ${location.country || ""}`.replace(
    /^, /,
    ""
  );
});

const selectJob = () => {
  if (isDesktop) {
    emit("selectJob", props.job);
  } else {
    router.push({
      path: `/jobs/${props.job.id}`,
    });
  }
};

const toggleSaveJob = async (event) => {
  // Prevent the click from selecting the job
  event.stopPropagation();

  if (!isAuthenticated.value) {
    appToast.toastInfo({
      title: t("LOGIN_REQUIRED"),
      description: t("LOGIN_TO_SAVE_JOBS"),
    });
    return;
  }

  savingJob.value = true;
  try {
    if (isJobSaved.value) {
      await savedJobsStore.unsaveJob(props.job.id);
      appToast.toastSuccess({
        title: t("SUCCESS"),
        description: t("JOB_REMOVED_FROM_SAVED"),
      });
    } else {
      await savedJobsStore.saveJob(props.job.id);
      appToast.toastSuccess({
        title: t("SUCCESS"),
        description: t("JOB_SAVED_SUCCESSFULLY"),
      });
    }
  } finally {
    savingJob.value = false;
  }
};
</script>

<template>
  <div
    class="relative p-4 mb-2 border rounded-md cursor-pointer"
    :class="[
      selectedJob.id === job.id
        ? 'border-black dark:border-gray-400'
        : 'border-white dark:border-gray-900',
    ]"
    @click="selectJob"
  >
    <div class="absolute top-2 right-2">
      <UButton
        :icon="
          isJobSaved ? 'i-heroicons-bookmark-solid' : 'i-heroicons-bookmark'
        "
        color="black"
        variant="ghost"
        size="xs"
        :loading="savingJob"
        :disabled="savingJob"
        @click="toggleSaveJob"
        :aria-label="isJobSaved ? $t('UNSAVE_JOB') : $t('SAVE_JOB')"
      />
    </div>

    <div class="flex mb-2 place-items-center">
      <div class="flex gap-2 pr-3 text-sm font-thin place-items-center">
        <img
          :src="companyLogoSrc"
          alt="company logo"
          class="w-6 h-6 rounded-full"
        />
        {{ job.company.title }}
      </div>

      <div class="flex items-center gap-1 text-sm font-thin">
        <span class="mr-1">{{ job.company.rating }}.0</span>
        <div class="flex">
          <div v-for="star in getCompanyRatingStars" :key="star.id">
            <Star
              :color="star.filled ? starIconColor : emptyStarColor"
              class="w-3 h-3"
            />
          </div>
        </div>
      </div>
    </div>
    <p class="font-semibold">{{ job.title }}</p>
    <div class="flex justify-between">
      <small>{{ formattedLocation }}</small>
      <small class="truncate">{{ job.create_dates.created_at_human }}</small>
    </div>
  </div>
</template>
