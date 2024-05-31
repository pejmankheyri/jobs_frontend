<template>
  <div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 container">
      <div v-if="jobs.length" class="job-list h-[85%] scrollbar-hide">
        <JobsList
          v-for="job in jobs"
          :key="job.id"
          :job="job"
          :loading="loading"
          :error="error"
          :selectedJob="selectedJob"
          @select-job="selectedJob = $event"
        />
      </div>
      <USkeleton v-else-if="loading" class="h-[100px] w-full" />
      <p v-if="error">{{ error }}</p>
      <div
        class="col-span-2 h-[85%] border border-1 rounded-md job-details border-indigo-500 relative"
      >
        <JobDetails :selectedJob="selectedJob" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Reactive jobs data
const jobs = ref([]);
const error = ref("");
const page = ref(1); // Track the current page
const loading = ref(false);
const selectedJob = ref(null);

// Fetch jobs data from API
const fetchJobs = async () => {
  try {
    loading.value = true;
    const response = await fetch(
      `https://jobs-api.pejmanz.com/api/v1/jobs?page=${page.value}`
    );
    const data = await response.json();
    jobs.value = [...jobs.value, ...data.data];
    if (!selectedJob.value) selectedJob.value = data.data[0];
    page.value++;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    error.value = "Error fetching jobs. Please try again later.";
  } finally {
    loading.value = false;
  }
};

// Detect scroll event and load more jobs if the user reaches the bottom of the page
const handleScroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    !loading.value &&
    !error.value
  ) {
    fetchJobs();
  }
};

// Add event listener for scroll when the component is mounted
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// Remove event listener when the component is unmounted
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Fetch jobs data when the component is mounted
onMounted(fetchJobs);
</script>

<style scoped>
.container {
  height: 100vh; /* Set container height to viewport height */
  display: flex;
}
.job-list {
  flex: 0 0 300px; /* Fixed width for the job list */
  overflow-y: auto; /* Allow job list to scroll if content overflows */
}

.job-details {
  flex: 1; /* Take remaining space */
  overflow-y: auto; /* Allow job details to scroll if content overflows */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
