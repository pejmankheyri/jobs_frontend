<script setup>
definePageMeta({
  middleware: "auth",
  role: "company",
});

const { t } = useI18n();
const authStore = useAuthStore();
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const localeRoute = useLocaleRoute();

// Columns
const columns = [
  {
    key: "id",
    label: "#",
    sortable: true,
  },
  {
    key: "title",
    label: t("TITLE"),
    sortable: true,
  },
  {
    key: "description",
    label: t("DESCRIPTION"),
    sortable: false,
  },

  {
    key: "create_dates",
    label: t("CREATED_AT"),
    sortable: true,
  },
  ,
  {
    key: "actions",
    label: t("ACTIONS"),
    sortable: false,
  },
];

const selectedColumns = ref(columns);
const columnsTable = computed(() =>
  columns.filter((column) => selectedColumns.value.includes(column))
);

const loading = ref(false);
const companies = ref([]);

import { useAuthStore } from "@/stores/auth";

const user = computed(() => JSON.parse(localStorage.getItem("user")));

// Pagination

onMounted(() => {
  getCompanyJobs();
});

const deleteJob = async (id) => {
  try {
    loading.value = true;
    await authStore.deleteJob(id);
    getCompanyJobs();
  } catch (error) {
    console.error(t("ERROR_REMOVING_COMPANY") + ":", error);
  } finally {
    loading.value = false;
  }
};

const editJobLink = (id) => {
  console.log("id", id);
  console.log("route.params.id", route);
  const route = localeRoute({
    name: "company-id-jobs-job-id-edit",
    params: {
      id: route.params.id,
      "job-id": id,
    },
  });
  navigateTo(route.fullPath);
};

const companyJobsApplications = (id) => {
  const route = localeRoute({
    name: "company-id-jobs-applications",
    params: { id },
  });
  navigateTo(route.fullPath);
};

// Data
const getCompanyJobs = async () => {
  try {
    loading.value = true;
    const response = await useFetch(`/companies/${route.params.id}`, {});

    companies.value = response.data.jobs;
  } catch (error) {
    console.error(t("ERROR_FETCHING_COMPANIES") + ":", error);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="">
    <UButton
      @click="
        navigateTo(
          localePath({
            name: 'company-list',
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
          {{ $t("JOBS_LIST") }}
        </h2>
      </template>

      <!-- Table -->
      <UTable
        v-model:sort="sort"
        :rows="companies"
        :columns="columnsTable"
        :loading="loading"
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

        <template #create_dates-data="{ row }">
          {{ row.create_dates.created_at_human }}
        </template>

        <template #actions-data="{ row }">
          <div class="grid grid-cols-3 gap-4">
            <UTooltip text="Applicants">
              <UButton
                icon="i-heroicons-briefcase"
                size="2xs"
                color="indigo"
                variant="outline"
                :ui="{ rounded: 'rounded-full' }"
                @click="companyJobsApplications(row.id)"
                square
              />
            </UTooltip>
            <UTooltip text="Edit Job">
              <UButton
                icon="i-heroicons-pencil-square"
                size="2xs"
                color="orange"
                variant="outline"
                :ui="{ rounded: 'rounded-full' }"
                @click="editJobLink(row.id)"
                square
              />
            </UTooltip>

            <UTooltip text="Remove Job">
              <UButton
                icon="i-heroicons-trash"
                size="2xs"
                color="red"
                variant="outline"
                :ui="{ rounded: 'rounded-full' }"
                @click="deleteJob(row.id)"
                square
              />
            </UTooltip>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
