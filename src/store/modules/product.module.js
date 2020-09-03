import {
  getCategories,
  getSubCategories,
  getUnits,
  getPackagings
} from "@/services/api/generic";
import {
  saveProduct,
  getProduct,
  getProducts,
  changeProductPrice,
  changeProductDiscount,
  addProductStock
} from "@/services/api/products";

export default {
  namespaced: true,
  state: {
    products: [],
    product: {},
    details: {
      categories: [],
      subCategories: [],
      units: [],
      packagings: []
    },
    requestId: 0,
    isLoading: false
  },
  mutations: {
    MAKE_REQUEST(state, value) {
      state.isLoading = value;
      if (value) {
        state.requestId++;
      }
    },
    SET_PRODUCTS(state, value) {
      state.products = value;
    },
    SET_CATEGORIES(state, value) {
      state.details.categories = value;
    },
    SET_SUB_CATEGORIES(state, value) {
      state.details.subCategories = value;
    },
    SET_UNITS(state, value) {
      state.details.units = value;
    },
    SET_PACKAGINGS(state, value) {
      state.details.packagings = value;
    },
    SET_PRODUCT(state, value) {
      state.product = value;
    }
  },
  actions: {
    addPrice({ commit, state }, formData) {
      return changeProductPrice(formData).then(result => {
        let product = {
          ...state.product,
          price: formData.get("price")
        };
        commit("SET_PRODUCT", product);
        return result;
      });
    },
    addDiscount({ commit, state }, formData) {
      return changeProductDiscount(formData).then(result => {
        let product = {
          ...state.product,
          discount: formData.get("discount")
        };
        commit("SET_PRODUCT", product);
        return result;
      });
    },
    addStock({ commit, state }, formData) {
      return addProductStock(formData).then(result => {
        let product = {
          ...state.product,
          quantity: result.quantity
        };
        commit("SET_PRODUCT", product);
        return result;
      });
    },
    loadDetailsOptions({ commit }) {
      return Promise.all([
        getCategories(),
        getSubCategories(),
        getUnits(),
        getPackagings()
      ]).then(response => {
        commit("SET_CATEGORIES", response[0]);
        commit("SET_SUB_CATEGORIES", response[1]);
        commit("SET_UNITS", response[2]);
        commit("SET_PACKAGINGS", response[3]);
        return response;
      });
    },
    saveProduct(context, formData) {
      return saveProduct(formData).then(result => {
        return result;
      });
    },
    getProduct({ commit, state }, id) {
      let preReloadId = state.products.findIndex(product => product.id == id);
      preReloadId !== -1
        ? commit("SET_PRODUCT", state.products[preReloadId])
        : commit("SET_PRODUCT", { name: "loading" });
      return getProduct(id).then(product => {
        commit("SET_PRODUCT", product);
        return product;
      });
    },
    getProducts({ commit, state }, formData) {
      commit("MAKE_REQUEST", true);
      formData.set("request_id", state.requestId);
      return getProducts(formData).then(response => {
        if (response.request_id >= state.requestId) {
          commit("MAKE_REQUEST", false);
          commit("SET_PRODUCTS", response.products);
        }
        return response;
      });
    }
  }
};
