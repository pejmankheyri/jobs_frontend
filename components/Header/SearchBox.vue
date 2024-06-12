<script setup>
import { ref } from "vue";
import SearchInput from "@/components/Header/SearchInput.vue";
import useFetch from "@/composables/useFetch";

const router = useRouter();

const job = ref("");
const jobResults = ref([]);
const loadingJob = ref(false);
const errorJob = ref(null);
const showJobResults = ref(false);
const selectedJob = ref("");

const location = ref("");
const locationResults = ref([]);
const loadingLocation = ref(false);
const errorLocation = ref(null);
const showLocationResults = ref(false);
const selectedLocation = ref("");

const performJobSearch = async () => {
  loadingJob.value = true;
  errorJob.value = null;

  try {
    const { data, error: fetchError } = await useFetch("/search/jobs", {
      params: {
        q: job.value,
        location: location.value,
      },
    });

    if (fetchError) {
      errorJob.value = fetchError.message;
    } else {
      jobResults.value = data;
      showJobResults.value = true;
    }
  } catch (err) {
    errorJob.value = err.message;
  } finally {
    loadingJob.value = false;
  }
};

const performLocationSearch = async () => {
  loadingLocation.value = true;
  errorLocation.value = null;

  try {
    const { data, error: fetchError } = await useFetch("/search/locations", {
      params: {
        q: location.value,
      },
    });

    if (fetchError) {
      errorLocation.value = fetchError.message;
    } else {
      locationResults.value = data;
      showLocationResults.value = true;
    }
  } catch (err) {
    errorLocation.value = err.message;
  } finally {
    loadingLocation.value = false;
  }
};

watch(
  () => selectedJob.value,
  (value) => {
    if (value.trim().length > 0) {
      router.push({
        query: {
          q: selectedJob.value,
          location: selectedLocation.value,
        },
      });
    }
  }
);

const handleItemClick = (result) => {
  if (result.type === "jobs") {
    showJobResults.value = false;
    selectedJob.value = result.result.title;
  }
  if (result.type === "locations") {
    showLocationResults.value = false;
    selectedLocation.value = `${result.result.city}, ${result.result.state}, ${result.result.country}`;
  }
};

const removeSelectedJob = () => {
  selectedJob.value = "";
  selectedLocation.value = "";
  router.push({
    query: {},
  });
};

const removeSelectedLocation = () => {
  selectedLocation.value = "";
  router.push({
    query: {
      q: selectedJob.value,
      location: "",
    },
  });
};

const handleClickOutside = (event) => {
  const searchContainer = document.querySelector(".search-container");
  if (!searchContainer.contains(event.target)) {
    showJobResults.value = false;
    showLocationResults.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div
    class="hidden md:flex md:gap-0.5 md:relative md:align-middle md:items-center md:place-items-center search-container"
  >
    <div class="relative">
      <div
        v-if="selectedJob"
        class="absolute right-0 content-center float-right h-full pr-2 align-middle cursor-pointer"
        @click="removeSelectedJob"
      >
        <Close />
      </div>
      <SearchInput
        v-model:query="job"
        :placeholder="$t('SEARCH_FOR_JOBS')"
        :selectedValue="selectedJob"
        type="jobs"
        classItems="!w-[350px]"
        @update:query="performJobSearch"
      />
      <SearchResults
        :results="jobResults"
        type="jobs"
        :visible="showJobResults"
        :loading="loadingJob"
        @selectedValue="handleItemClick($event)"
      />
    </div>
    <div>
      <div
        v-if="selectedLocation"
        class="absolute right-0 content-center float-right h-full pr-2 align-middle cursor-pointer"
        @click="removeSelectedLocation"
      >
        <Close />
      </div>
      <SearchInput
        v-model:query="location"
        :placeholder="$t('LOCATION')"
        :selectedValue="selectedLocation"
        type="locations"
        classItems="!w-[250px]"
        @update:query="performLocationSearch"
      />
      <SearchResults
        :results="locationResults"
        type="locations"
        :visible="showLocationResults"
        :loading="loadingLocation"
        @selectedValue="handleItemClick($event)"
      />
    </div>
  </div>
</template>
