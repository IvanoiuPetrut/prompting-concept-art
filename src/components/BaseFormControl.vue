<script setup lang="ts">
const props = defineProps<{
  label: string;
  placeholder: string;
}>();
</script>

<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{{ props.label }}</span>
    </label>
    <input
      type="text"
      :placeholder="props.placeholder"
      class="input input-bordered w-full max-w-xs"
    />
  </div>
</template>
