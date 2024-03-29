import { createInvoices } from "@/services/api/invoices";

const buyerDefaultValue = () => ({
  full_name: "",
  birthdate: "",
  contact_info: ""
})

export default {
  namespaced: true,
  state: {
    items: [],
    selectedItems: [],
    paidAmount: "",
    invoiceNumber: "",
    buyerInfo: {
      full_name: "",
      birthdate: "",
      contact_info: ""
    },
    date: "",
    checkout: false
  },
  mutations: {
    RESTORE_CAR_SHOP(state) {
      state.buyerInfo = buyerDefaultValue();
      state.selectedItems = [];
      state.invoiceNumber = "";
      state.date = "";
      state.checkout = false;
    },
    SUCCESS_INVOICE(state, invoice) {
      state.buyerInfo = invoice.buyerInfo;
      state.invoiceNumber = invoice.invoiceNumber;
      state.date = invoice.date;
      state.checkout = true;
    },
    CHANGE_QUANTITY(state, payload) {
      let index = state.selectedItems.findIndex(item => item.id === payload.id);
      if (payload.quantity == 0) {
        state.selectedItems.splice(index, 1);
      } else {
        let product = state.selectedItems[index];
        product.quantity = payload.quantity;
        state.selectedItems.splice(index, 1, product);
      }
    },
    CHANGE_FIXED_PRICE(state, payload) {
      let index = state.selectedItems.findIndex(item => item.id === payload.id);
      if (payload.price != state.selectedItems[index].price) {
        let product = state.selectedItems[index];
        product = {
          ...product,
          price: payload.price,
          discount: 0,
          fixed: 1
        };
        state.selectedItems.splice(index, 1, product);
      }
    },
    ADD_ITEM(state, product) {
      let index = state.selectedItems.findIndex(item => item.id === product.id);
      if (index !== -1) {
        let product = state.selectedItems[index];
        product.quantity++;
        state.selectedItems.splice(index, 1, product);
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
            buyerInfo: {
              full_name: formData.get("full_name"),
              birthdate: formData.get("birthdate"),
              contact_info: formData.get("contact_info")
            },
            invoiceNumber: response.invoice_number,
            date: response.date
          });
          return response;
        }
      });
    }
  }
};
