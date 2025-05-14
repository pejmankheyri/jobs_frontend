import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";

export const useSavedJobsStore = defineStore("savedJobs", {
  state: () => ({
    loading: false,
  }),

  getters: {
    // Get saved jobs from the user object in auth store
    savedJobs() {
      const authStore = useAuthStore();
      if (!authStore.user) return [];

      // Get saved_jobs from user object
      const userObj =
        typeof authStore.user === "string"
          ? JSON.parse(authStore.user)
          : authStore.user;

      return userObj.saved_jobs || [];
    },

    savedJobIds() {
      return this.savedJobs.map((job) => job.id);
    },
  },

  actions: {
    updateUserSavedJobs(jobData, isSaving = true) {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          console.error("No user in localStorage");
          return false;
        }

        const user = JSON.parse(userStr);

        if (!user.saved_jobs) {
          user.saved_jobs = [];
        }

        if (isSaving) {
          if (!user.saved_jobs.some((job) => job.id === jobData.id)) {
            user.saved_jobs.push(jobData);
          }
        } else {
          user.saved_jobs = user.saved_jobs.filter(
            (job) => job.id !== jobData.id
          );
        }

        localStorage.setItem("user", JSON.stringify(user));

        const authStore = useAuthStore();
        authStore.user = user;

        return true;
      } catch (error) {
        console.error("Error updating saved jobs in localStorage:", error);
        return false;
      }
    },

    async saveJob(jobId) {
      try {
        this.loading = true;
        const { data } = await useCustomFetch(`/jobs/${jobId}/save`, {
          method: "POST",
        });

        let jobData = { id: Number(jobId) };

        if (!data || !data.saved_jobs) {
          this.updateUserSavedJobs(jobData, true);
        } else {
          const authStore = useAuthStore();
          authStore.setUser(data);
        }

        return true;
      } catch (error) {
        console.error("Error saving job:", error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    async unsaveJob(jobId) {
      try {
        this.loading = true;
        const { data } = await useCustomFetch(`/jobs/${jobId}/unsave`, {
          method: "DELETE",
        });

        let jobData = { id: Number(jobId) };

        if (!data || !data.saved_jobs) {
          this.updateUserSavedJobs(jobData, false);
        } else {
          const authStore = useAuthStore();
          authStore.setUser(data);
        }

        return true;
      } catch (error) {
        console.error("Error unsaving job:", error);
        return false;
      } finally {
        this.loading = false;
      }
    },

    isJobSaved(jobId) {
      return this.savedJobIds.includes(Number(jobId));
    },

    async fetchSavedJobs() {
      try {
        this.loading = true;
        const authStore = useAuthStore();
        await authStore.fetchUser();
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
