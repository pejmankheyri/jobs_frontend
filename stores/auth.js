import { defineStore } from "pinia";
import useFetch from "@/composables/useFetch";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.user && state.user.role === "admin",
    isCompany: (state) => state.user && state.user.role === "company",
    isUser: (state) => state.user && state.user.role === "user",
    userMe: (state) => JSON.parse(state.user),
    userRole: (state) => (state.user ? state.user.role : null),
  },

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    async login(email, password, t, localeRoute, appToast) {
      try {
        const data = await useFetch(`/login`, {
          method: "POST",
          body: { email, password },
        });

        this.setToken(data.token);
        this.setUser(data.user);

        switch (data.user.role) {
          case "admin":
          // return navigateTo("/admin/dashboard");
          case "company":
          // await this.fetchUser();

          // return navigateTo("/company/dashboard");
          case "user":
          // return navigateTo("/user/dashboard");
          default:
          // return navigateTo("/");
        }

        appToast.toastSuccess({
          title: t("LOGIN_SUCCESS"),
          description: t("LOGIN_SUCCESS_DESCRIPTION"),
        });

        navigateTo(localeRoute("index").fullPath);
      } catch (e) {
        appToast.toastError({
          title: t("LOGIN_ERROR"),
          description: t("LOGIN_ERROR_DESCRIPTION"),
        });
      }
    },

    async logout(t, localeRoute, appToast) {
      await useFetch(`/logout`, {
        method: "POST",
      });
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigateTo(localeRoute({ name: "login" }).fullPath);

      appToast.toastSuccess({
        title: t("LOGOUT_SUCCESS"),
        description: t("LOGOUT_SUCCESS_DESCRIPTION"),
      });
    },

    async register(
      name,
      email,
      phone,
      password,
      password_confirmation,
      role,
      t,
      localeRoute,
      appToast
    ) {
      try {
        await useFetch(`/users`, {
          method: "POST",
          body: {
            name: name,
            email: email,
            phone: phone,
            password: password,
            password_confirmation: password_confirmation,
            role_id: role === "Company" ? 3 : 2,
          },
        });

        appToast.toastSuccess({
          title: t("REGISTER_SUCCESS"),
          description: t("REGISTER_SUCCESS_DESCRIPTION"),
        });

        await this.login(email, password, t, localeRoute, appToast);
      } catch (e) {
        appToast.toastError({
          title: t("REGISTER_ERROR"),
          description: t("REGISTER_ERROR_DESCRIPTION"),
        });
      }
    },

    async fetchUser() {
      try {
        const { data } = await useFetch(`/users/me`);

        this.setUser(data);
      } catch (e) {
        this.logout();
      }
    },

    async updateProfile(name, phone, t, appToast) {
      try {
        const { data } = await useFetch(`/users/${JSON.parse(this.user).id}`, {
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

    async updatePassword(vars, t, appToast) {
      try {
        await useFetch(`/users/change-password`, {
          method: "POST",
          body: {
            current_password: vars.oldPassword,
            new_password: vars.newPassword,
            new_password_confirmation: vars.confirmPassword,
          },
        });

        appToast.toastSuccess({
          title: t("PASSWORD_UPDATED_SUCCESSFULLY"),
          description: t("PASSWORD_UPDATED_SUCCESSFULLY_DESCRIPTION"),
        });
      } catch (e) {
        appToast.toastError({
          title: t("PASSWORD_UPDATED_ERROR"),
          description: t("PASSWORD_UPDATED_ERROR_DESCRIPTION"),
        });
      }
    },

    async changeAvatar(formData, t, appToast) {
      try {
        const { avatar } = await useFetch(`/users/avatar`, {
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
        const { cv } = await useFetch(`/users/cv`, {
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
  },
});
