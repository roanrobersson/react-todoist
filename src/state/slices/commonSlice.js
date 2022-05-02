import { createSlice } from "@reduxjs/toolkit";
import { put, take, all } from "redux-saga/effects";
import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  TOGGLE_SELECTED_PROJECT,
} from "./projectsSlice";
import { FETCH_TASKS, FETCH_TASKS_SUCCESS } from "./tasksSlice";

export function* onAuthorized(action) {
  yield put(FETCH_INITIAL_DATA());
}

export function* onRequestInitialData(action) {
  yield all([
    yield put(FETCH_PROJECTS()),
    yield put(FETCH_TASKS()),
  ]);
  yield put(FETCH_INITIAL_DATA_SUCCESS());
  //yield put(TOGGLE_SELECTED_PROJECT());
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

export const { FETCH_INITIAL_DATA, FETCH_INITIAL_DATA_SUCCESS } =
  commonSlice.actions;
export default commonSlice.reducer;
