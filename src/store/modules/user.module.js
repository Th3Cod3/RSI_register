import { loginRequest, status } from "@/services/api-service.js";

export default {
  namespaced: true,
  state: {
    user: "",
    token: "",
    username: "",
    permissions: {},
    isLogin: false,
    isInitialize: false
  },
  mutations: {
    LOGOUT(state) {
      state.isLogin = false;
      state.username = "";
      state.token = "";
      state.permissions = {};
      localStorage.removeItem("token");
    },
    SUCCESS_LOGIN(state, payload) {
      state.isLogin = true;
      state.token = payload.token;
      state.username = payload.username;
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    SUCCESS_INITIALIZE(state, payload) {
      state.isLogin = true;
      state.token = localStorage.getItem("token");
      state.username = payload.username;
    }
  },
  actions: {
    login({ commit }, formData) {
      return loginRequest(formData).then(response => {
        if (response.api_token) {
          commit("SUCCESS_LOGIN", {
            token: response.api_token,
            username: formData.get("user")
          });
        }
        return response;
      });
    },
    initialize({ commit }) {
      let token = localStorage.getItem("token");
      if (token) {
        status(token).then(response => {
          if (response.status) {
            commit("SUCCESS_INITIALIZE", response);
          } else {
            localStorage.removeItem("token");
          }
        });
      }
    },
    logout({ commit }) {
      commit("LOGOUT");
      return;
    }
  }
};
