<script setup>
const props = defineProps({
  job: Object,
  loading: Boolean,
  error: String,
  selectedJob: Object,
});

const emit = defineEmits(["selectJob"]);

const runtimeConfig = useRuntimeConfig();
const colorMode = useColorMode();
const { isMobile, isDesktop } = useDevice();
const router = useRouter();

const getCompanyRating = (rating) => {
  return rating + ".0";
};

const starIconColor = computed(() => {
  return colorMode.preference === "light" ? "#000000" : "#ffffff";
});

const companyLogoSrc = computed(() => {
  return runtimeConfig.public.apiBaseUrl + props.job.company.logo;
});

const formattedLocation = computed(() => {
  const locations = props.job?.company?.location || [];
  if (locations.length === 0) return "Remote";

  const location = locations[0];
  return `${location.state || ""}, ${location.country || ""}`.replace(
    /^, /,
    ""
  );
});

const selectJob = () => {
  if (isDesktop) {
    emit("selectJob", props.job);
  } else {
    router.push({
      path: `/jobs/${props.job.id}`,
    });
  }
};
</script>

<template>
  <div
    class="p-4 mb-2 border rounded-md cursor-pointer"
    :class="[
      selectedJob.id === job.id
        ? 'border-black dark:border-gray-400'
        : 'border-white dark:border-gray-900',
    ]"
    @click="selectJob"
  >
    <div class="flex mb-2 place-items-center">
      <div class="flex gap-2 pr-3 text-sm font-thin place-items-center">
        <img
          :src="companyLogoSrc"
          alt="company logo"
          class="w-6 h-6 rounded-full"
        />
        {{ job.company.title }}
      </div>

      <div class="flex items-center gap-1 text-sm font-thin">
        {{ getCompanyRating(job.company.rating) }}
        <Star class="" :color="starIconColor" />
      </div>
    </div>
    <p class="font-semibold">{{ job.title }}</p>
    <div class="flex justify-between">
      <small>{{ formattedLocation }}</small>
      <small class="truncate">{{ job.create_dates.created_at_human }}</small>
    </div>
  </div>
</template>
