import { requestJSON, requestAuthJSON } from "@/services/fetch-wrapper.js";

const loginRequest = formData => {
  return requestJSON(`login`, {
    method: "POST",
    body: formData
  });
};

const status = () => {
  return requestAuthJSON("tatus").then(res => res.json());
};

export { loginRequest, status };
