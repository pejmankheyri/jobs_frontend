<script setup>
import { ref } from "vue";

const { t, localePath } = useI18n();

const localeRoute = useLocaleRoute();

const props = defineProps({
  results: Array,
  visible: Boolean,
  loading: Boolean,
  type: String,
});

const emit = defineEmits(["selectedValue"]);

const resultsBox = ref(null);
</script>
<template>
  <div
    v-if="results.length > 0 && visible"
    class="absolute top-0 z-10 text-black border rounded mt-11 bg-slate-100"
    :class="
      type === 'jobs'
        ? 'w-[320px] ml-[30px]'
        : 'w-[220px] mr-[30px] float-right'
    "
  >
    <div v-if="loading" class="px-2 py-4 cursor-pointer hover:bg-slate-200">
      <h3>{{ $t("LOADING") }}</h3>
    </div>

    <div
      v-for="result in results"
      :key="result.id"
      class="px-2 py-4 border-b cursor-pointer hover:bg-slate-200"
      @click="emit('selectedValue', { type, result })"
    >
      <h3>
        {{
          type === "jobs"
            ? result.title
            : result.country + ", " + result.state + ", " + result.city
        }}
      </h3>
    </div>
  </div>
</template>
