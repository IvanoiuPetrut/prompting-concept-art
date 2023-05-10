<script setup lang="ts">
import { ref } from "vue";
import ImageCanvas from "../components/ImageCanvas.vue";
import GetImage from "@/components/GetImage.vue";
import BaseSpinner from "@/components/BaseSpinner.vue";
import FactSection from "@/components/FactSection.vue";
import cryptoRandomString from "crypto-random-string";
import artFacts from "@/data/artFacts.json";
import { useImageStore } from "@/stores/image";
import { getGeneratedImage } from "@/services/images";

const imageStore = useImageStore();

const fileState = ref<"not-loaded" | "loading" | "loaded">("loading");
const file = ref<File | null>(null);
const fileUrl = ref<string | null>(null);

const handleLoadImage = (event: Event) => {
  file.value = (event.target as HTMLInputElement).files?.[0] as File;
  if (file.value) {
    imageStore.name = `${cryptoRandomString({
      length: 32,
      type: "alphanumeric"
    })}imageType=base.png`;
    console.log(imageStore.name);
    fileState.value = "loaded";
  }
};

async function handleGenerateImage(prompt: string) {
  fileState.value = "loading";
  const { imageUrl, name } = await getGeneratedImage(prompt);
  console.log(imageUrl, name);
  imageStore.name = name;
  fileUrl.value = imageUrl;
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
