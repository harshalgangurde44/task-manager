import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { validateEmail } from "../utils";
import { authSignup } from "../services";
import { resetAccountCreated } from "../redux/slices/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [showNameError, setShowNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const isAccountCreated = useSelector((s) => s.user.isAccountCreated);

  const handleSignup = async () => {
    const isNameValid = name?.length > 0;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password?.length > 0;

    if (!isNameValid || !isEmailValid || !isPasswordValid) {
      setShowNameError(!isNameValid);
      setShowEmailError(!isEmailValid);
      setShowPasswordError(!isPasswordValid);

      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    dispatch(authSignup(user));
  };

  if (isAccountCreated) {
    const timeOutId = setTimeout(() => {
      navigate("/login");
      dispatch(resetAccountCreated());
    }, 5000);

    return (
      <div className="max-w-lg mx-4 md:mx-auto mt-5">
        <h1 className="text-2xl font-bold mb-4">
          Your account has been successfully created. Please proceed to log in.
          You will be automatically redirected to the Login Page in 5 seconds.
        </h1>
        <Link
          className="flex justify-center bg-blue-600 text-white px-4 py-2 rounded w-[200px] mx-auto"
          to="/login"
          onClick={() => {
            clearTimeout(timeOutId);
            dispatch(resetAccountCreated());
          }}
        >
          Login Page
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-4 mt-8 md:mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Sign Up</h2>

      <label>
        Name:
        <input
          className={`w-full border p-2 my-2 rounded ${
            showNameError && "mb-0"
          }`}
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setShowNameError(false);
          }}
        />
      </label>
      {showNameError && (
        <p className="text-red-600">Please enter a your name.</p>
      )}

      <label>
        Email:
        <input
          className={`w-full border p-2 my-2 rounded ${
            showEmailError && "mb-0"
          }`}
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setShowEmailError(false);
          }}
        />
      </label>
      {showEmailError && (
        <p className="text-red-600">Please enter a valid email address.</p>
      )}

      <label>
        Password:
        <input
          className={`w-full border p-2 my-2 rounded ${
            showPasswordError && "mb-0"
          }`}
          type="password"
          placeholder="Set a strong password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setShowPasswordError(false);
          }}
        />
      </label>
      {showPasswordError && (
        <p className="text-red-600">Please enter a valid password.</p>
      )}

      <div className="flex justify-center my-4">
        <button
          className="bg-blue-500 w-full text-white px-4 py-2 rounded"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>

      <div className="flex justify-center gap-2">
        <span>Already have an account?</span>
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
