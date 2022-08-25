import Vue from "vue"
import Router from "vue-router"
import {checkAuth}  from "./services/AuthService.js"

Vue.use(Router)
const isGuest = (to, from, next) => {
  const userisAuthenticated = checkAuth();

  if (userisAuthenticated) {
    next({ name: "home" });

    return;
  }

  next();
};

const isAuthenticated = (to, from, next) => {
  const userisAuthenticated = checkAuth();

  if (!userisAuthenticated) {
    next({ name: "login" });

    return;
  }

  next();
};

export default new Router ({
  mode: 'history',
  routes : [
  { path: "/", name: "home", component: () => import("./views/Home.vue") },
  {
    path: "/accounts",
    name: "accounts",
    children: [
      {
        path: "login",
        name: "login",
        // component: () => import("./views/LoginPage.vue"),
        beforeEnter: isGuest,
      },
    ],
    
  },
  {
    path: "/courses",
    name: "courses",
    children: [
      {
        path: "create_course",
        name: "create_course",
        component: () => import("./views/CreateCourse.vue"),
        beforeEnter: isAuthenticated,
      },
    ],
  },
]});

// const router = createRouter({
//   // history: createWebHistory(),
//   routes,
// });

