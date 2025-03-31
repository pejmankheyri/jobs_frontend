<script setup>
import { ref, onMounted, computed } from "vue";
const route = useRoute();
const { t } = useI18n();

const jobs = ref([]);
const error = ref("");
const page = ref(1);
const loading = ref(false);
const selectedJob = ref(null);
const itemsPerPage = 7;

const displayedJobs = computed(() => {
  return jobs.value;
});

const fetchJobs = async () => {
  if (loading.value) return;
  try {
    loading.value = true;
    const { data } = await useCustomFetch(`/jobs`, {
      params: {
        page: page.value,
        per_page: itemsPerPage,
        q: route.query.q,
        location: route.query.location,
      },
    });

    jobs.value = [...jobs.value, ...data];
    if (!selectedJob.value && data.length > 0) selectedJob.value = data[0];
    page.value++;
  } catch (error) {
    console.error(t("ERROR_FETCHING_JOBS") + ":", error);
  } finally {
    loading.value = false;
  }
};

watch(
  () => route.params,
  () => {
    jobs.value = [];
    page.value = 1;
    fetchJobs();
  },
  { immediate: true }
);

onMounted(fetchJobs);
</script>

<template>
  <div v-if="displayedJobs.length" class="dashboard-container">
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
        <JobDetails :selectedJob="selectedJob" />
      </div>
    </div>
  </div>
  <USkeleton v-else-if="loading" class="h-[100px] w-full mb-auto mt-8" />
  <p v-else-if="error">{{ error }}</p>
  <p v-else>{{ $t("NO_JOBS_FOUND") }}</p>
</template>
