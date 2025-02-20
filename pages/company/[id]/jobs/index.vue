<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useCompanyStore } from "@/stores/company";

definePageMeta({
  middleware: "auth",
  role: "company",
});

const { t } = useI18n();
const companyStore = useCompanyStore();
const config = useRuntimeConfig();
const router = useRouter();
const localeRoute = useLocaleRoute();
const route = useRoute();
const appToast = useAppToast();

const sort = ref({ column: "id", direction: "asc" });

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

const user = computed(() => JSON.parse(localStorage.getItem("user")));

// Pagination

onMounted(() => {
  getCompanyJobs();
});

const deleteJob = async (id) => {
  try {
    loading.value = true;
    await companyStore.deleteJob(id, t, appToast);
    getCompanyJobs();
  } catch (error) {
    console.error(t("JOB_DELETED_ERROR") + ":", error);
  } finally {
    loading.value = false;
  }
};

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

// Data
const getCompanyJobs = async () => {
  try {
    loading.value = true;
    const response = await useCustomFetch(`/companies/${route.params.id}`, {});

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
