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
    <div class="flex place-items-center mb-2">
      <div class="font-thin text-sm pr-3 flex gap-2 place-items-center">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABzElEQVR4Ab2WAUQDURjHDw0QIAQkAVBaMwvDJiMbY7QgFgAkAAGZZUASFiyAnQUEotMIGUKgAAYNWxY20Gyv9+d57d52X99mN/zcuee933vv/b+7sxKnyX9pxUORVixUkNe6pCMRQN3XVVuEMxbZ2E4Ej7WARwd9phbKGa/Izg2+aIwGxmAJsTUSMRcmSP2UFcgVqm0UDBzJjcKhZYSQcWZZIsVZjgz8pTEaGniI6mYnQnzCKothzfruFteFKeXL+Fh9J7DdfwyI4ZMlcIUUQDhnmRZeQDTKV3ZLnYU/wmdTiNWenReXqY6xQq8suZ6C8m6psiKFS21TiGeUTAnFDCQsQ6aEgRd/hN3c4oWL3VIIjdAgMMzQNCXvHjS9z1CVxWgtHt4lxaadIcuCkWBhgpS6Cv/jYU0E7YyGL+Ftt+vVVr0PidXKgUu4Y2de57U6PNfCVDWVM2WzSGP5nzwRmg0tBHLgTwg8pD3JkZcoaKfDmFj08k3E84NJstrY9xAHaoi85I6kpMB9T7dX90Tk9sqUuhI/NlNCxkJJXaVgfg99keKKQmf9JmJ7iTNlkg5P/SOMoOgzYmK+MGghkUIMpEKiV457pFMFaJ8z1i/ATnOr+aZzdAAAAABJRU5ErkJggg=="
          alt="company logo"
          class="w-6 h-6 rounded-full"
        />
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
      <small class="truncate">{{ job.create_dates.created_at_human }}</small>
    </div>
  </div>
</template>
