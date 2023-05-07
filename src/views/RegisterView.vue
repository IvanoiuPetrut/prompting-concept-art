<script setup lang="ts">
import BaseLoginRegisterForm from "@/components/BaseLoginRegisterForm.vue";
</script>

<template>
  <div class="container mx-auto max-w-xs mt-32 bg-base-200 px-4 py-6 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-center mb-8">Create an account</h1>
    <BaseLoginRegisterForm :cta-label="'Create account'" />
  </div>
</template>
