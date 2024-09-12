import { COOKIE_KEY } from "@/constants/cookie-key";
import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL

const AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    'ngrok-skip-browser-warning': true,
    'Origin': window.location.origin,
  },
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const accessToken = Cookies.get(COOKIE_KEY.ACCESS_TOKEN)
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
// eslint-disable-next-line @typescript-eslint/no-explicit-any
AxiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const message = error.response.data.message
  if (Array.isArray(message)) {
    return Promise.reject({ message: message[0] });
  }
  return Promise.reject({ message });
});

export default AxiosInstance