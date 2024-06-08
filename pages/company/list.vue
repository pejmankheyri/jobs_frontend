<script setup>
definePageMeta({
  middleware: "auth",
  role: "company",
});

const { t } = useI18n();
const authStore = useAuthStore();
const config = useRuntimeConfig();
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
    key: "rating",
    label: t("RATING"),
    sortable: true,
  },
  {
    key: "employes",
    label: t("EMPLOYEES"),
    sortable: true,
  },
  {
    key: "location",
    label: t("LOCATION"),
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

// Actions
const actions = [
  {
    key: "edit",
    label: t("EDIT"),
    icon: "i-heroicons-check",
  },

  {
    key: "view",
    label: t("VIEW"),
    icon: "i-heroicons-arrow-path",
  },

  {
    key: "delete",
    label: t("DELETE"),
    icon: "i-heroicons-trash",
  },
];

const search = ref("");
const selectedStatus = ref([]);
const loading = ref(false);
const companies = ref([]);

const searchStatus = computed(() => {
  if (selectedStatus.value?.length === 0) {
    return "";
  }
});

const resetFilters = () => {
  search.value = "";
  selectedStatus.value = [];
};
import { useAuthStore } from "@/stores/auth";

const user = computed(() => JSON.parse(localStorage.getItem("user")));

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
  getCompanies();
});

onMounted(() => {
  getCompanies();
});

const deleteCompany = async (id) => {
  try {
    loading.value = true;
    await authStore.deleteCompany(id);
    getCompanies();
  } catch (error) {
    console.error(t("ERROR_REMOVING_COMPANY") + ":", error);
  } finally {
    loading.value = false;
  }
};

const editCompanyLink = (id) => {
  const route = localeRoute({ name: "company-id-edit", params: { id } });
  navigateTo(route.fullPath);
};

const companyImagesLink = (id) => {
  const route = localeRoute({ name: "company-id-images", params: { id } });
  navigateTo(route.fullPath);
};

const companyLogoLink = (id) => {
  const route = localeRoute({ name: "company-id-logo", params: { id } });
  navigateTo(route.fullPath);
};

// Data
const getCompanies = async () => {
  try {
    loading.value = true;
    const response = await useFetch(`/users/companies${searchStatus.value}`, {
      query: {
        q: search.value,
        page: page.value,
        per_page: pageCount.value,
        sort: sort.value.column,
        order: sort.value.direction,
      },
    });

    pageTotal.value = response.meta.total;

    companies.value = response.data;
  } catch (error) {
    console.error(t("ERROR_FETCHING_COMPANIES") + ":", error);
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
        class="font-semibold text-xl text-gray-900 dark:text-white leading-tight"
      >
        {{ $t("COMPANIES_LIST") }}
      </h2>
    </template>

    <!-- Filters -->
    <div class="flex items-center justify-between gap-3 px-4 py-3">
      <UInput
        v-model="search"
        icon="i-heroicons-magnifying-glass-20-solid"
        color="indigo"
        :placeholder="$t('SEARCH') + '...'"
      />
    </div>

    <!-- Header and Action buttons -->
    <div class="flex justify-between items-center w-full px-4 py-3">
      <div class="flex items-center gap-1.5">
        <span class="text-sm leading-5">{{ $t("ROWS_PER_PAGE") }}:</span>

        <USelect
          v-model="pageCount"
          :options="[3, 5, 10, 20, 30, 40]"
          color="indigo"
          class="me-2 w-20"
          size="xs"
        />
      </div>
    </div>

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
        <div class="grid grid-cols-2 gap-4">
          <UTooltip text="Edit Company">
            <UButton
              icon="i-heroicons-pencil-square"
              size="2xs"
              color="orange"
              variant="outline"
              :ui="{ rounded: 'rounded-full' }"
              @click="editCompanyLink(row.id)"
              square
            />
          </UTooltip>
          <UTooltip text="Company Images">
            <UButton
              icon="i-heroicons-photo"
              size="2xs"
              color="green"
              variant="outline"
              :ui="{ rounded: 'rounded-full' }"
              @click="companyImagesLink(row.id)"
              square
            />
          </UTooltip>
          <UTooltip text="Company Logo">
            <UButton
              icon="i-heroicons-building-storefront"
              size="2xs"
              color="blue"
              variant="outline"
              :ui="{ rounded: 'rounded-full' }"
              @click="companyLogoLink(row.id)"
              square
            />
          </UTooltip>
          <UTooltip text="Remove Company">
            <UButton
              icon="i-heroicons-trash"
              size="2xs"
              color="red"
              variant="outline"
              :ui="{ rounded: 'rounded-full' }"
              @click="deleteCompany(row.id)"
              square
            />
          </UTooltip>
        </div>
      </template>
    </UTable>

    <!-- Number of rows & Pagination -->
    <template #footer>
      <div class="flex flex-wrap justify-between items-center">
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
