import { defineStore } from "pinia";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    async login(email, password, router, $toast) {
      try {
        const data = await $fetch(
          `${config.public.apiBaseUrl}${config.public.apiVersion}/login`,
          {
            method: "POST",
            body: { email, password },
          }
        );

        this.token = data.token;
        this.user = data.user;

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        $toast.success("Logged in successfully");

        navigateTo("/");
      } catch (e) {
        $toast.error("Error logging in");
      }
    },

    async logout($toast) {
      await $fetch(
        `${config.public.apiBaseUrl}${config.public.apiVersion}/logout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: "application/json",
          },
        }
      );
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigateTo("/login");

      $toast.success("Logged out successfully");
    },

    async register(
      name,
      email,
      password,
      password_confirmation,
      role,
      router,
      $toast
    ) {
      try {
        await $fetch(
          `${config.public.apiBaseUrl}${config.public.apiVersion}/users`,
          {
            method: "POST",
            body: {
              name: name,
              email: email,
              password: password,
              password_confirmation: password_confirmation,
              role_id: role === "Company" ? 3 : 2,
            },
          }
        );

        $toast.success("Registered successfully");

        await this.login(email, password, router, $toast);
      } catch (e) {
        $toast.error("Error registering");
      }
    },

    async updateProfile(name, $toast) {
      try {
        const data = await $fetch(
          `${config.public.apiBaseUrl}${config.public.apiVersion}/users/${
            JSON.parse(this.user).id
          }`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
            body: {
              name: name,
            },
          }
        );

        this.user = data.data;

        localStorage.setItem("user", JSON.stringify(this.user));

        $toast.success("Profile updated successfully");
      } catch (e) {
        $toast.error("Error updating profile");
      }
    },

    async updatePassword(vars, $toast) {
      try {
        await $fetch(
          `${config.public.apiBaseUrl}${config.public.apiVersion}/users/change-password`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.token}`,
              Accept: "application/json",
              contentType: "application/json",
            },
            body: {
              current_password: vars.oldPassword,
              new_password: vars.newPassword,
              new_password_confirmation: vars.confirmPassword,
            },
          }
        );

        $toast.success("Password updated successfully");
      } catch (e) {
        $toast.error("Error updating password");
      }
    },

    async changeAvatar(formData, $toast) {
      try {
        await $fetch(
          `${config.public.apiBaseUrl}${config.public.apiVersion}/users/avatar`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authStore.token}`,
              "content-type": "multipart/form-data",
              accept: "*/*",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
            },
            body: formData,
          }
        );

        this.user.avatar = avatar;

        localStorage.setItem("user", JSON.stringify(this.user));

        $toast.success("Avatar updated successfully");
      } catch (e) {
        $toast.error("Error updating avatar");
      }
    },
  },
});
