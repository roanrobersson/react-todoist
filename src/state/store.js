import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga.js";
import commonReducer from "./slices/commonSlice.js";
import authReducer from "./slices/authSlice.js";
import projectsReducer from "./slices/projectsSlice.js";
import tasksReducer from "./slices/tasksSlice.js";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
