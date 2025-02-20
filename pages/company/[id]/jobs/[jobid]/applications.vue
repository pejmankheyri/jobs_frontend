<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";

definePageMeta({
  middleware: "auth",
  role: "company",
});

const { t } = useI18n();
const authStore = useAuthStore();
const config = useRuntimeConfig();
const router = useRouter();
const localeRoute = useLocaleRoute();
const route = useRoute();

const sort = ref({ column: "id", direction: "asc" });

// Columns
const columns = [
  {
    key: "id",
    label: "#",
    sortable: true,
  },
  {
    key: "useravatar",
    label: t("AVATAR"),
    sortable: false,
  },
  {
    key: "message",
    label: t("MESSAGE"),
    sortable: true,
  },
  {
    key: "username",
    label: t("NAME"),
    sortable: true,
  },
  {
    key: "useremail",
    label: t("EMAIL"),
    sortable: true,
  },
  {
    key: "userphone",
    label: t("PHONE"),
    sortable: false,
  },

  {
    key: "create_dates",
    label: t("CREATED_AT"),
    sortable: true,
  },
  {
    key: "usercv",
    label: t("CV"),
    sortable: true,
  },
];

const selectedColumns = ref(columns);
const columnsTable = computed(() =>
  columns.filter((column) => selectedColumns.value.includes(column))
);

const loading = ref(false);
const applications = ref([]);

const user = computed(() => JSON.parse(localStorage.getItem("user")));

// Pagination

onMounted(() => {
  getJobApplications();
});

const editJobLink = (id) => {
  const newRoute = localeRoute({
    name: "company-id-jobs-jobid-edit",
    params: {
      id: route.params.id,
      jobid: id,
    },
  });

  if (newRoute && newRoute.fullPath) {
    navigateTo(newRoute.fullPath);
  } else {
    console.error("Failed to generate route", newRoute);
  }
};

const companyJobsApplications = (id) => {
  const newRoute = localeRoute({
    name: "company-id-jobs-jobid-applications",
    params: { id },
  });

  if (newRoute && newRoute.fullPath) {
    navigateTo(newRoute.fullPath);
  } else {
    console.error("Failed to generate route", newRoute);
  }
};

// Data
const getJobApplications = async () => {
  try {
    loading.value = true;
    const response = await useCustomFetch(
      `/jobs/${route.params.jobid}/applicants`,
      {}
    );

    applications.value = response.data;
  } catch (error) {
    console.error(t("ERROR_FETCHING_COMPANIES") + ":", error);
  } finally {
    loading.value = false;
  }
};

const getUserAvatar = (avatar) => {
  return config.public.apiBaseUrl + avatar;
};
</script>

<template>
  <div class="">
    <UButton
      @click="
        navigateTo(
          localePath({
            name: 'company-id-jobs',
            params: {
              id: route.params.id,
            },
          })
        )
      "
      color="indigo"
      variant="outline"
      icon="i-heroicons-arrow-left"
      class="mt-8"
    >
      {{ $t("BACK") }}
    </UButton>

    <UCard
      class="w-full"
      :ui="{
        base: '',
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-4 py-5' },
        body: {
          padding: '',
          base: 'divide-y divide-gray-200 dark:divide-gray-700',
        },
        footer: { padding: 'p-4' },
      }"
    >
      <template #header>
        <h2
          class="text-xl font-semibold leading-tight text-gray-900 dark:text-white"
        >
          {{ $t("JOBS_APPLICATIONS") }}
        </h2>
      </template>

      <!-- Table -->
      <UTable
        v-model:sort="sort"
        :rows="applications"
        :columns="columnsTable"
        :loading="loading"
        :progress="{ color: 'indigo', animation: 'carousel' }"
        sort-asc-icon="i-heroicons-arrow-up"
        sort-desc-icon="i-heroicons-arrow-down"
        sort-mode="manual"
        class="w-full"
        :ui="{
          td: { base: 'max-w-[0] truncate' },
          default: { checkbox: { color: 'indigo' } },
        }"
      >
        <template #location-data="{ row }">
          <div v-for="value in row.location" :key="value.id">
            <UTooltip
              :text="value.country + ',' + value.state + ',' + value.city"
            >
              <span>{{
                value.country + "," + value.state + "," + value.city
              }}</span>
            </UTooltip>
          </div>
        </template>

        <template #useravatar-data="{ row }">
          <UAvatar :src="getUserAvatar(row.user.avatar)" size="md" />
        </template>
        <template #username-data="{ row }">
          {{ row.user.name }}
        </template>
        <template #useremail-data="{ row }">
          {{ row.user.email }}
        </template>
        <template #userphone-data="{ row }">
          {{ row.user.phone }}
        </template>

        <template #create_dates-data="{ row }">
          {{ row.create_dates.created_at_human }}
        </template>
        <template #usercv-data="{ row }">
          <a
            :href="`${config.public.apiBaseUrl}${row.user.cv}`"
            target="_blank"
            class="text-indigo-600"
            >{{ $t("DOWNLOAD_CV") }}</a
          >
        </template>
      </UTable>
    </UCard>
  </div>
</template>
