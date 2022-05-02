import { createSlice } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import getApi from "@/api/todoistApi.js";
import { FETCH_TASKS } from "./tasksSlice.js";

export function* onRequestProjects() {
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

export function* onToggleSelectedProject(action) {
  yield put(FETCH_TASKS());
}

const initialState = {
  data: [],
  loading: false,
  error: false,
  selectedProject: null,
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
    TOGGLE_SELECTED_PROJECT: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
});

export const {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  SET_PROJECTS,
  FETCH_PROJECTS_ERROR,
  TOGGLE_SELECTED_PROJECT,
} = projectsSlice.actions;
export default projectsSlice.reducer;
