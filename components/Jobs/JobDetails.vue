<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const { $toast } = useNuxtApp();

const config = useRuntimeConfig();

const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.token);

const isApplyBoxOpen = ref(false);
const loading = ref(false);
const coverLetter = ref("");

defineProps({
  selectedJob: Object,
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

    $toast.success(response.message);
  } catch (error) {
    if (error.response.status === 400 || error.response.status === 404) {
      $toast.error(error.response._data.message);
    } else {
      $toast.error("Error applying job. Please try again later.");
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-8">
    <div class="flex pb-2 justify-between">
      <div class="flex">
        <div class="text-xl pr-3 place-items-center flex gap-2">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABzElEQVR4Ab2WAUQDURjHDw0QIAQkAVBaMwvDJiMbY7QgFgAkAAGZZUASFiyAnQUEotMIGUKgAAYNWxY20Gyv9+d57d52X99mN/zcuee933vv/b+7sxKnyX9pxUORVixUkNe6pCMRQN3XVVuEMxbZ2E4Ej7WARwd9phbKGa/Izg2+aIwGxmAJsTUSMRcmSP2UFcgVqm0UDBzJjcKhZYSQcWZZIsVZjgz8pTEaGniI6mYnQnzCKothzfruFteFKeXL+Fh9J7DdfwyI4ZMlcIUUQDhnmRZeQDTKV3ZLnYU/wmdTiNWenReXqY6xQq8suZ6C8m6psiKFS21TiGeUTAnFDCQsQ6aEgRd/hN3c4oWL3VIIjdAgMMzQNCXvHjS9z1CVxWgtHt4lxaadIcuCkWBhgpS6Cv/jYU0E7YyGL+Ftt+vVVr0PidXKgUu4Y2de57U6PNfCVDWVM2WzSGP5nzwRmg0tBHLgTwg8pD3JkZcoaKfDmFj08k3E84NJstrY9xAHaoi85I6kpMB9T7dX90Tk9sqUuhI/NlNCxkJJXaVgfg99keKKQmf9JmJ7iTNlkg5P/SOMoOgzYmK+MGghkUIMpEKiV457pFMFaJ8z1i/ATnOr+aZzdAAAAABJRU5ErkJggg=="
            alt="company logo"
            class="w-8 h-8 rounded-full"
          />
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
            @click="isApplyBoxOpen = true"
            >Apply this job</UButton
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
              class="ml-auto truncate p-4"
              :disabled="!isAuthenticated"
              :loading="loading"
              @click="applyJob(selectedJob.id, coverLetter)"
              block
              >Apply this job</UButton
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
