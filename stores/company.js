import { defineStore } from "pinia";
import useFetch from "@/composables/useFetch";
import { useAuthStore } from "@/stores/auth";

export const useCompanyStore = defineStore("company", {
  getters: {},

  actions: {
    async changeLogo(formData, id, $toast, t) {
      try {
        const { data } = await useFetch(`/companies/${id.value}/logo`, {
          method: "POST",
          body: formData,
        });

        this.fetchCompany(id);

        $toast.success(t("LOGO_UPDATED_SUCCESSFULLY"));

        return data;
      } catch (e) {
        $toast.error(t("LOGO_UPDATED_ERROR"));
      }
    },

    async fetchCompany(id) {
      try {
        const { data } = await useFetch(`/companies/${id.value}`, {
          method: "GET",
        });

        return data;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
