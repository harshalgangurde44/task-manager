import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { validateEmail } from "../utils";
import { authLogin } from "../services";
import Spinner from "./Spinner";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const {
    loading: authLoading,
    error: authError,
    isUserLoggedIn,
  } = useSelector((s) => s.user);

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password?.length > 0;

    if (!isEmailValid || !isPasswordValid) {
      setShowEmailError(!isEmailValid);
      setShowPasswordError(!isPasswordValid);

      return;
    }

    const user = {
      email: email,
      password: password,
    };

    dispatch(authLogin(user));
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (authError) {
      toast.error(
        authError?.message || "Something went wrong. Please try again!"
      );
    }
  }, [authError]);

  if (authLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-sm mx-4 mt-8 md:mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Login</h2>
      <label>
        Email:
        <input
          className={`w-full border p-2 my-2 rounded ${
            showEmailError && "mb-0"
          }`}
          type="email"
          placeholder="name@company.com"
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
          placeholder="••••••••"
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
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <div className="flex justify-center gap-2">
        <span>Don't have an account?</span>
        <Link
          to="/signup"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Sign Up
        </Link>
      </div>
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default Login;
