import { requestAuthJSON } from "@/services/fetch-wrapper.js";

const getCategories = () => {
  return requestAuthJSON(`categories`);
};

const getSubCategories = () => {
  return requestAuthJSON(`sub_categories`);
};

const getUnits = () => {
  return requestAuthJSON(`units`);
};

const getPackagings = () => {
  return requestAuthJSON(`packagings`);
};

export { getCategories, getSubCategories, getUnits, getPackagings };
