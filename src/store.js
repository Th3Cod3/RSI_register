import Vue from "vue";
import Vuex from "vuex";
import apiService from "@/services/api-service.js";
import { backendError, fetchError } from "@/services/error-handler.js";

Vue.use(Vuex);
const changeModal = (state, option, value) => {
  switch (option) {
    case "add-product":
      state.modals.product.add = value;
      break;
  }
};

export default new Vuex.Store({
  state: {
    items: [],
    product: {},
    invoices: [],
    invoice: {},
    invoiceItems: [],
    selectedItems: [],
    options: {
      categories: [],
      subCategories: [],
      packagings: [],
      units: []
    },
    productFilter: {
      productName: "",
      barcode: ""
    },
    invoiceFilter: {
      invoiceNumber: ""
    },
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
    modals: {
      product: {
        add: false
      }
    },
    isLoading: true,
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
    initializeStore(state) {
      let login = false; // localStorage.getItem("login");
      if (login) {
        state.login = JSON.parse(login);
        state.isLogin = true;
      }
    },
    openModal(state, option) {
      changeModal(state, option, true);
    },
    closeModal(state, option) {
      changeModal(state, option, false);
    },
    logout(state) {
      state.isLogin = false;
      state.login = {
        user: "",
        token: "",
        permissions: {}
      };
      localStorage.removeItem("login");
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
    product(state, product) {
      state.product = product;
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
      localStorage.setItem("login", JSON.stringify(state.login));
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
    isLoading(state, payload) {
      state.isLoading = payload;
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
    },
    categories(state, categories) {
      state.options.categories = categories;
    },
    units(state, units) {
      state.options.units = units;
    },
    subCategories(state, subCategories) {
      state.options.subCategories = subCategories;
    },
    packagings(state, packagings) {
      state.options.packagings = packagings;
    }
  },
  actions: {
    categories({ commit }) {
      apiService.getCategories().then(categories => {
        commit("categories", categories);
      });
    },
    subCategories({ commit }) {
      apiService.getSubCategories().then(subCategories => {
        commit("subCategories", subCategories);
      });
    },
    units({ commit }) {
      apiService.getUnits().then(units => {
        commit("units", units);
      });
    },
    packagings({ commit }) {
      apiService.getPackagings().then(packagings => {
        commit("packagings", packagings);
      });
    },
    saveProduct(context, formData) {
      return new Promise((resolve, reject) => {
        apiService
          .saveProduct(formData)
          .then(result => {
            if (result.error) {
              backendError(result.error);
              reject(result.error);
            } else {
              resolve(result);
            }
          })
          .catch(error => {
            fetchError(error);
          });
      });
    },
    getProduct({ commit }, id) {
      apiService
        .getProduct(id)
        .then(data => {
          commit("product", data);
        })
        .finally(() => {
          commit("isLoading", false);
        })
        .catch(error => {
          fetchError(error);
        });
    }
  }
});
