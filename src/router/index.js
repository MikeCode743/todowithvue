import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/todo",
    name: "Todo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Todo.vue"),
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Calendar.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
