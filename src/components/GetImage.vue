<script setup lang="ts">
import { ref } from "vue";

defineEmits(["load-image", "generate-image"]);
const prompt = ref<string>("");
</script>

<template>
  <h1 class="text-5xl font-semibold text-center mb-20">
    Choose a way to start <strong class="text-primary">creating</strong>
  </h1>
  <div class="flex flex-col w-1/2 mx-auto border-opacity-50 lg:flex-row">
    <div class="grid h-20 card rounded-box place-items-center">
      <div class="flex gap-2">
        <input
          type="text"
          placeholder="Enter a prompt"
          class="input input-bordered input-primary w-full max-w-xs"
          v-model="prompt"
        />
        <button class="btn btn-primary" @click="$emit('generate-image', prompt)">Generate</button>
      </div>
    </div>
    <div class="divider lg:divider-horizontal">OR</div>
    <div class="grid h-20 card rounded-box place-items-center">
      <input
        type="file"
        class="file-input file-input-bordered file-input-primary w-full max-w-xs"
        @change="$emit('load-image', $event)"
      />
    </div>
  </div>
</template>
