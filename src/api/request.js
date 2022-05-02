import axios from "axios";
import { API_URL, CLIENT_ID, CLIENT_SECRET } from "@/configs/env.js";

const apiBasicAuthCredentials = `${CLIENT_ID}:${CLIENT_SECRET}`;

export const request = (config) => {
  const headers = {
    Authorization: `Basic ${window.btoa(apiBasicAuthCredentials)}`,
    "Content-Type": "application/json;charset=UTF-8",
  };

  return axios({
    headers,
    baseURL: API_URL,
    ...config,
  });
};

export const tokenRequest = (authCode) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };

  return request({
    url: "/oauth/access_token",
    method: "POST",
    headers,
    data: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: authCode,
    }),
  });
};
