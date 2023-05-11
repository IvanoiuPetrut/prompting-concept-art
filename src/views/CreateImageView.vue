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
import { imageURLToBlob } from "@/utils/imageUtils";

const imageStore = useImageStore();

const file = ref<File | null>(null);

const handleLoadImage = async (event: Event) => {
  imageStore.state = "loading";
  file.value = (event.target as HTMLInputElement).files?.[0] as File;
  if (file.value) {
    imageStore.fullName = `${cryptoRandomString({
      length: 32,
      type: "alphanumeric"
    })}-imageType=base.png`;
    const response = await postImage(file.value, imageStore.name, "base");
    console.log("add img to S3 from pc", response);
    imageStore.state = "loaded";
  }
};

async function handleGenerateImage(prompt: string) {
  imageStore.state = "loading";
  const { imageUrl, name } = await getGeneratedImage(prompt);
  imageStore.fullName = name;
  imageStore.imageURL = imageUrl;
  const blob = await imageURLToBlob(imageUrl);
  const file = new File([blob], "image.png", { type: "image/png" });
  const response = await postImage(file, imageStore.name, "base");
  console.log("add img to S3 from AI", response);
  imageStore.state = "loaded";
}
</script>

<template>
  <div class="mt-16 p-10">
    <GetImage
      v-if="imageStore.state === 'not-loaded'"
      @load-image="handleLoadImage"
      @generate-image="handleGenerateImage"
    />
    <div v-if="imageStore.state === 'loading'" class="mt-32 lg:px-64">
      <BaseSpinner />
      <FactSection class="mt-12">
        <template #content>
          <p class="text-xl px-12">
            {{ artFacts.facts[Math.floor(Math.random() * artFacts.facts.length)] }}
          </p>
        </template>
      </FactSection>
    </div>
    <ImageCanvas
      v-if="imageStore.state === 'loaded'"
      :file="file"
      :imageUrl="imageStore.imageURL"
    />
  </div>
</template>
