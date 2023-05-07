<script setup lang="ts">
const props = defineProps<{
  label: string;
  placeholder: string;
  modelValue: string;
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
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
