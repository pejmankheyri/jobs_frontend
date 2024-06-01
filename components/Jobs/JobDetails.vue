<template>
  <div class="p-8">
    <div class="flex pb-2 justify-between">
      <div>
        <div class="text-xl pr-3">
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
              ? 'Please login first for apply this job'
              : 'Apply this job'
          "
        >
          <UButton
            color="indigo"
            class="ml-auto truncate p-4"
            :disabled="!isAuthenticated"
            >Apply this job</UButton
          >
        </UTooltip>
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
      <h2 class="text-2xl">Company Description</h2>
      <div class="grid grid-cols-2 py-6">
        <p>Size: {{ selectedJob?.company?.employes }} employees</p>
        <p>
          Website:
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

<script setup>
import { useAuthStore } from "@/stores/auth";
defineProps({
  selectedJob: Object,
});

const getCompanyRating = (rating) => {
  return rating + ".0";
};

const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.token);
</script>
