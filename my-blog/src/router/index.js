import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    props: {},
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/SignUp.vue"),
    props: {},
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/myBlog",
    name: "myBlog",
    component: () => import("../views/MyBlog.vue"),
    props: {},
  },
  {
    path: "/createBlog",
    name: "createBlog",
    component: () => import("../views/CreateBlog.vue"),
    props: {},
  },
  {
    path: "/blog/:id",
    component: () => import("../views/Blog.vue"),
    props: {},
  },
  {
    path: "/myBlogs/:id",
    component: () => import("../views/BlogMyBlog.vue"),
    props: {},
  },

  {
    path: "/Dashboard",
    name: "Dashboard",
    component: () => import("../views/Home.vue"),
    children: [
      // {
      //   path: "",
      //   component: () =>
      //     import(/* webpackChunkName: "Overview" */ "../views/Overview.vue"),
      // },
      // {
      //   path: "messages",
      //   component: () =>
      //     import(/* webpackChunkName: "Messages" */ "../views/Messages.vue"),
      // },
      // {
      //   path: "profile",
      //   component: () =>
      //     import(/* webpackChunkName: "Profile" */ "../views/Profile.vue"),
      // },
      // {
      //   path: "settings",
      //   component: () =>
      //     import(/* webpackChunkName: "Settings" */ "../views/Settings.vue"),
      // },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
