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
    invoiceInfo: {
      invoiceNumber: "",
      date: ""
    },
    paidAmount: 0,
    totalAmount: 0,
    successLogin: false
  },
  getters: {
    totalFullPrice(state) {
      let total = 0;
      state.selectedItems.forEach(item => {
        total = Number(item.price) * Number(item.amount) + total;
      });
      return total;
    },
    total(state) {
      let total = 0;
      state.selectedItems.forEach(item => {
        total =
          Number(item.price) *
            (Number(100 - item.discount) / 100) *
            Number(item.amount) +
          total;
      });
      state.totalAmount = total;
      return total;
    },
    totalDiscount(state) {
      let total = 0;
      state.selectedItems.forEach(item => {
        total =
          Number(item.price) *
            (Number(item.discount) / 100) *
            Number(item.amount) +
          total;
      });
      return total;
    },
    change(state) {
      if (state.paidAmount < state.totalAmount) {
        return 0;
      }
      return Number(state.paidAmount) - Number(state.totalAmount);
    }
  },
  mutations: {
    filter(state, payload) {
      state.filter = payload;
    },
    filterBarcode(state, payload) {
      state.filter.barcode = payload;
    },
    inputLogin(state, payload) {
      state.loginForm = payload;
    },
    paidAmount(state, payload) {
      state.paidAmount = payload;
    },
    invoiceInfo(state, payload) {
      state.invoiceInfo = payload;
    },
    login(state, payload) {
      state.successLogin = true;
      state.loginForm.password = "";
      state.login = payload;
    },
    items(state, payload) {
      state.items = payload;
    },
    loadingItems(state, payload) {
      state.loadingItems = payload;
    },
    restoreInvoice(state) {
      state.selectedItems = [];
      state.invoiceInfo = {
        invoiceNumber: "",
        date: ""
      };
    },
    clearSearch(state) {
      state.filter = {
        productName: "",
        barcode: ""
      };
    },
    addItemToCart(state, payload) {
      let item = state.selectedItems.findIndex(item => item.id === payload.id);
      if (item !== -1) {
        state.selectedItems[item].amount++;
      } else {
        state.selectedItems.unshift({
          amount: 1,
          ...payload
        });
      }
    },
    changeItemAmount(state, payload) {
      let index = state.selectedItems.findIndex(item => item.id === payload.id);
      if (payload.amount == 0) {
        state.selectedItems.splice(index, 1);
      } else {
        state.selectedItems[index].amount = payload.amount;
      }
    }
  }
});
