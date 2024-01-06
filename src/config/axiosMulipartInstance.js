import axios from "axios";
import { BASE_API_URL } from "utils/constants";

const instance = axios.create({
  BASE_API_URL
});

instance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Content-Type'] = "multipart/form-data";
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;