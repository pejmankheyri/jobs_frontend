<script setup>
import { ref } from "vue";

const { t, localePath } = useI18n();

const localeRoute = useLocaleRoute();

const props = defineProps({
  results: Array,
  visible: Boolean,
  loading: Boolean,
});

const resultsBox = ref(null);

const goToJobs = (title) => {
  const route = localeRoute({ name: "jobs-title", params: { title: title } });
  navigateTo(route.fullPath);
};
</script>
<template>
  <div
    v-if="results.length > 0 && visible"
    class="mt-11 absolute bg-slate-100 text-black top-0 z-10 border rounded w-full"
  >
    <div v-if="loading" class="py-4 px-2 cursor-pointer hover:bg-slate-200">
      <h3>{{ $t("LOADING") }}</h3>
    </div>

    <div
      v-for="result in results"
      :key="result.id"
      class="border-b-2 py-4 px-2 cursor-pointer hover:bg-slate-200"
      @click="goToJobs(result.title)"
    >
      <h3>{{ result.title }}</h3>
    </div>
  </div>
</template>
