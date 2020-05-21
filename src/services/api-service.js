import serviceConfig from "@/services/config.js";
import store from "@/store";

const apiService = {};

const setToken = formData => {
  if (!formData) {
    formData = new FormData();
  }
  formData.set("token", store.state.login.token);
  formData.set("user", store.state.login.user);
  return formData;
};

const setURLToken = () => {
  return `token=${store.state.login.token}&user=${store.state.login.user}`;
};

apiService.getProducts = () => {
  return fetch(`${serviceConfig.apiUrl}/products`).then(res => res.json());
};

apiService.getInvoices = () => {
  return fetch(`${serviceConfig.apiUrl}/invoices?${setURLToken()}`).then(res =>
    res.json()
  );
};

apiService.createInvoices = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/invoice`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

apiService.login = formData => {
  return fetch(`${serviceConfig.apiUrl}/login`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

export default apiService;
