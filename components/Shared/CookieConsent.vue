<script setup>
import { ref, onMounted } from "vue";

const show = ref(false);

const acceptCookies = () => {
  localStorage.setItem("cookiesAccepted", "true");
  show.value = false;
};

onMounted(() => {
  if (!localStorage.getItem("cookiesAccepted")) {
    show.value = true;
  }
});
</script>

<template>
  <div
    v-if="show"
    class="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between p-4 text-white bg-gray-800"
  >
    <div>
      <p>
        {{ $t("THIS_WEBSITE_USES_COOKIES") }}
        <span class="underline">{{ $t("LEARN_MORE") }}</span>
      </p>
    </div>
    <div>
      <UButton @click="acceptCookies" color="black" variant="outline">
        {{ $t("ALLOW_COOKIES") }}
      </UButton>
    </div>
  </div>
</template>
