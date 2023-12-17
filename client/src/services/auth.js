import { createAsyncThunk } from "@reduxjs/toolkit";

const REACT_APP_API_PATH =
  process.env.REACT_APP_API_PATH || "http://localhost:8080";

export const authLogin = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const URL = REACT_APP_API_PATH + "/api/auth/login";

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        return thunkAPI.rejectWithValue("Invalid Credentials");
      }

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);

export const authSignup = createAsyncThunk(
  "auth/signup",
  async (payload, thunkAPI) => {
    const URL = REACT_APP_API_PATH + "/api/auth/signup";

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data);
    }

    return data;
  }
);
