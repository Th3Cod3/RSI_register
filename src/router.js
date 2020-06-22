import Vue from "vue";
import Router from "vue-router";
import store from "@/store.js";

import Shop from "@/views/Shop";
import Error from "@/views/Error";
import Invoices from "@/views/Invoices";
import Invoice from "@/views/Invoice";
import Inventory from "@/views/Inventory";
import Product from "@/views/Product";

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
      path: "/invoice/:id",
      name: "invoice",
      component: Invoice
    },
    {
      path: "/inventory",
      name: "inventory",
      component: Inventory
    },
    {
      path: "/inventory/product/:id",
      name: "product",
      component: Product
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
