const apiUrl = process.env.VUE_APP_API_URL;
const accessControlOrigin = process.env.VUE_APP_ACCESS_CONTROL_ORIGIN;
const accessControlHeader = process.env.VUE_APP_ACCESS_CONTROL_HEADER;
const accessControlMethods = process.env.VUE_APP_ACCESS_CONTROL_METHODS;

export {
  apiUrl,
  accessControlOrigin,
  accessControlHeader,
  accessControlMethods
};
