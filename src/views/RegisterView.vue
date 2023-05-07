<script setup lang="ts">
import { ref } from "vue";
import { register } from "@/services/auth";
import BaseLoginRegisterForm from "@/components/BaseLoginRegisterForm.vue";
import BaseWarning from "@/components/BaseWarning.vue";
import router from "@/router";

const error = ref<string | null>(null);
const timer = ref<number>(0);

function handleError(newError: string) {
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    error.value = null;
  }, 3500);
  error.value = newError;
}

function handleSuccess(data: { token: string }) {
  router.push("/login");
}
</script>

<template>
  <BaseWarning v-if="error" :message="error" />

  <div class="container mx-auto max-w-xs mt-32 bg-base-200 px-4 py-6 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-center mb-8">Create an account</h1>
    <BaseLoginRegisterForm
      :cta-label="'Create account'"
      :submitFunction="register"
      @error="handleError"
      @success="handleSuccess"
    />
  </div>
</template>
