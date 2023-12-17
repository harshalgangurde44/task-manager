import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTasks } from "../../services";

const initialState = {
  loading: false,
  error: null,
  list: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTasksList: (state, action) => {
      state.list = action.payload;
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(fetchAllTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = new Error(
        action.payload || "Something went wrong, please try again"
      );
    });
  },
});

export const { updateTasksList, deleteTask, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;
