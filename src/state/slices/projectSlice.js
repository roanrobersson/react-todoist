import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  projectIsLoading: false,
};

export const projectSlice = createSlice({
  name: "project",
  initialState: initialState,
  reducers: {
    setProjects: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = projectSlice.actions;

export default projectSlice.reducer;
