<script setup>
import { ref } from "vue";

const props = defineProps({
  placeholder: String,
  classItems: String,
  type: String,
  selectedValue: String,
});
const emit = defineEmits(["update:query"]);

const query = ref("");

// watch selectedValue prop and update query value
watch(
  () => props.selectedValue,
  (value) => {
    query.value = value;
  }
);

const onInput = () => {
  if (query.value.trim().length < 3) return;
  emit("update:query", query.value.trim());
};
</script>
<template>
  <div class="flex place-items-center">
    <div class="absolute ml-3">
      <Search v-if="type === 'jobs'" />
      <Location v-else />
    </div>
    <input
      v-model="query"
      @input="onInput"
      @keydown.enter="onInput"
      @keydown.esc="query = ''"
      @click="onInput"
      type="text"
      :placeholder="placeholder"
      class="w-full p-1 pl-10 transition duration-300 ease-in-out border border-black dark:border-gray-400 focus:outline-none focus:border-black"
      :class="
        classItems + ' ' + (type === 'jobs' ? 'rounded-l-md' : 'rounded-r-md')
      "
    />
  </div>
</template>
