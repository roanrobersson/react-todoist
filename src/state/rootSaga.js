import { all, takeLatest } from "redux-saga/effects";
import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  requestProjects,
  onReceiveProjects,
} from "./slices/projectsSlice";
import {
  FETCH_TOKEN,
  FETCH_TOKEN_SUCCESS,
  AUTHORIZED,
  requestToken,
  onReceiveToken,
  onAuthorized as authSliceOnAuthorized,
} from "./slices/authSlice";
import {
  FETCH_INITIAL_DATA,
  onAuthorized as commonSliceOnAuthorized,
  requestInitialData,
} from "./slices/commonSlice";

export default function* rootSaga() {
  return yield all([
    takeLatest(FETCH_TOKEN.type, requestToken),
    takeLatest(FETCH_TOKEN_SUCCESS.type, onReceiveToken),
    takeLatest(AUTHORIZED.type, authSliceOnAuthorized),
    takeLatest(FETCH_INITIAL_DATA.type, requestInitialData),
    takeLatest(FETCH_PROJECTS.type, requestProjects),
    takeLatest(FETCH_PROJECTS_SUCCESS.type, onReceiveProjects),
    takeLatest(AUTHORIZED.type, commonSliceOnAuthorized),

  ]);
}
