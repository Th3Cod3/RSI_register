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
    loadingItems: true
  },
  getters: {
    total() {}
  },
  mutations: {
    filter(state, payload) {
      state.filter = payload;
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
