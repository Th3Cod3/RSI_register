import Vue from "vue";
import router from "@/router";

import { dollarFilter, dollarRoundFilter } from "@/filters/numeral";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.filter("money", dollarFilter);
Vue.filter("roundMoney", dollarRoundFilter);

import store from "./store";

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
