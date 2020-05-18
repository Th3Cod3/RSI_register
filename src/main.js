import Vue from "vue";
import VueSimpleAlert from "vue-simple-alert";

import App from "./App.vue";
import { dollarFilter, dollarRoundFilter } from "@/filters/numeral";
import store from "@/store";

Vue.config.productionTip = false;

Vue.use(VueSimpleAlert);

Vue.filter("money", dollarFilter);
Vue.filter("roundMoney", dollarRoundFilter);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
