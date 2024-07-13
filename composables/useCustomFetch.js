import { useAuthStore } from "~/stores/auth";

export default function useCustomFetch(url, options = {}) {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${authStore.token}`,
    Accept: "application/json",
    contentType: "application/json",
  };

  return $fetch(url, {
    baseURL: config.public.apiBaseUrl.concat(config.public.apiVersion),
    headers,
    ...options,
  });
}
