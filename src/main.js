import Vue from "vue";
import App from "./App.vue";
import { dollarFilter, dollarRoundFilter } from "@/filters/numeral";

Vue.config.productionTip = false;
Vue.filter("money", dollarFilter);
Vue.filter("roundMoney", dollarRoundFilter);

import store from "./store";

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
