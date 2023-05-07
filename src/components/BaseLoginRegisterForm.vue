<script setup lang="ts">
import { ref } from "vue";
import BaseFormControl from "./BaseFormControl.vue";

const props = defineProps<{
  ctaLabel: string;
}>();

const name = ref<string>("");
const password = ref<string>("");
</script>

<template>
  <form class="flex flex-col gap-4 w-full max-w-xs">
    <BaseFormControl :label="'Your name'" :placeholder="'Name'" v-model="name" />
    <BaseFormControl :label="'Your password'" :placeholder="'Password'" v-model="password" />
    <button class="btn w-full btn-primary text-base mt-6">{{ props.ctaLabel }}</button>
  </form>
</template>
