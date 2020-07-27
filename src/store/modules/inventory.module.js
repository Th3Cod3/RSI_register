import { getInventories, getInventory } from "@/services/api-service.js";

export default {
  namespaced: true,
  state: {
    inventories: [],
    inventory: {},
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
    SET_INVENTORIES(state, value) {
      state.inventories = value;
    },
    SET_INVENTORY(state, value) {
      state.inventory = value;
    }
  },
  actions: {
    getInventory({ commit, state }, id) {
      let preReloadId = state.inventories.findIndex(
        inventory => inventory.inventory_id == id
      );
      preReloadId !== -1
        ? commit("SET_INVENTORY", state.inventories[preReloadId])
        : commit("SET_INVENTORY", { inventory_id: "loading" });
      return getInventory(id).then(inventory => {
        commit("SET_INVENTORY", inventory);
        return inventory;
      });
    },
    getInventories({ commit, state }, formData) {
      commit("MAKE_REQUEST", true);
      formData.set("request_id", state.requestId);
      return getInventories(formData).then(response => {
        if (response.request_id >= state.requestId) {
          commit("MAKE_REQUEST", false);
          commit("SET_INVENTORIES", response.inventories);
        }
        return response;
      });
    }
  }
};
