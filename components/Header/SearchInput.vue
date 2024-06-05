<script setup>
import { ref, defineEmits } from "vue";

const props = defineProps({
  placeholder: String,
  classItems: String,
});
const emit = defineEmits(["update:query"]);

const query = ref("");

const onInput = () => {
  if (query.value.trim().length < 3) return;
  emit("update:query", query.value.trim());
};
</script>
<template>
  <div class="flex place-items-center">
    <input
      v-model="query"
      @input="onInput"
      @keydown.enter="onInput"
      @keydown.esc="query = ''"
      @click="onInput"
      type="text"
      :placeholder="placeholder"
      class="search-input-field w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-400 transition duration-300 ease-in-out"
      :class="classItems"
    />
  </div>
</template>
