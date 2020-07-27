import { createInvoices } from "@/services/api-service";

export default {
  namespaced: true,
  state: {
    items: [],
    selectedItems: [],
    paidAmount: "",
    invoiceNumber: "",
    date: ""
  },
  mutations: {
    RESTORE_CAR_SHOP(state) {
      state.selectedItems = [];
      state.invoiceNumber = "";
      state.date = "";
    },
    SUCCESS_INVOICE(state, invoice) {
      state.invoiceNumber = invoice.invoiceNumber;
      state.date = invoice.date;
    },
    CHANGE_QUANTITY(state, payload) {
      let index = state.selectedItems.findIndex(item => item.id === payload.id);
      if (payload.quantity == 0) {
        state.selectedItems.splice(index, 1);
      } else {
        state.selectedItems[index].quantity = payload.quantity;
      }
    },
    ADD_ITEM(state, product) {
      let item = state.selectedItems.findIndex(item => item.id === product.id);
      if (item !== -1) {
        state.selectedItems[item].quantity++;
      } else {
        state.selectedItems.unshift({
          ...product,
          quantity: 1
        });
      }
    }
  },
  actions: {
    submitCarShop({ commit }, formData) {
      return createInvoices(formData).then(response => {
        if (response.invoice_number) {
          commit("SUCCESS_INVOICE", {
            invoiceNumber: response.invoice_number,
            date: response.date
          });
          return response;
        }
      });
    }
  }
};
