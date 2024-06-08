<script setup>
definePageMeta({
  layout: "error",
});

const { t } = useI18n();
</script>

<template>
  <div class="container text-center grid h-screen place-items-center">
    <div class="flex flex-col">
      <h1>{{ $t("UNAUTHORIZED_ACCESS") }}</h1>
      <p>{{ $t("UNAUTHORIZED_MESSAGE") }}</p>
      <div>
        {{ $t("GO_BACK_TO") }}
        <nuxt-link class="text-indigo-400" :to="localePath('/')">{{
          $t("HOME_PAGE")
        }}</nuxt-link>
      </div>
    </div>
  </div>
</template>
