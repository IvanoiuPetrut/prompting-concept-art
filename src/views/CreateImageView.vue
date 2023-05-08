<script setup lang="ts">
import { ref } from "vue";
import ImageCanvas from "../components/ImageCanvas.vue";
import GetImage from "@/components/GetImage.vue";

const fileState = ref<"not-loaded" | "loading" | "loaded">("not-loaded");
const file = ref<File | null>(null);

const handleLoadImage = (event: Event) => {
  file.value = (event.target as HTMLInputElement).files?.[0] as File;
  if (file.value) {
    fileState.value = "loaded";
  }
};

const handleGenerateImage = (prompt: string) => {
  fileState.value = "loading";
  console.log(prompt);
};
</script>

<template>
  <div class="mt-16 p-10">
    <GetImage
      v-if="fileState === 'not-loaded'"
      @load-image="handleLoadImage"
      @generate-image="handleGenerateImage"
    />
    <div v-if="fileState === 'loading'">Spinning</div>
    <ImageCanvas v-if="fileState === 'loaded'" :file="file" />
  </div>
</template>
