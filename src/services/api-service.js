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

const setURLString = formData => {
  let params = new URLSearchParams(formData);
  return params.toString();
};

apiService.getProducts = formData => {
  let params = setURLString(formData);
  if (params) {
    params = "?" + params;
  }
  return fetch(`${serviceConfig.apiUrl}/products${params}`).then(res =>
    res.json()
  );
};

apiService.getInvoice = id => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/invoice/${id}?${setURLString(formData)}`
  ).then(res => res.json());
};

apiService.getInvoices = formData => {
  formData = setToken(formData);
  return fetch(
    `${serviceConfig.apiUrl}/invoices?${setURLString(formData)}`
  ).then(res => res.json());
};

apiService.getInvoiceItems = formData => {
  formData = setToken(formData);
  return fetch(
    `${serviceConfig.apiUrl}/invoice_items?${setURLString(formData)}`
  ).then(res => res.json());
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
