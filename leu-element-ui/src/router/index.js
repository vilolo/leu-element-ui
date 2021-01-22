import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        name: "index",
        component: () => import("../views/base/layout.vue"),
        redirect: '/home',
        children: [
          {
            path: "/home",
            name: "home",
            component: () => import("../views/home.vue")
          },
          {
            path: "/p1",
            name: "p1",
            component: () => import("../views/p1.vue")
          },
          {
            path: "/market",
            name: "market",
            component: () => import("../views/market.vue")
          }
        ]
      }
    ]
});