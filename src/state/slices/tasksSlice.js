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

export function* onAddTask(action) {
  const task = action.payload;
  try {
    const response = yield call(() => getApi().addTask(task));
    yield put(ADD_TASK_SUCCESS(response));
  } catch (error) {
    yield put(ADD_TASK_ERROR());
  }
}

export function* onUpdateTask(action) {
  const task = action.payload;
  try {
    yield call(() => getApi().updateTask(task.id, task));
    yield put(UPDATE_TASK_SUCCESS(task));
  } catch (error) {
    yield put(UPDATE_TASK_ERROR());
  }
}

export function* onDeleteTask(action) {
  const taskId = action.payload;
  try {
    yield call(() => getApi().deleteTask(taskId));
    yield put(DELETE_TASK_SUCCESS(taskId));
  } catch (error) {
    yield put(DELETE_TASK_ERROR());
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

export function* onReopenTask(action) {
  const taskId = action.payload;
  try {
    yield call(() => getApi().reopenTask(taskId));
    yield put(REOPEN_TASK_SUCCESS(taskId));
  } catch (error) {
    yield put(REOPEN_TASK_ERROR());
  }
}

const initialState = {
  data: [],
  loading: false,
  error: false,
  lastClosedTaskId: null,
  lastClosedTask: null,
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
    ADD_TASK: (state, action) => {
      state.loading = true;
    },
    ADD_TASK_SUCCESS: (state, action) => {
      const task = action.payload;
      state.loading = false;
      state.data = [...state.data, task];
    },
    ADD_TASK_ERROR: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    UPDATE_TASK: (state, action) => {
      state.loading = true;
    },
    UPDATE_TASK_SUCCESS: (state, action) => {
      const updatedTask = action.payload;
      const newStateData = state.data.filter(
        (task) => task.id != updatedTask.id
      );
      newStateData.push(updatedTask);
      state.loading = false;
      state.data = newStateData;
    },
    UPDATE_TASK_ERROR: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    DELETE_TASK: (state, action) => {
      state.loading = true;
    },
    DELETE_TASK_SUCCESS: (state, action) => {
      const taskId = action.payload;
      state.loading = false;
      state.data = state.data.filter((task) => task.id != taskId);
    },
    DELETE_TASK_ERROR: (state, action) => {
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
      state.lastClosedTask = state.data.find((task) => task.id == taskId);
      state.lastClosedTaskId = taskId;
      state.data = state.data.filter((task) => task.id != taskId);
    },
    CLOSE_TASK_ERROR: (state) => {
      state.loading = false;
      state.error = true;
    },
    REOPEN_TASK: (state) => {
      state.loading = true;
      state.error = false;
    },
    REOPEN_TASK_SUCCESS: (state, action) => {
      state.loading = false;
      state.data = [...state.data, state.lastClosedTask];
      state.lastClosedTaskId = null;
      state.lastClosedTask = null;
    },
    REOPEN_TASK_ERROR: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  FETCH_TASKS,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_ERROR,
  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  CLOSE_TASK,
  CLOSE_TASK_SUCCESS,
  CLOSE_TASK_ERROR,
  REOPEN_TASK,
  REOPEN_TASK_SUCCESS,
  REOPEN_TASK_ERROR,
} = tasksSlice.actions;
export default tasksSlice.reducer;
