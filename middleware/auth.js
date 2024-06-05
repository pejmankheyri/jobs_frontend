import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  console.log("authStore.isLoggedIn");

  if (!authStore.isLoggedIn) {
    console.log("not logged in");
    return navigateTo("/login");
  }
});
