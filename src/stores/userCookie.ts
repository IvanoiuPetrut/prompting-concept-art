import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserCookieStore = defineStore("userCookie", () => {
  const authCookie = ref<string | null>(null);
  const isUserAuthenticated = computed(() => authCookie.value !== null);

  const setAuthCookie = (cookie: string) => {
    authCookie.value = cookie;
  };

  const removeAuthCookie = () => {
    authCookie.value = null;
  };

  return { authCookie, isUserAuthenticated, setAuthCookie, removeAuthCookie };
});
