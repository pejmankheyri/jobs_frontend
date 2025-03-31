<script setup>
import { ref, onMounted, computed } from "vue";
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const jobs = ref([]);
const error = ref("");
const page = ref(1);
const loading = ref(false);
const selectedJob = ref(null);
const itemsPerPage = 6;

const selectedTagId = computed(() => route.query.tagId);
const selectedTagName = computed(() => route.query.tagName);

const displayedJobs = computed(() => {
  return jobs.value;
});

const fetchJobs = async () => {
  if (loading.value) return;
  try {
    loading.value = true;

    const endpoint = selectedTagId.value
      ? `/jobs/tags/${selectedTagId.value}`
      : `/jobs`;

    const { data } = await useCustomFetch(endpoint, {
      params: {
        page: page.value,
        per_page: itemsPerPage,
        q: route.query.q,
        location: route.query.location,
      },
    });

    if (page.value === 1) {
      jobs.value = [...data];
    } else {
      jobs.value = [...jobs.value, ...data];
    }

    if (!selectedJob.value && data.length > 0) selectedJob.value = data[0];
    page.value++;
  } catch (error) {
    console.error(t("ERROR_FETCHING_JOBS") + ":", error);
  } finally {
    loading.value = false;
  }
};

const filterByTag = (tagId, tagName) => {
  router.push({
    query: {
      ...route.query,
      tagId,
      tagName,
    },
  });
};

// Clear tag filter
const clearTagFilter = () => {
  const newQuery = { ...route.query };
  delete newQuery.tagId;
  delete newQuery.tagName;

  router.push({
    query: newQuery,
  });
};

// Reset jobs list and fetch from beginning
const resetJobsList = () => {
  jobs.value = [];
  page.value = 1;
  fetchJobs();
};

watch(
  () => route.params,
  () => resetJobsList(),
  { immediate: true }
);

watch(
  () => route.query,
  () => resetJobsList(),
  { deep: true }
);

onMounted(fetchJobs);
</script>

<template>
  <div v-if="displayedJobs.length" class="dashboard-container">
    <!-- Active tag filter indicator -->
    <div v-if="selectedTagId" class="px-4 py-2 mb-4">
      <div class="flex items-center gap-2">
        <span>{{ $t("FILTERING_BY_TAG") }}: </span>
        <UBadge color="black" class="mr-2">{{ selectedTagName }}</UBadge>
        <UButton
          size="xs"
          color="black"
          variant="ghost"
          icon="i-heroicons-x-mark"
          @click="clearTagFilter"
          :aria-label="$t('CLEAR_FILTER')"
        />
      </div>
    </div>

    <div class="jobs-column scrollbar-hide">
      <div class="job-list scrollbar-hide">
        <JobsList
          v-for="job in displayedJobs"
          :key="job.id"
          :job="job"
          :loading="loading"
          :error="error"
          :selectedJob="selectedJob"
          @select-job="selectedJob = $event"
        />

        <div class="flex justify-center my-4">
          <UButton
            color="black"
            variant="outline"
            @click="fetchJobs"
            :loading="loading"
            :disabled="loading"
          >
            {{ $t("LOAD_MORE") }}
          </UButton>
        </div>
      </div>
    </div>

    <div class="details-column scrollbar-hide">
      <div
        class="rounded-md job-details scrollbar-hide"
        :class="{ 'border-black border dark:border-gray-400': selectedJob }"
      >
        <JobDetails :selectedJob="selectedJob" @filter-by-tag="filterByTag" />
      </div>
    </div>
  </div>
  <USkeleton v-else-if="loading" class="h-[100px] w-full mb-auto mt-8" />
  <p v-else-if="error">{{ error }}</p>
  <p v-else>{{ $t("NO_JOBS_FOUND") }}</p>
</template>
