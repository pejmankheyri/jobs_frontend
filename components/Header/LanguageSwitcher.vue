<script setup>
const { locale, setLocale } = useI18n();

const lang = ref("en");

const langOptions = [
  { label: "EN", value: "en" },
  { label: "FR", value: "fr" },
];

onMounted(() => {
  lang.value = locale.value;
});

watch(lang, (newVal) => {
  setLocale(newVal);
});
</script>

<template>
  <div>
    <USelect
      icon="i-heroicons-globe-alt"
      :options="langOptions"
      color="black"
      :ui="{
        base: 'border border-black !ring-transparent focus:border-black dark:border-gray-400 dark:focus:border-gray-400',
      }"
      class="w-full"
      v-model="lang"
    />
  </div>
</template>
