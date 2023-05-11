<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col gap-32 lg:flex-row">
      <img
        src="https://images.unsplash.com/photo-1610926950521-ab7e8b45f377?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1939&q=80"
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
