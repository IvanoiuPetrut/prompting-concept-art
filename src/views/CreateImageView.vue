<script setup lang="ts">
import { ref } from "vue";
import ImageCanvas from "../components/ImageCanvas.vue";
import GetImage from "@/components/GetImage.vue";
import BaseSpinner from "@/components/BaseSpinner.vue";
import FactSection from "@/components/FactSection.vue";
import cryptoRandomString from "crypto-random-string";
import artFacts from "@/data/artFacts.json";
import { useImageStore } from "@/stores/image";
import { getGeneratedImage, postImage } from "@/services/images";
import { dataURLToBlob } from "@/utils/imageUtils";

const imageStore = useImageStore();

const fileState = ref<"not-loaded" | "loading" | "loaded">("not-loaded");
const file = ref<File | null>(null);
const fileUrl = ref<string | null>(null);

const handleLoadImage = async (event: Event) => {
  fileState.value = "loading";
  file.value = (event.target as HTMLInputElement).files?.[0] as File;
  if (file.value) {
    imageStore.fullName = `${cryptoRandomString({
      length: 32,
      type: "alphanumeric"
    })}-imageType=base.png`;
    const response = await postImage(file.value, imageStore.name, "base");
    console.log("add img to S3 from pc", response);
    fileState.value = "loaded";
  }
};

async function handleGenerateImage(prompt: string) {
  fileState.value = "loading";
  const { imageUrl, name } = await getGeneratedImage(prompt);
  console.log(imageUrl, name);
  imageStore.fullName = name;
  fileUrl.value = imageUrl;
  const file = new File([dataURLToBlob(imageUrl + ".png")], name, { type: "image/png" });
  const response = await postImage(file, imageStore.name, "base");
  console.log("add img to S3 from AI", response);
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
    <div v-if="fileState === 'loading'" class="mt-32 lg:px-64">
      <BaseSpinner />
      <FactSection class="mt-12">
        <template #content>
          <p class="text-xl px-12">
            {{ artFacts.facts[Math.floor(Math.random() * artFacts.facts.length)] }}
          </p>
        </template>
      </FactSection>
    </div>
    <ImageCanvas v-if="fileState === 'loaded'" :file="file" :imageUrl="fileUrl" />
  </div>
</template>
