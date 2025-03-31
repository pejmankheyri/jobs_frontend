<script setup>
const { t } = useI18n();
</script>

<template>
  <div class="flex items-center gap-2">
    <ProjectInfo />
    <NuxtLink :to="localePath('/')" class="text-xl font-bold">{{
      $t("SAMPLE_JOB_BOARD")
    }}</NuxtLink>
  </div>
</template>
