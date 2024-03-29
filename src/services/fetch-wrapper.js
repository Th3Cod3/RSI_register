import {
  apiUrl,
  accessControlOrigin,
  accessControlHeader,
  accessControlMethods
} from "@/services/config.js";
import store from "@/store/index.js";
import router from "@/router";

const preProcessOptions = options => {
  const header = {
    Authorization: "Bearer " + store.state.user.token,
    "Access-Control-Request-Headers": accessControlHeader,
    "Access-Control-Allow-Origin": accessControlOrigin,
    "Access-Control-Request-Methods": accessControlMethods
  };
  if (options.headers) {
    options.headers = {
      ...header,
      ...options.headers
    };
  } else {
    options.headers = {
      ...header
    };
  }

  options = {
    mode: "cors",
    credentials: "include",
    ...options
  };

  return options;
};

const requestJSON = (request, options = {}) => {
  options = preProcessOptions(options);
  return fetch(`${apiUrl}/${request}`, {
    ...options
  }).then(res => {
    if (res.status == 200) {
      return res.json();
    } else {
      throw res;
    }
  });
};

const requestAuthJSON = (request, options = {}) => {
  options = preProcessOptions(options);
  return fetch(`${apiUrl}/${request}`, {
    ...options
  }).then(res => {
    if (res.status == 200) {
      return res.json();
    } else if (res.status == 401) {
      router.push({ name: "logout" });
      throw res;
    } else {
      throw res;
    }
  });
};

const setURLString = formData => {
  let params = new URLSearchParams(formData);
  return params.toString();
};

export { requestJSON, requestAuthJSON, setURLString };
