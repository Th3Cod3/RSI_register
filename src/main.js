import Vue from "vue";
import router from "@/router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { dollarFilter, dollarRoundFilter } from "@/filters/numeral";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.filter("money", dollarFilter);
Vue.filter("roundMoney", dollarRoundFilter);

Vue.use(IconsPlugin);
Vue.use(BootstrapVue);

import store from "./store";

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
