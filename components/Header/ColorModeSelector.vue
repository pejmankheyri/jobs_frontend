<script setup>
const showNextModelLabel = ref(false);
const colorMode = useColorMode();
const modes = ["system", "light", "dark"];
const nextModeIcons = {
  system: "🌓",
  light: "🌕",
  dark: "🌑",
};
const nextMode = computed(() => {
  const currentModeIndex = modes.indexOf(colorMode.preference);
  let nextModeIndex = null;
  if (currentModeIndex + 1 === modes.length) {
    nextModeIndex = 0;
  } else {
    nextModeIndex = currentModeIndex + 1;
  }
  return modes[nextModeIndex];
});
const nextModeIcon = computed(() => nextModeIcons[nextMode.value]);
const toggleMode = () => (colorMode.preference = nextMode.value);
</script>

<template>
  <div class="flex space-x-2 items-center">
    <UTooltip :text="$t('CHANGE_MODE_TO') + ' ' + nextMode" placement="bottom">
      <button @click="toggleMode" class="px-2 py-1">
        {{ nextModeIcon }}
      </button>
    </UTooltip>
  </div>
</template>
