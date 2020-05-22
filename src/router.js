import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import Shop from "@/views/Shop";
import Error from "@/views/Error";
import Invoices from "@/views/Invoices";

Vue.use(Router);

let router = new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      name: "shop",
      component: Shop,
      meta: {
        isPublic: true
      }
    },
    {
      path: "/invoices",
      name: "invoices",
      component: Invoices
    },
    {
      path: "*",
      name: "error",
      component: Error
    }
  ]
});
const isAuthenticated = () => {
  return store.state.isLogin;
};

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !isAuthenticated()) {
    next({ name: "shop" });
  } else {
    next();
  }
});

export default router;
