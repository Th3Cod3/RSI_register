import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    invoices: [],
    selectedItems: [],
    filter: {
      productName: "",
      barcode: ""
    },
    loadingItems: true,
    login: {
      user: "",
      token: "",
      permissions: {}
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
    isLogin: false
  },
  getters: {
    totalFullPrice(state) {
      let total = 0;
      state.selectedItems.forEach(item => {
        total = Number(item.price) * Number(item.quantity) + total;
      });
      return total;
    },
    total(state) {
      let total = 0;
      state.selectedItems.forEach(item => {
        total =
          Number(item.price) *
            (Number(100 - item.discount) / 100) *
            Number(item.quantity) +
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
            Number(item.quantity) +
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
    logout(state) {
      state.isLogin = false;
      state.login = {
        user: "",
        token: "",
        permissions: {}
      };
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
      state.isLogin = true;
      state.loginForm.password = "";
      state.login = payload;
    },
    items(state, payload) {
      state.items = payload;
    },
    invoices(state, payload) {
      state.invoices = payload;
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
        state.selectedItems[item].quantity++;
      } else {
        state.selectedItems.unshift({
          quantity: 1,
          ...payload
        });
      }
    },
    changeItemQuantity(state, payload) {
      let index = state.selectedItems.findIndex(item => item.id === payload.id);
      if (payload.quantity == 0) {
        state.selectedItems.splice(index, 1);
      } else {
        state.selectedItems[index].quantity = payload.quantity;
      }
    }
  }
});
