import { defineStore } from "pinia";
import useCustomFetch from "@/composables/useCustomFetch";
import { useAuthStore } from "@/stores/auth";

export const useCompanyStore = defineStore("company", {
  getters: {},

  actions: {
    async changeLogo(formData, id, t, appToast) {
      try {
        const { data } = await useCustomFetch(`/companies/${id}/logo`, {
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
        const { data } = await useCustomFetch(`/companies/${id}`, {
          method: "GET",
        });

        return data;
      } catch (e) {
        console.log(e);
      }
    },

    async editJob(state, id, t, localeRoute, appToast) {
      try {
        const { data } = await useCustomFetch(`/jobs/${id}`, {
          method: "PUT",
          body: {
            title: state.title,
            description: state.description,
            tags: state.tags,
          },
        });

        appToast.toastSuccess({
          title: t("JOB_UPDATED_SUCCESSFULLY"),
          description: t("JOB_UPDATED_SUCCESSFULLY_DESCRIPTION"),
        });

        return data;
      } catch (e) {
        appToast.toastError({
          title: t("JOB_UPDATED_ERROR"),
          description: t("JOB_UPDATED_ERROR_DESCRIPTION"),
        });
      }
    },

    async getJob(id) {
      try {
        const { data } = await useCustomFetch(`/jobs/${id}`, {
          method: "GET",
        });

        return data;
      } catch (e) {
        console.log(e);
      }
    },

    async deleteJob(id, t, appToast) {
      try {
        await useCustomFetch(`/jobs/${id}`, {
          method: "DELETE",
        });

        appToast.toastSuccess({
          title: t("JOB_DELETED_SUCCESSFULLY"),
          description: t("JOB_DELETED_SUCCESSFULLY_DESCRIPTION"),
        });
      } catch (e) {
        appToast.toastError({
          title: t("JOB_DELETED_ERROR"),
          description: t("JOB_DELETED_ERROR_DESCRIPTION"),
        });
      }
    },

    async updateCompany(state, id, t, appToast) {
      try {
        await useCustomFetch(`/companies/${id}`, {
          method: "PUT",
          body: {
            title: state.title,
            description: state.description,
            website: state.website,
            rating: state.rating,
            employes: state.employes,
          },
        });

        appToast.toastSuccess({
          title: t("COMPANY_UPDATED_SUCCESSFULLY"),
          description: t("COMPANY_UPDATED_SUCCESSFULLY_DESCRIPTION"),
        });
      } catch (e) {
        appToast.toastError({
          title: t("COMPANY_UPDATED_ERROR"),
          description: t("COMPANY_UPDATED_ERROR_DESCRIPTION"),
        });
      }
    },

    async deleteCompany(id, t, appToast) {
      try {
        await useCustomFetch(`/companies/${id}`, {
          method: "DELETE",
        });

        appToast.toastSuccess({
          title: t("COMPANY_DELETED_SUCCESSFULLY"),
          description: t("COMPANY_DELETED_SUCCESSFULLY_DESCRIPTION"),
        });
      } catch (e) {
        appToast.toastError({
          title: t("COMPANY_DELETED_ERROR"),
          description: t("COMPANY_DELETED_ERROR_DESCRIPTION"),
        });
      }
    },

    async removeImage(id, t, appToast) {
      try {
        await useCustomFetch(`/companies/image/${id}`, {
          method: "DELETE",
        });

        appToast.toastSuccess({
          title: t("LOGO_REMOVED_SUCCESSFULLY"),
          description: t("LOGO_REMOVED_SUCCESSFULLY_DESCRIPTION"),
        });
      } catch (e) {
        appToast.toastError({
          title: t("LOGO_REMOVED_ERROR"),
          description: t("LOGO_REMOVED_ERROR_DESCRIPTION"),
        });
      }
    },

    async addImage(formData, id, t, appToast) {
      try {
        await useCustomFetch(`/companies/${id}/images`, {
          method: "POST",
          body: formData,
        });

        appToast.toastSuccess({
          title: t("IMAGE_ADDED_SUCCESSFULLY"),
          description: t("IMAGE_ADDED_SUCCESSFULLY_DESCRIPTION"),
        });
      } catch (e) {
        appToast.toastError({
          title: t("IMAGE_ADDED_ERROR"),
          description: t("IMAGE_ADDED_ERROR_DESCRIPTION"),
        });
      }
    },
  },
});
