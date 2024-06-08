<script setup>
const { locale, setLocale } = useI18n();

const lang = ref("en");

const langOptions = [
  { label: "EN", value: "en" },
  { label: "FR", value: "fr" },
  { label: "DE", value: "de" },
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
      color="indigo"
      class="w-full"
      v-model="lang"
    />
  </div>
</template>
