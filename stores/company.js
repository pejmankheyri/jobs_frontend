import { defineStore } from "pinia";
import useFetch from "@/composables/useFetch";
import { useAuthStore } from "@/stores/auth";

export const useCompanyStore = defineStore("company", {
  getters: {},

  actions: {
    async changeLogo(formData, id, $toast) {
      try {
        const { data } = await useFetch(`/companies/${id.value}/logo`, {
          method: "POST",
          body: formData,
        });

        this.fetchCompany(id);

        $toast.success("Logo updated successfully");

        return data;
      } catch (e) {
        $toast.error("Error updating logo");
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
