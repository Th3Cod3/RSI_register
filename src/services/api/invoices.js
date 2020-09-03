import { requestAuthJSON, setURLString } from "@/services/fetch-wrapper.js";

const getInvoice = id => {
  return requestAuthJSON(`invoice/${id}`);
};

const getInvoices = formData => {
  return requestAuthJSON(`invoice/all?${setURLString(formData)}`);
};

const getInvoiceItems = formData => {
  return requestAuthJSON(`invoice/items?${setURLString(formData)}`);
};

const createInvoices = formData => {
  return requestAuthJSON("invoice", {
    method: "POST",
    body: formData
  });
};

const updateInvoice = formData => {
  return requestAuthJSON("invoice/update", {
    method: "POST",
    body: formData
  });
};

const voidInvoice = formData => {
  return requestAuthJSON("invoice/void", {
    method: "POST",
    body: formData
  });
};

const updateInvoiceItem = formData => {
  return requestAuthJSON("invoice/update_item", {
    method: "POST",
    body: formData
  });
};

export {
  getInvoice,
  getInvoices,
  getInvoiceItems,
  createInvoices,
  updateInvoice,
  voidInvoice,
  updateInvoiceItem
};
