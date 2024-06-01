import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  const toast = useToast({
    position: "bottom-right",
    duration: 5000,
    keepOnHover: true,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
  });
  return {
    provide: {
      toast,
    },
  };
});
