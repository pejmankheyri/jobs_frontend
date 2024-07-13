import { defineStore } from "pinia";
import useCustomFetch from "@/composables/useCustomFetch";
import { useAuthStore } from "@/stores/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    jobs: JSON.parse(localStorage.getItem("jobs")) || null,
  }),

  getters: {},

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setJobs(jobs) {
      this.jobs = jobs;
      localStorage.setItem("jobs", JSON.stringify(jobs));
    },
    async updateProfile(name, phone, t, appToast) {
      try {
        const { data } = await useCustomFetch(`/users`, {
          method: "PUT",
          body: {
            name: name,
            phone: phone,
          },
        });

        this.setUser(data);

        appToast.toastSuccess({
          title: t("PROFILE_UPDATED_SUCCESSFULLY"),
          description: t("PROFILE_UPDATED_SUCCESSFULLY_DESCRIPTION"),
        });
      } catch (e) {
        appToast.toastError({
          title: t("PROFILE_UPDATED_ERROR"),
          description: t("PROFILE_UPDATED_ERROR_DESCRIPTION"),
        });
      }
    },

    async changeAvatar(formData, t, appToast) {
      try {
        const { avatar } = await useCustomFetch(`/users/avatar`, {
          method: "POST",
          body: formData,
        });

        this.user.avatar = avatar;

        localStorage.setItem("user", JSON.stringify(this.user));

        appToast.toastSuccess({
          title: t("AVATAR_UPDATED_SUCCESSFULLY"),
          description: t("AVATAR_UPDATED_SUCCESSFULLY_DESCRIPTION"),
        });
      } catch (e) {
        appToast.toastError({
          title: t("AVATAR_UPDATED_ERROR"),
          description: t("AVATAR_UPDATED_ERROR_DESCRIPTION"),
        });
      }
    },

    async changeCV(formData, t, appToast) {
      try {
        const { cv } = await useCustomFetch(`/users/cv`, {
          method: "POST",
          body: formData,
        });

        this.user.cv = cv;

        localStorage.setItem("user", JSON.stringify(this.user));

        appToast.toastSuccess({
          title: t("CV_UPDATED_SUCCESSFULLY"),
          description: t("CV_UPDATED_SUCCESSFULLY_DESCRIPTION"),
        });
      } catch (e) {
        appToast.toastError({
          title: t("CV_UPDATED_ERROR"),
          description: t("CV_UPDATED_ERROR_DESCRIPTION"),
        });
      }
    },

    async fetchAppliedJobs() {
      try {
        const { data } = await useCustomFetch(`/users/jobs?per_page=50`, {
          method: "GET",
        });

        this.setJobs(data);
      } catch (e) {
        console.log(e);
      }
    },
  },
});
