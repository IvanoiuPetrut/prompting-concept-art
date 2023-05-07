<script setup lang="ts">
import { ref } from "vue";
import BaseFormControl from "./BaseFormControl.vue";

const props = defineProps<{
  ctaLabel: string;
  submitFunction: (name: string, password: string) => Promise<string>;
}>();

const emit = defineEmits(["error", "success"]);

const name = ref<string>("");
const password = ref<string>("");

function submit(name: string, password: string) {
  props
    .submitFunction(name, password)
    .then((data) => {
      console.log(data);
      emit("success", data);
    })
    .catch((error) => {
      console.log(error);
      emit("error", error);
    });
}
</script>

<template>
  <form @submit.prevent="submit(name, password)" class="flex flex-col gap-4 w-full max-w-xs">
    <BaseFormControl :label="'Your name'" :placeholder="'Name'" v-model="name" />
    <BaseFormControl :label="'Your password'" :placeholder="'Password'" v-model="password" />
    <button class="btn w-full btn-primary text-base mt-6">{{ props.ctaLabel }}</button>
  </form>
</template>
