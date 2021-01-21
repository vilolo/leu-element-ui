import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
      // 登录
      {
        path: "/test",
        name: "test",
        component: () => import("../views/test.vue")
      }
    ]
});