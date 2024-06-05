<template>
  <div class="md:flex hidden">
    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      size="lg"
      color="indigo"
      :trailing="false"
      placeholder="Find your job"
      class="w-3/5"
      :ui="{ rounded: 'rounded-r-none rounded-l-xl' }"
    />
    <UInput
      icon="i-heroicons-map-pin-20-solid"
      size="lg"
      color="indigo"
      :trailing="false"
      placeholder="Location"
      class="w-2/5"
      :ui="{ rounded: 'rounded-l-none rounded-r-xl' }"
    />
  </div>
</template>
