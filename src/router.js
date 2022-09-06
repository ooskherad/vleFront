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

const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}



export default new Router ({
  mode: 'history',
  routes : [
  { path: "/", name: "home", component: () => import("./views/useHome.vue") },
  {
    path: "/accounts",
    name: "accounts",
    component:()  => import("./views/User/userView.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("./views/User/LoginPage.vue"),
        beforeEnter: isGuest,
      },
    ],
    
  },
  {
    path: "/courses",
    name: "courses",
    component:()  => import("./views/User/userView.vue"),
    children: [
      {
        path: "create_course",
        name: "create_course",
        component: () => import("./views/course/createCourse/CreateCourse.vue"),
        beforeEnter: isAuthenticated,
      },
      {
        path: ":id",
        name: "courseDetail",
        component: () => import("./views/course/CoursePage.vue"),
      },
      {
        path: ":id/:ssID",
        name: "courseItems",
        component: () => import("./views/course/CourseItems.vue"),
      },
    ],
  },
]});

