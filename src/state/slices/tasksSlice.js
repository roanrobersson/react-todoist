import { createSlice } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import getApi from "@/api/todoistApi.js";

export function* onRequestTasks() {
  try {
    const response = yield call(() => getApi().getTasks());
    yield put(FETCH_TASKS_SUCCESS(response));
  } catch (error) {
    yield put(FETCH_TASKS_ERROR());
  }
}

export function* onReceiveTasks(action) {
  yield put(SET_TASKS(action.payload));
}

const initialState = {
  data: [],
  loading: false,
  error: false,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    FETCH_TASKS: (state) => {
      state.loading = true;
      state.error = false;
    },
    FETCH_TASKS_SUCCESS: (state) => {
      state.loading = true;
    },
    FETCH_TASKS_ERROR: (state) => {
      state.loading = false;
      state.error = true;
    },
    SET_TASKS: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  FETCH_TASKS,
  FETCH_TASKS_SUCCESS,
  SET_TASKS,
  FETCH_TASKS_ERROR,
} = tasksSlice.actions;
export default tasksSlice.reducer;
