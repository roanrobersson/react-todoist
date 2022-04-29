import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/projectSlice.js"
;
export default configureStore({
  reducer: {
    project: projectReducer,
  },
});
