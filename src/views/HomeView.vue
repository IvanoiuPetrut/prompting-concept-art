<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col gap-32 lg:flex-row">
      <img
        src="https://source.unsplash.com/random"
        class="max-w-sm rounded-lg shadow-2xl md:max-w-xl"
      />
      <div>
        <h1 class="text-5xl font-bold">It's your ideea!</h1>
        <p class="py-6">
          Start creating your own art with the help of AI. You can choose to start from scratch or
          you can upload your own image.
        </p>
        <RouterLink :to="{ name: 'create-image' }" class="btn btn-primary"
          >Start creating</RouterLink
        >
      </div>
    </div>
  </div>
</template>
