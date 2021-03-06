import { all, takeLatest, takeEvery } from "redux-saga/effects";
import {
  FETCH_INITIAL_DATA,
  onAuthorized as commonSliceOnAuthorized,
  onRequestInitialData,
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
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  onRequestProjects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onDeleteProjectSuccess,
} from "./slices/projectsSlice";
import {
  FETCH_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  CLOSE_TASK,
  REOPEN_TASK,
  onRequestTasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onCloseTasks,
  onReopenTask,
} from "./slices/tasksSlice.js";

export default function* rootSaga() {
  return yield all([
    takeLatest(FETCH_TOKEN.type, onRequestToken),
    takeLatest(FETCH_TOKEN_SUCCESS.type, onReceiveToken),
    takeLatest(AUTHORIZED.type, authSliceOnAuthorized),
    takeLatest(AUTHORIZED.type, commonSliceOnAuthorized),
    takeLatest(FETCH_INITIAL_DATA.type, onRequestInitialData),

    takeLatest(FETCH_PROJECTS.type, onRequestProjects),
    takeLatest(ADD_PROJECT.type, onAddProject),
    takeLatest(UPDATE_PROJECT.type, onUpdateProject),
    takeLatest(DELETE_PROJECT.type, onDeleteProject),
    takeLatest(DELETE_PROJECT_SUCCESS.type, onDeleteProjectSuccess),

    takeLatest(FETCH_TASKS.type, onRequestTasks),
    takeLatest(ADD_TASK.type, onAddTask),
    takeLatest(UPDATE_TASK.type, onUpdateTask),
    takeLatest(DELETE_TASK.type, onDeleteTask),
    takeEvery(CLOSE_TASK.type, onCloseTasks),
    takeLatest(REOPEN_TASK.type, onReopenTask),
  ]);
}
