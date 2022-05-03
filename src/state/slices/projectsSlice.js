import { createSlice } from "@reduxjs/toolkit";
import { call, put, select } from "redux-saga/effects";
import getApi from "@/api/todoistApi.js";

export function* onRequestProjects() {
  try {
    const response = yield call(() => getApi().getProjects());
    yield put(FETCH_PROJECTS_SUCCESS(response));
  } catch (error) {
    yield put(FETCH_PROJECTS_ERROR());
  }
}

export function* onToggleSelectedProject(action) {}

export function* onAddProject(action) {
  try {
    const response = yield call(() => getApi().addProject(action.payload));
    yield put(ADD_PROJECT_SUCCESS(response));
  } catch (error) {
    yield put(ADD_PROJECT_ERROR());
  }
}

export function* onUpdateProject(action) {
  try {
    yield call(() => getApi().updateProject(action.payload.id, action.payload));
    yield put(UPDATE_PROJECT_SUCCESS(action.payload));
  } catch (error) {
    yield put(UPDATE_PROJECT_ERROR());
  }
}

export function* onDeleteProject(action) {
  try {
    yield call(() => getApi().deleteProject(action.payload));
    yield put(DELETE_PROJECT_SUCCESS(action.payload));
  } catch (error) {
    yield put(DELETE_PROJECT_ERROR());
  }
}

export function* onDeleteProjectSuccess(action) {
  const inboxProject = yield select((state) => state.projects.inboxProject);
  yield put(TOGGLE_SELECTED_PROJECT(inboxProject.id));
}

const initialState = {
  data: [],
  loading: false,
  error: false,
  selectedProject: null,
  inboxProject: null,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {
    FETCH_PROJECTS: (state) => {
      state.loading = true;
      state.error = false;
    },
    FETCH_PROJECTS_SUCCESS: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.inboxProject = action.payload.find(
        (project) => project.name == "Inbox"
      );
    },
    FETCH_PROJECTS_ERROR: (state) => {
      state.loading = false;
      state.error = true;
    },
    TOGGLE_SELECTED_PROJECT: (state, action) => {
      const project = state.data.find(
        (project) => project.id == action.payload
      );
      state.selectedProject = project;
    },
    ADD_PROJECT: (state, action) => {
      state.loading = true;
      state.addingProject = true;
    },
    ADD_PROJECT_SUCCESS: (state, action) => {
      state.loading = false;
      state.addingProject = false;
      state.data = [...state.data, action.payload];
    },
    ADD_PROJECT_ERROR: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    UPDATE_PROJECT: (state, action) => {
      state.loading = true;
    },
    UPDATE_PROJECT_SUCCESS: (state, action) => {
      state.loading = false;
      const newStateData = state.data.filter(
        (project) => project.id != action.payload.id
      );
      newStateData.push(action.payload);
      state.data = newStateData;
    },
    UPDATE_PROJECT_ERROR: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    DELETE_PROJECT: (state, action) => {
      state.loading = true;
    },
    DELETE_PROJECT_SUCCESS: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((project) => project.id != action.payload);
    },
    DELETE_PROJECT_ERROR: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_ERROR,
  TOGGLE_SELECTED_PROJECT,
  ADD_PROJECT,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  UPDATE_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
} = projectsSlice.actions;
export default projectsSlice.reducer;
