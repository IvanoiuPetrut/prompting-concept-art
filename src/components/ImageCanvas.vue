<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  file?: File | null;
  imageUrl?: string | null;
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
let isDrawing = false;
const brushSize = 20;

const saveImage = () => {
  const link = document.createElement("a");
  link.download = "image.png";
  link.href = canvas.value?.toDataURL() || "";
  link.click();
};

const draw = (x: number, y: number) => {
  if (ctx.value) {
    ctx.value.globalCompositeOperation = "destination-out";
    ctx.value.beginPath();
    ctx.value.arc(x, y, brushSize, 0, 2 * Math.PI);
    ctx.value.fill();
  }
};

const image = new Image();

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
  <div class="grid grid-cols-2 gap-4">
    <canvas ref="canvas" class="ring ring-primary ring-offset-base-100 ring-offset-4"></canvas>
    <div class="flex justify-center gap-4 mt-4">
      <button class="btn" @click="saveImage">Save</button>
      <button class="btn" @click="saveImage">Save</button>
      <button class="btn" @click="saveImage">Save</button>
      <button class="btn" @click="saveImage">Save</button>
    </div>
  </div>
</template>
