import { createSlice } from "@reduxjs/toolkit";
import { put, take, all, race, select } from "redux-saga/effects";
import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_ERROR,
  TOGGLE_SELECTED_PROJECT,
} from "./projectsSlice";
import {
  FETCH_TASKS,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_ERROR,
} from "./tasksSlice";

export function* onAuthorized(action) {
  yield put(FETCH_INITIAL_DATA());
}

export function* onRequestInitialData(action) {
  yield put(FETCH_PROJECTS());
  yield put(FETCH_TASKS());

  const { response, cancel } = yield race({
    response: all([
      take(FETCH_PROJECTS_SUCCESS.type),
      take(FETCH_TASKS_SUCCESS.type),
    ]),
    cancel: take([FETCH_PROJECTS_ERROR.type, FETCH_TASKS_ERROR.type]),
  });

  yield response
    ? put(FETCH_INITIAL_DATA_SUCCESS())
    : put(FETCH_INITIAL_DATA_ERROR());
}

export function* onRequestInitialDataSuccess(action) {
  // const selectedProject = yield select(
  //   (state) => state.projects.selectedProject
  // );
  // if (selectedProject != null) return;
  // const inboxProject = yield select((state) => state.projects.inboxProject);
  // yield put(TOGGLE_SELECTED_PROJECT(inboxProject.id));
}

const initialState = {
  initialData: {
    loading: false,
    error: false,
  },
};

export const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    FETCH_INITIAL_DATA: (state) => {
      state.initialData.loading = true;
      state.error = false;
    },
    FETCH_INITIAL_DATA_SUCCESS: (state) => {
      state.initialData.loading = false;
    },
    FETCH_INITIAL_DATA_ERROR: (state) => {
      state.initialData.loading = false;
      state.initialData.error = true;
    },
  },
});

export const {
  FETCH_INITIAL_DATA,
  FETCH_INITIAL_DATA_SUCCESS,
  FETCH_INITIAL_DATA_ERROR,
} = commonSlice.actions;
export default commonSlice.reducer;
