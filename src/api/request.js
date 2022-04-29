import axios from 'axios';
import { API_URL } from 'core/configs/env';
import { isRefreshTokenValid } from './auth';
import { getSessionData, replaceSessionData } from '../lib/storage';
import { AUTH_URL, TOKEN_URL, CLIENT_ID, CLIENT_SECRET } from 'core/configs/env.js';

const apiBasicAuthCredentials = `${CLIENT_ID}:${CLIENT_SECRET}`;

export const request = (config) => {
  const headers = {
    Authorization: `Basic ${window.btoa(apiBasicAuthCredentials)}`,
    'Content-Type': 'application/json;charset=UTF-8',
  };

  return axios({
    headers,
    baseURL: API_URL,
    ...config,
  });
};

export const privateRequest = (config) => {
  const headers = {
    Authorization: `Bearer ${getSessionData()?.accessToken}`,
  };

  return request({ ...config, headers });
};

export const loginRequest = (config) => {
  const headers = {
    Authorization: `Basic ${window.btoa(apiBasicAuthCredentials)}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  };

  return request({ ...config, headers });
};

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (err) => {
//     const originalRequest = err.response.config;

//     if (err.response?.status === 401 && !isRefreshTokenValid()) {
//       window.dirtLogout = true;
//       return Promise.reject(err);
//     }

//     if (
//       err.response?.status === 401 &&
//       !originalRequest.__isRetry &&
//       !originalRequest.__isTryRefreshToken
//     ) {
//       originalRequest.__isRetry = true;

//       try {
//         const response = await refreshAccessToken();
//         replaceSessionData(response.data);
//         console.warn('Access token refreshed');
//         return privateRequest(originalRequest);
//       } catch (_error) {
//         window.dirtLogout = true;
//         console.error('Access token expirated');
//         return Promise.reject(_error);
//       }
//     }

//     return Promise.reject(err);
//   }
// );
