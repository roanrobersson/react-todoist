import { createSlice } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import getApi from "@/api/todoistApi.js";

export function* requestProjects() {
  try {
    const response = yield call(() => getApi().getProjects());
    yield put(FETCH_PROJECTS_SUCCESS(response));
  } catch (error) {
    yield put(FETCH_PROJECTS_ERROR());
  }
}

export function* onReceiveProjects(action) {
  yield put(SET_PROJECTS(action.payload));
}

const initialState = {
  data: [],
  loading: false,
  error: false,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {
    FETCH_PROJECTS: (state) => {
      state.loading = true;
      state.error = false;
    },
    FETCH_PROJECTS_SUCCESS: (state) => {
      state.loading = true;
    },
    SET_PROJECTS: (state, action) => {
      state.data = action.payload;
    },
    FETCH_PROJECTS_ERROR: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  SET_PROJECTS,
  FETCH_PROJECTS_ERROR,
} = projectsSlice.actions;
export default projectsSlice.reducer;