import serviceConfig from "@/services/config.js";
import store from "@/store.js";

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
  return fetch(`${serviceConfig.apiUrl}/product/all${params}`).then(res =>
    res.json()
  );
};

apiService.status = () => {
  let params = setURLString(setToken());
  return fetch(`${serviceConfig.apiUrl}/status?${params}`).then(res =>
    res.json()
  );
};

apiService.saveProduct = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/product`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

apiService.getInvoice = id => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/invoice/${id}?${setURLString(formData)}`
  ).then(res => res.json());
};

apiService.getProduct = id => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/product/${id}?${setURLString(formData)}`
  ).then(res => res.json());
};

apiService.getInvoices = formData => {
  formData = setToken(formData);
  return fetch(
    `${serviceConfig.apiUrl}/invoice/all?${setURLString(formData)}`
  ).then(res => res.json());
};

apiService.getInvoiceItems = formData => {
  formData = setToken(formData);
  return fetch(
    `${serviceConfig.apiUrl}/invoice/items?${setURLString(formData)}`
  ).then(res => res.json());
};

apiService.createInvoices = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/invoice`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

apiService.updateInvoice = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/invoice/update`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

apiService.changeProductPrice = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/product/price`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

apiService.changeProductDiscount = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/product/discount`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

apiService.addProductStock = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/product/stock`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

apiService.voidInvoice = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/invoice/void`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

apiService.updateInvoiceItem = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/invoice/update_item`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

apiService.getCategories = () => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/categories?${setURLString(formData)}`
  ).then(res => res.json());
};

apiService.getSubCategories = () => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/sub_categories?${setURLString(formData)}`
  ).then(res => res.json());
};

apiService.getUnits = () => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/units?${setURLString(formData)}`
  ).then(res => res.json());
};

apiService.getPackagings = () => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/packagings?${setURLString(formData)}`
  ).then(res => res.json());
};

apiService.login = formData => {
  return fetch(`${serviceConfig.apiUrl}/login`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

export default apiService;
