const appUrl = import.meta.env.VITE_APP_URL;
const apiUrl = import.meta.env.VITE_API_URL;
const accessControlOrigin = import.meta.env.VITE_ACCESS_CONTROL_ORIGIN;
const accessControlHeader = import.meta.env.VITE_ACCESS_CONTROL_HEADER;
const accessControlMethods = import.meta.env.VITE_ACCESS_CONTROL_METHODS;

export {
  appUrl,
  apiUrl,
  accessControlOrigin,
  accessControlHeader,
  accessControlMethods
};
