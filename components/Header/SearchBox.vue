<script setup>
import { ref } from "vue";
import SearchInput from "@/components/Header/SearchInput.vue";
import useFetch from "@/composables/useFetch";

const keyword = ref("");
const location = ref("");
const results = ref([]);
const loading = ref(false);
const error = ref(null);
const showResults = ref(false);

const performSearch = async () => {
  loading.value = true;
  error.value = null;

  try {
    const { data, error: fetchError } = await useFetch("/search/jobs", {
      params: {
        q: keyword.value,
        location: location.value,
      },
    });

    if (fetchError) {
      error.value = fetchError.message;
    } else {
      results.value = data;
      showResults.value = true;
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const handleClickOutside = (event) => {
  const searchContainer = document.querySelector(".search-container");
  if (!searchContainer.contains(event.target)) {
    showResults.value = false;
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
    class="md:flex md:gap-1 hidden md:relative md:align-middle md:items-center md:place-items-center search-container"
  >
    <SearchInput
      v-model:query="keyword"
      placeholder="Find your job"
      classItems="!w-[450px]"
      @update:query="performSearch"
    />
    <!-- <SearchInput v-model:query="location" placeholder="Location" /> -->
    <!-- <UButton
      @click="performSearch"
      :loading="loading"
      :disabled="loading"
      size="lg"
      color="indigo"
      >Search</UButton
    > -->

    <SearchResults
      :results="results"
      :visible="showResults"
      :loading="loading"
    />
  </div>
</template>
