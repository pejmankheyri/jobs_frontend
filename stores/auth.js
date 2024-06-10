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
    async login(email, password, router, $toast, t, localeRoute) {
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

        $toast.success(t("LOGIN_SUCCESS"));

        navigateTo(localeRoute("index").fullPath);
      } catch (e) {
        $toast.error(t("LOGIN_ERROR"));
      }
    },

    async logout($toast, t, localeRoute) {
      await useFetch(`/logout`, {
        method: "POST",
      });
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigateTo(localeRoute({ name: "login" }).fullPath);

      $toast.success(t("LOGOUT_SUCCESS"));
    },

    async register(
      name,
      email,
      phone,
      password,
      password_confirmation,
      role,
      router,
      $toast,
      t,
      localeRoute
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

        $toast.success(t("REGISTER_SUCCESS"));

        await this.login(email, password, router, $toast, t, localeRoute);
      } catch (e) {
        $toast.error(t("REGISTER_ERROR"));
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

    async updateProfile(name, phone, $toast, t) {
      try {
        const { data } = await useFetch(`/users/${JSON.parse(this.user).id}`, {
          method: "PUT",
          body: {
            name: name,
            phone: phone,
          },
        });

        this.setUser(data);

        $toast.success(t("PROFILE_UPDATED_SUCCESSFULLY"));
      } catch (e) {
        $toast.error(t("PROFILE_UPDATED_ERROR"));
      }
    },

    async updatePassword(vars, $toast, t) {
      try {
        await useFetch(`/users/change-password`, {
          method: "POST",
          body: {
            current_password: vars.oldPassword,
            new_password: vars.newPassword,
            new_password_confirmation: vars.confirmPassword,
          },
        });

        $toast.success(t("PASSWORD_UPDATED_SUCCESSFULLY"));
      } catch (e) {
        $toast.error(t("PASSWORD_UPDATED_ERROR"));
      }
    },

    async changeAvatar(formData, $toast, t) {
      try {
        const { avatar } = await useFetch(`/users/avatar`, {
          method: "POST",
          body: formData,
        });

        this.user.avatar = avatar;

        localStorage.setItem("user", JSON.stringify(this.user));

        $toast.success(t("AVATAR_UPDATED_SUCCESSFULLY"));
      } catch (e) {
        $toast.error(t("AVATAR_UPDATED_ERROR"));
      }
    },

    async changeCV(formData, $toast, t) {
      try {
        const { cv } = await useFetch(`/users/cv`, {
          method: "POST",
          body: formData,
        });

        this.user.cv = cv;

        localStorage.setItem("user", JSON.stringify(this.user));

        $toast.success(t("CV_UPDATED_SUCCESSFULLY"));
      } catch (e) {
        $toast.error(t("CV_UPDATED_ERROR"));
      }
    },
  },
});
