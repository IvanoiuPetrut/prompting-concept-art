import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import cookies from "js-cookie";
import { useUserCookieStore } from "../stores/userCookie";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue")
    },
    {
      path: "/create-image",
      name: "create-image",
      component: () => import("../views/CreateImageView.vue")
    }
  ]
});

router.beforeEach(() => {
  const userCookieStore = useUserCookieStore();
  const authCookie = cookies.get("auth-token");

  if (authCookie) {
    userCookieStore.setAuthCookie(authCookie);
  } else {
    userCookieStore.removeAuthCookie();
  }
});

export default router;
