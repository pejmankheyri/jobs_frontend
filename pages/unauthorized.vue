<script setup>
definePageMeta({
  layout: "error",
});

const { t } = useI18n();
</script>

<template>
  <div class="container grid h-screen text-center place-items-center">
    <div class="flex flex-col">
      <h1>{{ $t("UNAUTHORIZED_ACCESS") }}</h1>
      <p>{{ $t("UNAUTHORIZED_MESSAGE") }}</p>
      <div>
        {{ $t("GO_BACK_TO") }}
        <nuxt-link class="text-black" :to="localePath('/')">{{
          $t("HOME_PAGE")
        }}</nuxt-link>
      </div>
    </div>
  </div>
</template>
