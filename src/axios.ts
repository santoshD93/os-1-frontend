import axios, { AxiosRequestConfig } from "axios";
import store2 from 'store2';
import { StorageKey } from './consts';

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    Authorization : `Bearer ${store2.get(StorageKey.Token)}`,
  }
});

API.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return {
      ...config,
      headers: {
        Authorization : `Bearer ${store2.get(StorageKey.Token)}`
      }
    };
  },
  error => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      store2.remove(StorageKey.Token);
    }

    return response;
  }, (error) => {
  return Promise.reject(error);
});