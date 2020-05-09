import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [
      {
        id: 1,
        name: "Lays",
        barcode: "123456789",
        price: 2.5,
        type: "consumable",
        stock: 10
      },
      {
        id: 2,
        name: "Doritos",
        barcode: "12345679",
        price: 2.5,
        type: "consumable",
        stock: 10
      },
      {
        id: 3,
        name: "Coors Light Beer Bottle",
        barcode: "65465406",
        price: 2.5,
        type: "consumable",
        stock: 10
      },
      {
        id: 4,
        name: "Master Of Mixed, Extra Spicy Bloody Mary Mixer",
        barcode: "6215161546",
        price: 2.5,
        type: "consumable",
        stock: 10
      }
    ],
    selectedItems: [],
    filter: {
      productName: "",
      barcode: ""
    }
  },
  getters: {
    total() {
      
    }
  },
  mutations: {
    filter(state, payload) {
      state.filter = payload;
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
