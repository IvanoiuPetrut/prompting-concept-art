<script setup lang="ts">
import { ref } from "vue";
import cookies from "js-cookie";
import router from "@/router";
import { login } from "@/services/auth";
import BaseLoginRegisterForm from "@/components/BaseLoginRegisterForm.vue";
import BaseWarning from "@/components/BaseWarning.vue";
import { useUserCookieStore } from "@/stores/userCookie";

const userCookieStore = useUserCookieStore();
const error = ref<string | null>(null);
const timer = ref<number>(0);

function handleError(newError: string) {
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    error.value = null;
  }, 3500);
  error.value = newError;
}

function handleSuccess(data: { token: string; userId: string }) {
  cookies.set("auth-token", data.token, { expires: 1, sameSite: "strict" });
  userCookieStore.setUserId(data.userId);
  router.push("/");
}
</script>

<template>
  <BaseWarning v-if="error" :message="error" />
  <div class="container mx-auto max-w-xs mt-32 bg-base-200 px-4 py-6 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-center mb-8">Welcome back</h1>
    <BaseLoginRegisterForm
      :cta-label="'Log in'"
      :submitFunction="login"
      @error="handleError"
      @success="handleSuccess"
    />
  </div>
</template>
