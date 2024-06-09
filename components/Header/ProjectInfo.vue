<script setup>
const isOpen = ref(false);
</script>

<template>
  <div>
    <UTooltip :text="$t('CLICK_TO_SEE_PROJECT_DETAILS')">
      <Info @click="isOpen = true" class="cursor-pointer" color="red" />
    </UTooltip>

    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {{ $t("PROJECT_TECHNICAL_DETAILS") }}
            </h3>
            <UButton
              color="indigo"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        {{ $t("BACKEND") }}
        <hr class="pb-4" />
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="flex items-center gap-2 pb-2">
            <img
              src="https://img.shields.io/badge/-Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white"
              alt="Laravel"
              class="rounded"
            />
            <img src="https://img.shields.io/badge/package-v11.9.2-ef3b2c" />
          </div>
          <div class="flex items-center gap-2 pb-2">
            <img
              src="https://img.shields.io/badge/-PHP-7a85b9?style=for-the-badge&logo=php&logoColor=white"
              alt="PHP"
              class="rounded"
            />
            <img src="https://img.shields.io/badge/package-v8.2.19-7a85b9" />
          </div>
          <div class="flex items-center gap-2 pb-2">
            <img
              src="https://img.shields.io/badge/-Mysql-3e6f93?style=for-the-badge&logo=mysql&logoColor=white"
              alt="Mysql"
              class="rounded"
            />
            <img src="https://img.shields.io/badge/package-v8.0.36-3e6f93" />
          </div>

          <div class="flex items-center gap-2 pb-2">
            <img
              src="https://img.shields.io/badge/-Ubuntu-e9541f?style=for-the-badge&logo=ubuntu&logoColor=white"
              alt="Ubuntu"
              class="rounded"
            />
            <img src="https://img.shields.io/badge/package-v22.4.1-e9541f" />
          </div>
          <div class="flex items-center gap-2 pb-2">
            <img
              src="https://img.shields.io/badge/-Nginx-009900?style=for-the-badge&logo=nginx&logoColor=white"
              alt="Nginx"
              class="rounded"
            />
            <img src="https://img.shields.io/badge/package-v1.18.0-009900" />
          </div>
          <div class="flex items-center gap-2 pb-2">
            <img
              src="https://img.shields.io/badge/-Redis-ff4437?style=for-the-badge&logo=redis&logoColor=white"
              alt="Redis"
              class="rounded"
            />
            <img src="https://img.shields.io/badge/package-v7.2.3-ff4437" />
          </div>
        </div>
        {{ $t("FRONTEND") }}
        <hr class="pb-4" />
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="flex items-center gap-2 pb-2">
            <img
              src="https://img.shields.io/badge/-Nuxt.js-4FC08D?style=for-the-badge&logo=nuxt.js&logoColor=white"
              alt="Nuxt.js"
              class="rounded"
            />
            <img src="https://img.shields.io/badge/package-v3.11.2-00dc83" />
          </div>
          <div class="flex items-center gap-2 pb-2">
            <img
              src="https://img.shields.io/badge/-Vue.js-42b883?style=for-the-badge&logo=vue.js&logoColor=white"
              alt="Vue.js"
              class="rounded"
            />
            <img src="https://img.shields.io/badge/package-v3.4.27-42b883" />
          </div>
          <div class="flex items-center gap-2 pb-2">
            <img
              src="https://img.shields.io/badge/-Tailwind-3abdf7?style=for-the-badge&logo=tailwindcss&logoColor=white"
              alt="Tailwind"
              class="rounded"
            />
            <img src="https://img.shields.io/badge/package-v3.4.3-3abdf7" />
          </div>
        </div>
        {{ $t("SOURCE_CODES") }}
        <hr class="pb-4" />
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="flex items-center gap-2 pb-2 cursor-pointer">
            <a href="https://github.com/pejmankheyri/jobs_api" target="_blank">
              <img
                src="https://img.shields.io/badge/-Github Backend-FF2D20?style=for-the-badge&logo=github&logoColor=white"
                alt="Github Backend"
                class="rounded"
              />
            </a>
          </div>
          <div class="flex items-center gap-2 pb-2 cursor-pointer">
            <a
              href="https://github.com/pejmankheyri/jobs_frontend"
              target="_blank"
            >
              <img
                src="https://img.shields.io/badge/-Github Frontend-4FC08D?style=for-the-badge&logo=github&logoColor=white"
                alt="Github Frontend"
                class="rounded"
              />
            </a>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
