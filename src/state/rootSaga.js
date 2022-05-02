import { all, takeLatest } from "redux-saga/effects";
import {
  FETCH_INITIAL_DATA,
  FETCH_INITIAL_DATA_SUCCESS,
  onAuthorized as commonSliceOnAuthorized,
  onRequestInitialData,
  onRequestInitialDataSuccess,
} from "./slices/commonSlice";
import {
  FETCH_TOKEN,
  FETCH_TOKEN_SUCCESS,
  AUTHORIZED,
  onRequestToken,
  onReceiveToken,
  onAuthorized as authSliceOnAuthorized,
} from "./slices/authSlice";
import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  TOGGLE_SELECTED_PROJECT,
  onRequestProjects,
  onReceiveProjects,
  onToggleSelectedProject,
} from "./slices/projectsSlice";
import {
  FETCH_TASKS,
  FETCH_TASKS_SUCCESS,
  onRequestTasks,
  onReceiveTasks,
} from "./slices/tasksSlice.js";

export default function* rootSaga() {
  return yield all([
    takeLatest(FETCH_TOKEN.type, onRequestToken),
    takeLatest(FETCH_TOKEN_SUCCESS.type, onReceiveToken),
    takeLatest(AUTHORIZED.type, authSliceOnAuthorized),
    takeLatest(FETCH_INITIAL_DATA.type, onRequestInitialData),
    takeLatest(FETCH_PROJECTS.type, onRequestProjects),
    takeLatest(FETCH_PROJECTS_SUCCESS.type, onReceiveProjects),
    takeLatest(AUTHORIZED.type, commonSliceOnAuthorized),
    takeLatest(TOGGLE_SELECTED_PROJECT.type, onToggleSelectedProject),
    takeLatest(FETCH_TASKS.type, onRequestTasks),
    takeLatest(FETCH_TASKS_SUCCESS.type, onReceiveTasks),
    takeLatest(FETCH_INITIAL_DATA_SUCCESS.type, onRequestInitialDataSuccess),
  ]);
}
