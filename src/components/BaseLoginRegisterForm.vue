<script setup lang="ts">
const props = defineProps<{
  ctaLabel: string;
}>();

import BaseFormControl from "./BaseFormControl.vue";
</script>

<template>
  <form class="flex flex-col gap-4 w-full max-w-xs">
    <BaseFormControl :label="'Your name'" :placeholder="'Name'" />
    <BaseFormControl :label="'Your password'" :placeholder="'Password'" />
    <button class="btn w-full btn-primary text-base mt-6">{{ props.ctaLabel }}</button>
  </form>
</template>
