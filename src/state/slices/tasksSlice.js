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

export function* onCloseTasks(action) {
  const taskId = action.payload;
  try {
    yield call(() => getApi().closeTask(taskId));
    yield put(CLOSE_TASK_SUCCESS(taskId));
  } catch (error) {
    yield put(CLOSE_TASK_ERROR());
  }
}

const initialState = {
  data: [],
  loading: false,
  error: false,
  lastClosedTaskId: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    FETCH_TASKS: (state) => {
      state.loading = true;
      state.error = false;
    },
    FETCH_TASKS_SUCCESS: (state, action) => {
      const tasks = action.payload;
      state.loading = false;
      state.data = tasks;
    },
    FETCH_TASKS_ERROR: (state) => {
      state.loading = false;
      state.error = true;
    },
    CLOSE_TASK: (state) => {
      state.loading = true;
      state.error = false;
    },
    CLOSE_TASK_SUCCESS: (state, action) => {
      const taskId = action.payload;
      state.loading = false;
      state.data = state.data.filter((task) => task.id != taskId);
      state.lastClosedTaskId = taskId;
    },
    CLOSE_TASK_ERROR: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  FETCH_TASKS,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_ERROR,
  CLOSE_TASK,
  CLOSE_TASK_SUCCESS,
  CLOSE_TASK_ERROR,
} = tasksSlice.actions;
export default tasksSlice.reducer;
