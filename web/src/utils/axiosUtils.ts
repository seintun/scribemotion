import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8000/api";

// Use js-cookie to get the CSRF token
const getCsrfToken = (): string | undefined => {
  return Cookies.get("csrftoken");
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add CSRF token in the headers
// https://axios-http.com/docs/interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
