import { defineStore } from "pinia";
import { useRuntimeConfig } from "#app";
import useFetch from "@/composables/useFetch";

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
        const data = await useFetch(`/login`, {
          method: "POST",
          body: { email, password },
        });

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
      await useFetch(`/logout`, {
        method: "POST",
      });
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
        await useFetch(`/users`, {
          method: "POST",
          body: {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            role_id: role === "Company" ? 3 : 2,
          },
        });

        $toast.success("Registered successfully");

        await this.login(email, password, router, $toast);
      } catch (e) {
        $toast.error("Error registering");
      }
    },

    async updateProfile(name, phone, $toast) {
      try {
        const data = await useFetch(`/users/${JSON.parse(this.user).id}`, {
          method: "PUT",
          body: {
            name: name,
            phone: phone,
          },
        });

        this.user = data.data;

        localStorage.setItem("user", JSON.stringify(this.user));

        $toast.success("Profile updated successfully");
      } catch (e) {
        $toast.error("Error updating profile");
      }
    },

    async updatePassword(vars, $toast) {
      try {
        await useFetch(`/users/change-password`, {
          method: "POST",
          body: {
            current_password: vars.oldPassword,
            new_password: vars.newPassword,
            new_password_confirmation: vars.confirmPassword,
          },
        });

        $toast.success("Password updated successfully");
      } catch (e) {
        $toast.error("Error updating password");
      }
    },

    async changeAvatar(formData, $toast) {
      try {
        const { avatar } = await useFetch(`/users/avatar`, {
          method: "POST",
          body: formData,
        });

        this.user.avatar = avatar;

        localStorage.setItem("user", JSON.stringify(this.user));

        $toast.success("Avatar updated successfully");
      } catch (e) {
        $toast.error("Error updating avatar");
      }
    },

    async changeCV(formData, $toast) {
      try {
        const { cv } = await useFetch(`/users/cv`, {
          method: "POST",
          body: formData,
        });

        this.user.cv = cv;

        localStorage.setItem("user", JSON.stringify(this.user));

        $toast.success("CV updated successfully");
      } catch (e) {
        $toast.error("Error updating CV");
      }
    },
  },
});
