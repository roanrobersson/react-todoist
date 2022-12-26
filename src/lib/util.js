import { AUTH_URL, CLIENT_ID, AUTH_SCOPE, AUTH_STATE } from "@/configs/env.js";
import colors from "@/configs/objectColors.js";

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

export const clearAllParamsFromActualURL = () => {
  window.history.replaceState(null, null, window.location.pathname);
};

export const getColorHexByKey = (key = "grey") => {
  return colors[key].code;
};

export const getColorNameByKey = (key = "grey") => {
  return colors[key].name;
};

export const getColorsAsObjects = () => {
  return Object.keys(colors).map((key) => {
    const colorObj = colors[key];
    return { key: key, name: colorObj.name, code: colorObj.code };
  });
};

export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
