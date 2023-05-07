<script setup lang="ts">
import { useUserCookieStore } from "@/stores/userCookie";

const userCookie = useUserCookieStore();

function logout() {
  userCookie.removeAuthCookie();
}
</script>

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
        <li v-if="!userCookie.isUserAuthenticated">
          <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        </li>
        <li v-if="!userCookie.isUserAuthenticated">
          <RouterLink :to="{ name: 'register' }">Register</RouterLink>
        </li>
        <li v-if="userCookie.isUserAuthenticated">
          <button class="btn btn-ghost" @click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</template>
