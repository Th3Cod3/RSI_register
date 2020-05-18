import Vue from "vue";
import Router from "vue-router";

import Shop from "@/views/Shop";
import Error from "@/views/Error";

Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      name: "shop",
      component: Shop
    },
    {
      path: "/invoices",
      name: "shop",
      component: Shop
    },
    {
      path: "*",
      name: "error",
      component: Error
    }
  ]
});
