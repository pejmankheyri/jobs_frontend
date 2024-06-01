import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || null,
  }),

  actions: {
    async login(email, password, router, $toast) {
      try {
        const data = await $fetch("https://jobs-api.pejmanz.com/api/v1/login", {
          method: "POST",
          body: { email, password },
        });

        this.token = data.token;
        this.user = data.user;

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        $toast.success("Logged in successfully");

        router.push("/");
      } catch (e) {
        $toast.error("Error logging in");
      }
    },

    async logout($toast) {
      await $fetch("https://jobs-api.pejmanz.com/api/v1/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");

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
        await $fetch("https://jobs-api.pejmanz.com/api/v1/users", {
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
  },
});
