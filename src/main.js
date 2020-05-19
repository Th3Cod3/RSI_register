import Vue from "vue";
import VueSimpleAlert from "vue-simple-alert";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { dollarFilter, dollarRoundFilter } from "@/filters/numeral";
import router from "@/router";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.filter("money", dollarFilter);
Vue.filter("roundMoney", dollarRoundFilter);

Vue.use(IconsPlugin);
Vue.use(BootstrapVue);
Vue.use(VueSimpleAlert);

import store from "./store";

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
