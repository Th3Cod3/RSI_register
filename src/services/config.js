const env = import.meta.env;
const appUrl = env.VITE_APP_URL;
const apiUrl = env.VITE_API_URL;
const accessControlOrigin = env.VITE_ACCESS_CONTROL_ORIGIN;
const accessControlHeader = env.VITE_ACCESS_CONTROL_HEADER;
const accessControlMethods = env.VITE_ACCESS_CONTROL_METHODS;

export {
  appUrl,
  apiUrl,
  accessControlOrigin,
  accessControlHeader,
  accessControlMethods
};
