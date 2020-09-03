import {
  getInvoices,
  getInvoice,
  getInvoiceItems,
  updateInvoice,
  voidInvoice,
  updateInvoiceItem
} from "@/services/api/invoices";

export default {
  namespaced: true,
  state: {
    invoices: [],
    invoice: {},
    items: [],
    requestId: 0,
    receiveId: 0,
    isLoading: false
  },
  mutations: {
    SET_INVOICES(state, value) {
      state.invoices = value;
    },
    SET_ITEMS(state, items) {
      state.items = items;
    },
    SET_INVOICE(state, invoice) {
      state.invoice = invoice;
    },
    MAKE_REQUEST(state, value) {
      state.isLoading = value;
      if (value) {
        state.requestId++;
      }
    }
  },
  actions: {
    getInvoice({ commit }, id) {
      return getInvoice(id).then(invoice => {
        commit("SET_INVOICE", invoice);
        return invoice;
      });
    },
    voidInvoice({ commit }, formData) {
      return voidInvoice(formData).then(invoice => {
        commit("SET_INVOICE", invoice);
        return invoice;
      });
    },
    updateInvoice({ commit }, formData) {
      return updateInvoice(formData).then(invoice => {
        commit("SET_INVOICE", invoice);
        return invoice;
      });
    },
    updateItem({ commit, state }, formData) {
      updateInvoiceItem(formData).then(item => {
        let items = state.items.map(item_i => {
          if (item_i.id == item.id) {
            item_i = item;
          }
          return item_i;
        });
        commit("SET_ITEMS", items);
      });
    },
    getItems({ commit }, formData) {
      return getInvoiceItems(formData).then(items => {
        commit("SET_ITEMS", items);
        return items;
      });
    },
    getInvoices({ commit, state }, formData) {
      commit("MAKE_REQUEST", true);
      formData.set("request_id", state.requestId);
      return getInvoices(formData).then(response => {
        if (response.request_id >= state.requestId) {
          commit("MAKE_REQUEST", false);
          commit("SET_INVOICES", response.invoices);
        }
        return response;
      });
    }
  }
};
