import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index.js";

import Shop from "@/views/Shop.vue";
import Error from "@/views/Error.vue";
import Invoices from "@/views/Invoices.vue";
import Invoice from "@/views/Invoice.vue";
import Jobs from "@/views/Jobs.vue";
import Inventory from "@/views/Inventory.vue";
import Product from "@/views/Product.vue";
import Login from "@/views/Login.vue";
import Logout from "@/views/Logout.vue";

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
      path: "/logout",
      name: "logout",
      component: Logout,
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
