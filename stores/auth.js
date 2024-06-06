import { defineStore } from "pinia";
import { useRuntimeConfig } from "#app";
import useFetch from "@/composables/useFetch";

const config = useRuntimeConfig();

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
    async login(email, password, router, $toast) {
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
          // return navigateTo("/company/dashboard");
          case "user":
          // return navigateTo("/user/dashboard");
          default:
          // return navigateTo("/");
        }

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
      this.token = null;
      this.user = null;
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

    async fetchUser() {
      try {
        const { data } = await useFetch(`/users/me`);

        this.setUser(data);
      } catch (e) {
        this.logout();
      }
    },

    async updateProfile(name, phone, $toast) {
      try {
        const { data } = await useFetch(`/users/${JSON.parse(this.user).id}`, {
          method: "PUT",
          body: {
            name: name,
            phone: phone,
          },
        });

        this.setUser(data);

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
