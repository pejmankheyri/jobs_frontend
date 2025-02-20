<script setup>
definePageMeta({
  middleware: "auth",
  role: "company",
});

const { t } = useI18n();
const companyStore = useCompanyStore();
const config = useRuntimeConfig();
const router = useRouter();
const localeRoute = useLocaleRoute();
const appToast = useAppToast();

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
    await companyStore.deleteCompany(id, t, appToast);
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

const companyJobsLink = (id) => {
  const route = localeRoute({ name: "company-id-jobs", params: { id } });
  navigateTo(route.fullPath);
};

// Data
const getCompanies = async () => {
  try {
    loading.value = true;
    const response = await useCustomFetch(
      `/users/companies${searchStatus.value}`,
      {
        query: {
          q: search.value,
          page: page.value,
          per_page: pageCount.value,
          sort: sort.value.column,
          order: sort.value.direction,
        },
      }
    );

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
        class="text-xl font-semibold leading-tight text-gray-900 dark:text-white"
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
    </div>

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
          <UTooltip :text="$t('COMPANY_JOBS')">
            <UButton
              icon="i-heroicons-briefcase"
              size="2xs"
              color="indigo"
              variant="outline"
              :ui="{ rounded: 'rounded-full' }"
              @click="companyJobsLink(row.id)"
              square
            />
          </UTooltip>
          <UTooltip :text="$t('EDIT_COMPANY')">
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
          <UTooltip :text="$t('COMPANY_IMAGES')">
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
          <UTooltip :text="$t('COMPANY_LOGO')">
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
          <UTooltip :text="$t('DELETE_COMPANY')">
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
