import { createSlice } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { tokenRequest } from "@/api/request.js";
import { clearAllParamsFromActualURL } from "@/lib/util.js";

export function* requestToken(action) {
  try {
    const response = yield call(tokenRequest, [action.payload]);
    const token = response.data.access_token;
    yield localStorage.setItem("token", token);
    yield put(FETCH_TOKEN_SUCCESS(token));
  } catch (error) {
    clearAllParamsFromActualURL();
    yield put(FETCH_TOKEN_ERROR());
  }
}

export function* onReceiveToken(action) {
  yield put(AUTHORIZED(action.payload));
}

export function* onAuthorized(action) {
  yield window.dispatchEvent(
    new CustomEvent("new_token", { detail: action.payload })
  );
}

const initialState = {
  token: "",
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    FETCH_TOKEN: (state) => {
      state.loading = true;
      state.error = false;
    },
    FETCH_TOKEN_SUCCESS: (state) => {
      state.loading = false;
    },
    AUTHORIZED: (state, action) => {
      state.token = action.payload;
    },
    FETCH_TOKEN_ERROR: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  FETCH_TOKEN,
  FETCH_TOKEN_SUCCESS,
  AUTHORIZED,
  FETCH_TOKEN_ERROR,
} = authSlice.actions;
export default authSlice.reducer;
