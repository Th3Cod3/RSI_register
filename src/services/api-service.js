import serviceConfig from "@/services/config.js";
import store from "@/store";

const apiService = {};

apiService.getProducts = () => {
  return fetch(`${serviceConfig.apiUrl}/products`).then(res => res.json());
};

apiService.getInvoices = () => {
  return fetch(`${serviceConfig.apiUrl}/invoices`, {
    headers: {
      Authorization: store.state.login.token
    }
  }).then(res => res.json());
};

apiService.createInvoices = formData => {
  formData.set("token", store.state.login.token);
  formData.set("user", store.state.login.user);
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
