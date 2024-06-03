<script setup>
defineProps({
  job: Object,
  loading: Boolean,
  error: String,
  selectedJob: Object,
});

const getCompanyRating = (rating) => {
  return rating + ".0";
};
</script>

<template>
  <div
    class="border border-1 rounded-md p-4 mb-2 cursor-pointer"
    :class="{ 'border-indigo-500': selectedJob === job }"
    @click="$emit('select-job', job)"
  >
    <div class="flex">
      <div class="font-thin text-sm pr-3">
        {{ job.company.title }}
      </div>

      <div class="flex font-thin text-sm items-center gap-1">
        {{ getCompanyRating(job.company.rating) }} <Star class="" />
      </div>
    </div>
    <p class="font-semibold">{{ job.title }}</p>
    <div class="justify-between flex">
      <small
        >{{ job.company.location[0].state }},
        {{ job.company.location[0].country }}</small
      >
      <small>{{ job.create_dates.created_at_human }}</small>
    </div>
  </div>
</template>
