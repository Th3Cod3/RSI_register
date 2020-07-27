import Vue from "vue";
import Vuex from "vuex";
import shop from "@/store/modules/shop.module";
import user from "@/store/modules/user.module";
import product from "@/store/modules/product.module";
import invoice from "@/store/modules/invoice.module";
import inventory from "@/store/modules/inventory.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    shop,
    product,
    inventory,
    invoice
  }
});
