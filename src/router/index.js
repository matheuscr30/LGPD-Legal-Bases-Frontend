import Vue from "vue";
import VueRouter from "vue-router";

import Main from "@/views/Main.vue";
import UserCreate from "@/views/Users/UserCreate";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      {
        path: "users/create",
        name: "UserCreate",
        component: UserCreate
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
