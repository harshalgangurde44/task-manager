import { createAsyncThunk } from "@reduxjs/toolkit";

const REACT_APP_API_PATH =
  process.env.REACT_APP_API_PATH || "http://localhost:8080";

export const fetchAllTasks = createAsyncThunk(
  "tasks/list",
  async (_, thunkAPI) => {
    const URL = REACT_APP_API_PATH + "/api/tasks";
    const authToken = localStorage.getItem("AUTH_TOKEN");

    const response = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data);
    }

    return data;
  }
);
