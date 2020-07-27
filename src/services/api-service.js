import serviceConfig from "@/services/config.js";
import store from "@/store/index.js";

const setToken = formData => {
  if (!formData) {
    formData = new FormData();
  }
  formData.set("token", store.state.user.token);
  formData.set("user", store.state.user.username);
  return formData;
};

const setURLString = formData => {
  let params = new URLSearchParams(formData);
  return params.toString();
};

const getProducts = formData => {
  formData = setToken(formData);
  return fetch(
    `${serviceConfig.apiUrl}/product/all?${setURLString(formData)}`
  ).then(res => res.json());
};

const getInventories = formData => {
  formData = setToken(formData);
  return fetch(
    `${serviceConfig.apiUrl}/inventory/all?${setURLString(formData)}`
  ).then(res => res.json());
};

const status = (token = null) => {
  let params = token ? setURLString(setToken()) : "token=" + token;
  return fetch(`${serviceConfig.apiUrl}/status?${params}`).then(res =>
    res.json()
  );
};

const saveProduct = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/product`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

const getInvoice = id => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/invoice/${id}?${setURLString(formData)}`
  ).then(res => res.json());
};

const getInventory = id => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/inventory/${id}?${setURLString(formData)}`
  ).then(res => res.json());
};

const getProduct = id => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/product/${id}?${setURLString(formData)}`
  ).then(res => res.json());
};

const getInvoices = formData => {
  formData = setToken(formData);
  return fetch(
    `${serviceConfig.apiUrl}/invoice/all?${setURLString(formData)}`
  ).then(res => res.json());
};

const getInvoiceItems = formData => {
  formData = setToken(formData);
  return fetch(
    `${serviceConfig.apiUrl}/invoice/items?${setURLString(formData)}`
  ).then(res => res.json());
};

const createInvoices = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/invoice`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

const updateInvoice = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/invoice/update`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

const changeProductPrice = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/product/price`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

const changeProductDiscount = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/product/discount`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

const addProductStock = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/product/stock`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

const voidInvoice = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/invoice/void`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

const updateInvoiceItem = formData => {
  setToken(formData);
  return fetch(`${serviceConfig.apiUrl}/invoice/update_item`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

const getCategories = () => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/categories?${setURLString(formData)}`
  ).then(res => res.json());
};

const getSubCategories = () => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/sub_categories?${setURLString(formData)}`
  ).then(res => res.json());
};

const getUnits = () => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/units?${setURLString(formData)}`
  ).then(res => res.json());
};

const getPackagings = () => {
  let formData = setToken();
  return fetch(
    `${serviceConfig.apiUrl}/packagings?${setURLString(formData)}`
  ).then(res => res.json());
};

const loginRequest = formData => {
  return fetch(`${serviceConfig.apiUrl}/login`, {
    method: "POST",
    body: formData
  }).then(res => res.json());
};

export {
  getProducts,
  getInventories,
  getInventory,
  status,
  saveProduct,
  getInvoice,
  getProduct,
  getInvoices,
  getInvoiceItems,
  createInvoices,
  updateInvoice,
  changeProductPrice,
  changeProductDiscount,
  addProductStock,
  voidInvoice,
  updateInvoiceItem,
  getCategories,
  getSubCategories,
  getUnits,
  getPackagings,
  loginRequest
};
