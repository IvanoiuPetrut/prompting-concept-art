import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useImageStore = defineStore("image", () => {
  const fullName = ref<string>("");
  const state = ref<"not-loaded" | "loading" | "loaded">("not-loaded");
  const imageURL = ref<string>("");
  const name = computed(() => fullName.value.split("-imageType")[0]);
  const isMask = computed(() => fullName.value.includes("imageType=mask"));

  return { fullName, state, imageURL, name, isMask };
});
