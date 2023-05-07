<template>
  <div class="navbar bg-base-200">
    <div class="flex-1">
      <RouterLink :to="{ name: 'home' }" class="btn btn-ghost normal-case text-3xl font-bold"
        ><span class="text-primary">prompt</span>
        <span class="uppercase"> Art </span>
      </RouterLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1 gap-3">
        <li><RouterLink :to="{ name: 'login' }">Login</RouterLink></li>
        <li><RouterLink :to="{ name: 'register' }">Register</RouterLink></li>
      </ul>
    </div>
  </div>
</template>
