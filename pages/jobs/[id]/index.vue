<script setup>
import { ref, onMounted } from "vue";
const route = useRoute();
const { t, localePath } = useI18n();
const router = useRouter();
const { isMobile, isDesktop } = useDevice();
const localeRoute = useLocaleRoute();

const config = useRuntimeConfig();

// Reactive jobs data
const loading = ref(false);
const selectedJob = ref(null);

// Fetch jobs data from API
const fetchJob = async () => {
  try {
    loading.value = true;
    const { data } = await useCustomFetch(`/jobs/${route.params.id}`);

    selectedJob.value = data;
  } catch (error) {
    console.error(t("ERROR_FETCHING_JOBS") + ":", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (isDesktop) {
    const route = localeRoute("/");
    navigateTo(route.fullPath);
  }
  fetchJob();
});
</script>

<template>
  <div
    class="items-center justify-center block grid-cols-1 gap-4 py-4 align-middle lg:grid place-items-center"
  >
    <UButton
      @click="router.back()"
      color="black"
      variant="outline"
      icon="i-heroicons-arrow-left"
      class="mb-4"
    >
      {{ $t("BACK") }}
    </UButton>

    <USkeleton v-if="loading" class="h-[100px] w-full mb-auto mt-16" />
    <div v-else class="border border-black rounded-md dark:border-gray-400">
      <JobDetails :selectedJob="selectedJob" />
    </div>
  </div>
</template>
