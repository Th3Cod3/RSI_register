import Vue from "vue";
import App from "./App.vue";
import { dollarFilter } from "@/filters/numeral";

Vue.config.productionTip = false;
Vue.filter("money", dollarFilter);

import store from "./store";

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
