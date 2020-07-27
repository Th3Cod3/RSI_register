import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index.js";

import Shop from "@/views/Shop";
import Error from "@/views/Error";
import Invoices from "@/views/Invoices";
import Invoice from "@/views/Invoice";
import Jobs from "@/views/Jobs";
import Inventory from "@/views/Inventory";
import Product from "@/views/Product";
import Login from "@/views/Login";

Vue.use(Router);

let router = new Router({
  mode: "history",

  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        isPublic: true
      }
    },
    {
      path: "/shop/:id",
      name: "shop",
      component: Shop
    },
    {
      path: "/Jobs",
      name: "jobs",
      component: Jobs
    },
    {
      path: "/invoices/:id",
      name: "invoices",
      component: Invoices
    },
    {
      path: "/invoice/:id",
      name: "invoice",
      component: Invoice
    },
    {
      path: "/inventory/:id",
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
  return store.state.user.isLogin;
};

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !isAuthenticated()) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
