import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    invoices: [],
    invoice: {},
    invoiceItems: [],
    selectedItems: [],
    productFilter: {
      productName: "",
      barcode: ""
    },
    invoiceFilter: {
      invoiceNumber: ""
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
    isLogin: false
  },
  getters: {
    totalInvoice(state) {
      let total = 0;
      state.invoiceItems.forEach(item => {
        total += (item.price / ((100 - item.discount) / 100)) * item.quantity;
      });
      return total;
    },
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
    change(state, getters) {
      if (state.paidAmount < getters.total) {
        return 0;
      }
      return Number(state.paidAmount) - Number(getters.total);
    }
  },
  mutations: {
    logout(state) {
      state.isLogin = false;
      state.login = {
        user: "",
        token: "",
        permissions: {}
      };
    },
    invoiceFilter_invoiceNumber(state, invoiceNumber) {
      state.invoiceFilter.invoiceNumber = invoiceNumber;
    },
    productFilter_barcode(state, barcode) {
      state.productFilter.barcode = barcode;
    },
    productFilter_productName(state, productName) {
      state.productFilter.productName = productName;
    },
    inputLogin(state, payload) {
      state.loginForm = payload;
    },
    paidAmount(state, amount) {
      state.paidAmount = amount;
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
    invoiceItems(state, payload) {
      state.invoiceItems = payload;
    },
    invoice(state, payload) {
      state.invoice = payload;
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
