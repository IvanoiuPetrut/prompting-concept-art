<script setup lang="ts">
import { ref, onMounted } from "vue";
import BaseCollapse from "@/components/BaseCollapse.vue";
import { useImageStore } from "@/stores/image";
import { postImage } from "@/services/images";
import { dataURLToBlob } from "@/utils/imageUtils";

const props = defineProps<{
  file?: File | null;
  imageUrl?: string | null;
}>();

const imageStore = useImageStore();
const brushSize = ref<string>("20");
const prompt = ref<string>("");
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
let isDrawing = false;

const saveImage = () => {
  const link = document.createElement("a");
  link.download = "image.png";
  link.href = canvas.value?.toDataURL() || "";
  link.click();
};

const generateNewImage = async () => {
  const dataUrl = canvas.value?.toDataURL() || "";
  const blob = dataURLToBlob(dataUrl);
  const file = new File([blob], "image.png", { type: "image/png" });

  const response = await postImage(file, imageStore.name, "mask");
  console.log(response);
  // const newIamge = await getEditedImage(prompt.value, imageStore.name.split("-")[0]);
};

const draw = (x: number, y: number) => {
  if (ctx.value) {
    ctx.value.globalCompositeOperation = "destination-out";
    ctx.value.beginPath();
    ctx.value.arc(x, y, Number(brushSize.value), 0, 2 * Math.PI);
    ctx.value.fill();
  }
};

const image = new Image();
image.crossOrigin = "anonymous";

if (props.imageUrl) {
  image.src = props.imageUrl;
  image.onload = () => {
    if (ctx.value) {
      ctx.value.drawImage(image, 0, 0);
    }
  };
}

if (props.file) {
  image.src = URL.createObjectURL(props.file);
  image.onload = () => {
    if (ctx.value) {
      ctx.value.drawImage(image, 0, 0);
    }
  };
}

onMounted(() => {
  const screenWidth = window.innerWidth;

  if (canvas.value) {
    if (screenWidth < 768) {
      canvas.value.width = 256;
      canvas.value.height = 256;
    } else if (screenWidth < 1024) {
      canvas.value.width = 512;
      canvas.value.height = 512;
    } else {
      canvas.value.width = 1024;
      canvas.value.height = 1024;
    }
    ctx.value = canvas.value.getContext("2d");
    canvas.value.addEventListener("mousedown", (e) => {
      if (canvas.value) {
        isDrawing = true;
        draw(e.offsetX, e.offsetY);
      }
    });

    canvas.value.addEventListener("mousemove", (e) => {
      if (canvas.value) {
        if (isDrawing) {
          draw(e.offsetX, e.offsetY);
        }
      }
    });

    canvas.value.addEventListener("mouseup", () => {
      isDrawing = false;
    });
  }
});
</script>

<template>
  <div class="flex flex-col justify-center gap-12 md:flex-row">
    <canvas ref="canvas" class="ring ring-primary ring-offset-base-100 ring-offset-4"></canvas>
    <div class="flex flex-col w-full gap-4">
      <BaseCollapse>
        <template #header>How to use</template>
        <template #content>
          <p>Erase the part you want to change</p>
          <p>Enter a prompt for what should be in the erased part</p>
          <p>Generate new iamge or save the actual image</p>
          <p class="italic mt-2">Is that simple! 😎</p>
        </template>
      </BaseCollapse>
      <div class="flex flex-col gap-4 p-4 bg-base-200">
        <p class="text-xl text-primary-content">Brush size</p>
        <input type="range" min="0" max="100" class="range" v-model="brushSize" />
      </div>
      <input
        type="text"
        placeholder="Enter a prompt"
        class="input input-bordered w-full text-xl text-primary-content bg-base-200"
        v-model="prompt"
      />
      <div class="flex flex-wrap w-full gap-12">
        <button class="btn btn-primary flex-1" @click="generateNewImage">Generate new image</button>
        <button class="btn flex-1" @click="saveImage">Save image</button>
      </div>
    </div>
  </div>
</template>
