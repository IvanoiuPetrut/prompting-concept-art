import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserCookieStore = defineStore("userCookie", () => {
  const authCookie = ref<string | null>(null);
  const userId = ref<string | null>(null);
  const isUserAuthenticated = computed(() => authCookie.value !== null);

  const setAuthCookie = (cookie: string) => {
    authCookie.value = cookie;
  };

  const removeAuthCookie = () => {
    authCookie.value = null;
  };

  const setUserId = (id: string) => {
    userId.value = id;
  };

  const removeUserId = () => {
    userId.value = null;
  };

  return {
    authCookie,
    userId,
    isUserAuthenticated,
    setAuthCookie,
    removeAuthCookie,
    setUserId,
    removeUserId
  };
});
