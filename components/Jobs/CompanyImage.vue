<script setup>
const props = defineProps({
  image: Object,
});

const config = useRuntimeConfig();
const isOpen = ref(false);
const imageSrc = ref("");

const openImageModal = () => {
  imageSrc.value = config.public.apiBaseUrl + props.image.path;
  isOpen.value = true;
};
</script>

<template>
  <div>
    <img
      :src="config.public.apiBaseUrl + image.path"
      alt="company image"
      class="object-cover w-full h-48 rounded-lg cursor-pointer"
      @click="openImageModal()"
    />

    <UModal v-model="isOpen">
      <div class="p-4">
        <img
          :src="imageSrc"
          alt="company image"
          class="w-full h-full rounded-lg"
        />
      </div>
    </UModal>
  </div>
</template>
