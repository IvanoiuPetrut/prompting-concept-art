<script setup lang="ts">
const props = defineProps<{
  label: string;
  placeholder: string;
  modelValue: string;
  inputType: string;
}>();
</script>

<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{{ props.label }}</span>
    </label>
    <input
      :placeholder="props.placeholder"
      :type="props.inputType"
      class="input input-bordered w-full max-w-xs"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
