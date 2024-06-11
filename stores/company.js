import { defineStore } from "pinia";
import useFetch from "@/composables/useFetch";
import { useAuthStore } from "@/stores/auth";

export const useCompanyStore = defineStore("company", {
  getters: {},

  actions: {
    async changeLogo(formData, id, t, appToast) {
      try {
        const { data } = await useFetch(`/companies/${id.value}/logo`, {
          method: "POST",
          body: formData,
        });

        this.fetchCompany(id);

        appToast.toastSuccess({
          title: t("LOGO_UPDATED_SUCCESSFULLY"),
          description: t("LOGO_UPDATED_SUCCESSFULLY_DESCRIPTION"),
        });

        return data;
      } catch (e) {
        appToast.toastError({
          title: t("LOGO_UPDATED_ERROR"),
          description: t("LOGO_UPDATED_ERROR_DESCRIPTION"),
        });
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
