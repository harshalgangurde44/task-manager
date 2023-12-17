import { createSlice } from "@reduxjs/toolkit";

import { authLogin, authSignup } from "../../services/auth";

const initialState = {
  loading: false,
  error: null,
  _id: "",
  name: "",
  email: "",
  isAccountCreated: false,
  isUserLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetAccountCreated: (state, action) => {
      state.isAccountCreated = false;
    },

    changeUserLoggedInStatus: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },

    updateUserInfo: (state, action) => {
      const { _id, name, email } = action.payload;

      state._id = _id;
      state.name = name;
      state.email = email;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authSignup.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(authSignup.fulfilled, (state, action) => {
      state.isAccountCreated = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(authSignup.rejected, (state, action) => {
      state.loading = false;
      state.error = new Error(
        action.payload || "Something went wrong, please try again"
      );
    });

    builder.addCase(authLogin.pending, (state, action) => {
      state.isUserLoggedIn = false;
      state.loading = true;
      state.error = null;
    });

    builder.addCase(authLogin.fulfilled, (state, action) => {
      const { _id, name, email, token } = action.payload;

      localStorage.setItem("USER_ID", _id);
      localStorage.setItem("USER_NAME", name);
      localStorage.setItem("USER_EMAIL", email);
      localStorage.setItem("AUTH_TOKEN", token);

      state._id = _id;
      state.name = name;
      state.email = email;

      state.isUserLoggedIn = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(authLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = new Error(
        action.payload || "Something went wrong, please try again"
      );
    });
  },
});

export const { resetAccountCreated, changeUserLoggedInStatus, updateUserInfo } =
  userSlice.actions;

export default userSlice.reducer;
