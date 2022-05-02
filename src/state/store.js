import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga.js";
import authReducer from "./slices/authSlice.js";
import projectsReducer from "./slices/projectsSlice.js";
import commonReducer from "./slices/commonSlice.js";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    auth: authReducer,
    common: commonReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
