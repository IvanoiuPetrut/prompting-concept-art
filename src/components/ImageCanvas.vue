<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  file: File | null;
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

onMounted(() => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  console.log(screenWidth, screenHeight);

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
        console.log(e);
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

const image = new Image();
if (props.file) {
  image.src = URL.createObjectURL(props.file);
  image.onload = () => {
    if (ctx.value) {
      ctx.value.drawImage(image, 0, 0);
    }
  };
}
</script>

<template>
  <canvas ref="canvas" class="ring ring-primary ring-offset-base-100 ring-offset-4"></canvas>
  <button @click="saveImage">Save</button>
</template>
