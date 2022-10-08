import { requestAuthJSON, setURLString } from "@/services/fetch-wrapper.js";

const getInventories = formData => {
  return requestAuthJSON(`inventory/all?${setURLString(formData)}`);
};

const getInventory = id => {
  return requestAuthJSON(`inventory/${id}`);
};

export { getInventories, getInventory };
