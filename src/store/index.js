import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    selectedItems: [],
    filter: {
      productName: "",
      barcode: ""
    },
    loadingItems: true,
    login: {
      user: "",
      token: ""
    },
    loginForm: {
      user: "",
      password: ""
    },
    paidAmount: 0,
    totalAmount: 0
  },
  getters: {
    total(state) {
      let total = 0;
      state.selectedItems.forEach(item => {
        total = Number(item.price) * Number(item.amount) + total;
      });
      state.totalAmount = total;
      return total;
    },
    change(state) {
      return Number(state.paidAmount) - Number(state.totalAmount);
    }
  },
  mutations: {
    filter(state, payload) {
      state.filter = payload;
    },
    paidAmount(state, payload) {
      state.paidAmount = payload;
    },
    items(state, payload) {
      state.items = payload;
    },
    loadingItems(state, payload) {
      state.loadingItems = payload;
    },
    addItemToCart(state, payload) {
      let item = state.selectedItems.findIndex(item => item.id === payload.id);
      if (item !== -1) {
        state.selectedItems[item].amount++;
      } else {
        state.selectedItems.push({
          amount: 1,
          ...payload
        });
      }
    }
  },
  actions: {}
});
