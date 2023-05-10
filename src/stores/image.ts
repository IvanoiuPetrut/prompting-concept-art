import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useImageStore = defineStore("image", () => {
  const name = ref<string>("");
  const isMask = computed(() => name.value.includes("imageType=mask"));

  return { name, isMask };
});
