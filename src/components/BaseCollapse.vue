<template>
  <div class="collapse">
    <input type="checkbox" class="peer" />
    <div
      class="flex justify-between items-center text-xl font-semibold collapse-title bg-base-200 text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
    >
      <slot name="header"></slot>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
    <div
      class="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
