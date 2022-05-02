import { createSlice } from "@reduxjs/toolkit";
import { put, take, all } from "redux-saga/effects";
import { FETCH_PROJECTS, FETCH_PROJECTS_SUCCESS } from "./projectsSlice";

export function* onAuthorized(action) {
  yield put(FETCH_INITIAL_DATA());
}

export function* requestInitialData(action) {
  yield put(FETCH_PROJECTS());
  yield all([
    yield take(FETCH_PROJECTS_SUCCESS.type),
  ])
  yield put(FETCH_INITIAL_DATA_SUCCESS());
}

const initialState = {
  loadingInitialData: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    FETCH_INITIAL_DATA: (state) => {
      state.loadingInitialData = true;
    },
    FETCH_INITIAL_DATA_SUCCESS: (state) => {
      state.loadingInitialData = false;
    },
  },
});

export const { FETCH_INITIAL_DATA, FETCH_INITIAL_DATA_SUCCESS } = commonSlice.actions;
export default commonSlice.reducer;
