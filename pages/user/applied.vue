<script setup>
definePageMeta({
  middleware: "auth",
  role: "user",
});

const { t } = useI18n();

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
    key: "completed",
    label: t("STATUS"),
    sortable: false,
  },
];

const selectedColumns = ref(columns);
const columnsTable = computed(() =>
  columns.filter((column) => selectedColumns.value.includes(column))
);

// Selected Rows
const selectedRows = ref([]);

function select(row) {
  const index = selectedRows.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selectedRows.value.push(row);
  } else {
    selectedRows.value.splice(index, 1);
  }
}

// Filters
const statusOptions = [
  {
    key: "applied",
    label: t("APPLIED"),
    value: true,
  },
];

const search = ref("");
const selectedStatus = ref([]);
const loading = ref(false);
const jobs = ref([]);

const searchStatus = computed(() => {
  if (selectedStatus.value?.length === 0) {
    return "";
  }

  if (selectedStatus?.value?.length > 1) {
    return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`;
  }

  return `?completed=${selectedStatus.value[0].value}`;
});

const resetFilters = () => {
  search.value = "";
  selectedStatus.value = [];
};
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const user = computed(() => JSON.parse(localStorage.getItem("user")));

const config = useRuntimeConfig();

// Pagination
const sort = ref({ column: "id", direction: "asc" });
const page = ref(1);
const pageCount = ref(10);
const pageTotal = ref(200); // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value)
);

// watch for query changes
watch([page, pageCount, sort, search], () => {
  getJobs();
});

onMounted(() => {
  getJobs();
});

// Data
const getJobs = async () => {
  try {
    loading.value = true;
    const response = await useCustomFetch(`/users/jobs${searchStatus.value}`, {
      query: {
        q: search.value,
        page: page.value,
        per_page: pageCount.value,
        sort: sort.value.column,
        order: sort.value.direction,
      },
    });

    pageTotal.value = response.meta.total;

    jobs.value = response.data;
  } catch (error) {
    console.error(t("ERROR_FETCHING_JOBS") + ":", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
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
        {{ $t("APPLIED_JOBS") }}
      </h2>
    </template>

    <!-- Filters -->
    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <UInput
        v-model="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        color="indigo"
        placeholder="Search..."
      />

      <USelectMenu
        v-model="selectedStatus"
        :options="statusOptions"
        multiple
        color="indigo"
        placeholder="Status"
        class="w-40"
      />
    </div>

    <!-- Header and Action buttons -->
    <div class="flex items-center justify-between w-full px-4 py-3">
      <div class="flex items-center gap-1.5">
        <span class="text-sm leading-5">{{ $t("ROWS_PER_PAGE") }}:</span>

        <USelect
          v-model="pageCount"
          :options="[3, 5, 10, 20, 30, 40]"
          color="indigo"
          class="w-20 me-2"
          size="xs"
        />
      </div>

      <div class="flex gap-1.5 items-center">
        <USelectMenu v-model="selectedColumns" :options="columns" multiple>
          <UButton icon="i-heroicons-view-columns" color="indigo" size="xs">
            {{ $t("COLUMNS") }}
          </UButton>
        </USelectMenu>
      </div>
    </div>

    <!-- Table -->
    <UTable
      v-model="selectedRows"
      v-model:sort="sort"
      :rows="jobs"
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
      @select="select"
    >
      <template #completed-data="{}">
        <UBadge
          size="xs"
          :label="$t('APPLIED')"
          color="emerald"
          variant="subtle"
        />
      </template>
    </UTable>

    <!-- Number of rows & Pagination -->
    <template #footer>
      <div class="flex flex-wrap items-center justify-between">
        <div>
          <span class="text-sm leading-5">
            {{ $t("SHOWING") }}
            <span class="font-medium">{{ pageFrom }}</span>
            {{ $t("TO") }}
            <span class="font-medium">{{ pageTo }}</span>
            {{ $t("OF") }}
            <span class="font-medium">{{ pageTotal }}</span>
            {{ $t("ENTRIES") }}
          </span>
        </div>

        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="pageTotal"
          :ui="{
            wrapper: 'flex items-center gap-1',
            rounded: '!rounded-full min-w-[32px] justify-center',
            default: {
              activeButton: {
                variant: 'outline',
                color: 'indigo',
              },
            },
          }"
        />
      </div>
    </template>
  </UCard>
</template>
