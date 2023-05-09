<script setup lang="ts">
import { ref } from "vue";
import ImageCanvas from "../components/ImageCanvas.vue";
import GetImage from "@/components/GetImage.vue";
import { getGeneratedImage } from "@/services/images";

const fileState = ref<"not-loaded" | "loading" | "loaded">("not-loaded");
const file = ref<File | null>(null);
const fileUrl = ref<string | null>(null);

const handleLoadImage = (event: Event) => {
  file.value = (event.target as HTMLInputElement).files?.[0] as File;
  if (file.value) {
    fileState.value = "loaded";
  }
};

async function handleGenerateImage(prompt: string) {
  fileState.value = "loading";
  const { imageUrl, width, height } = await getGeneratedImage(prompt);
  console.log(imageUrl, width, height);
  fileUrl.value = imageUrl;
  // file.value = imageUrl;
  fileState.value = "loaded";
}
</script>

<template>
  <div class="mt-16 p-10">
    <GetImage
      v-if="fileState === 'not-loaded'"
      @load-image="handleLoadImage"
      @generate-image="handleGenerateImage"
    />
    <div v-if="fileState === 'loading'">Spinning</div>
    <ImageCanvas v-if="fileState === 'loaded'" :file="file" :imageUrl="fileUrl" />
  </div>
</template>
