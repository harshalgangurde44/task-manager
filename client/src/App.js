import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Homepage from "./component/Homepage";
import Login from "./component/Login";
import Signup from "./component/Signup";

import {
  changeUserLoggedInStatus,
  updateUserInfo,
} from "./redux/slices/userSlice";
import RequireAuth from "./component/RequireAuth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken = localStorage.getItem("AUTH_TOKEN");

    if (authToken) {
      const _id = localStorage.getItem("USER_ID");
      const name = localStorage.getItem("USER_NAME");
      const email = localStorage.getItem("USER_EMAIL");

      dispatch(changeUserLoggedInStatus(true));
      dispatch(updateUserInfo({ _id, name, email }));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Homepage />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
