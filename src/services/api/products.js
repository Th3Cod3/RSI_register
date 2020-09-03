import { requestAuthJSON, setURLString } from "@/services/fetch-wrapper.js";

const changeProductPrice = formData => {
  return requestAuthJSON("product/price", {
    method: "POST",
    body: formData
  });
};

const changeProductDiscount = formData => {
  return requestAuthJSON("/product/discount", {
    method: "POST",
    body: formData
  });
};

const addProductStock = formData => {
  return requestAuthJSON("/product/stock", {
    method: "POST",
    body: formData
  });
};

const saveProduct = formData => {
  return requestAuthJSON("product", {
    method: "POST",
    body: formData
  });
};

const getProducts = formData => {
  return requestAuthJSON(`product/all?${setURLString(formData)}`);
};

const getProduct = (id, formData) => {
  return requestAuthJSON(`product/${id}?${setURLString(formData)}`);
};

export {
  changeProductPrice,
  changeProductDiscount,
  addProductStock,
  saveProduct,
  getProducts,
  getProduct
};
