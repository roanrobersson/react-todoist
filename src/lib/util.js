import { AUTH_URL, CLIENT_ID, AUTH_SCOPE, AUTH_STATE } from "@/configs/env.js";

const REDIRECT_TO_AUTH_DELAY = 2000;

export const redirectToAuth = (withDelay = false) => {
  let authUrl = new URL(AUTH_URL);
  authUrl.searchParams.append("client_id", CLIENT_ID);
  authUrl.searchParams.append("scope", AUTH_SCOPE);
  authUrl.searchParams.append("state", AUTH_STATE);
  if (withDelay) {
    setTimeout(() => {
      window.location.href = authUrl;
    }, REDIRECT_TO_AUTH_DELAY);
  } else {
    window.location.href = authUrl;
  }
};

export const getParamFromActualURL = (paramName) => {
  const actualURL = new URL(window.location.href);
  return actualURL.searchParams.get(paramName);
};

export const clearAllParamsFromActualURL = () => {
  window.history.replaceState(null, null, window.location.pathname);
};
