<script setup lang="ts">
import { ref, onMounted } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
let isDrawing = false;
const brushSize = 10;

const image = new Image();

const loadImage = () => {
  // image.src = "https://picsum.photos/200/300";
  // image.onload = () => {
  //   if (ctx.value) {
  //     ctx.value.drawImage(image, 0, 0);
  //   }
  // };
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
  if (canvas.value) {
    ctx.value = canvas.value.getContext("2d");
    canvas.value.addEventListener("mousedown", (e) => {
      isDrawing = true;
      draw(e.offsetX, e.offsetY);
    });

    canvas.value.addEventListener("mousemove", (e) => {
      if (isDrawing) {
        draw(e.offsetX, e.offsetY);
      }
    });

    canvas.value.addEventListener("mouseup", () => {
      isDrawing = false;
    });
  }
});
</script>

<template>
  <p>Canvas</p>
  <canvas ref="canvas" width="500" height="500"></canvas>

  <!-- <button @click="draw">Draww</button> -->
  <button @click="loadImage" class="btn">Load Image</button>
</template>
