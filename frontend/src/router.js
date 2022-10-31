import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "HomePage",
    path: "/",
    component: () => import("@/components/Home.vue"),
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/components/Login.vue"),
  },
  {
    name: "Signup",
    path: "/signup",
    component: () => import("@/components/Signup.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
