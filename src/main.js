import Vue from "vue";
import { Simplert } from 'vue2-simplert-plugin';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'vue2-simplert-plugin/dist/vue2-simplert-plugin.min.css';

import { dateFilter } from "@/filters/moment";
import {
  dollarFilter,
  dollarRoundFilter,
  roundFilter
} from "@/filters/numeral";
import router from "@/router";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.filter("money", dollarFilter);
Vue.filter("date", dateFilter);
Vue.filter("roundMoney", dollarRoundFilter);
Vue.filter("round", roundFilter);

Vue.use(IconsPlugin);
Vue.use(BootstrapVue);
Vue.use(Simplert);

import store from "@/store/index.js";

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
