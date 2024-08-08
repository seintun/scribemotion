import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosUtils";
import { useSnackbar } from "../components/SnackbarContext";
import { useAuthContext } from "../context/AuthContext";

/**
 * @description Custom hook to handle user authentication.
 * @returns {string} message - The message returned from the API.
 * @returns {object} An object containing the message, register, login, and logout functions.
 */
const useAuth = () => {
  const [message, setMessage] = useState("");
  const { showSuccess, showError } = useSnackbar();
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    initializeAuth();
  }, [setIsLoggedIn, setCurrentUser]);

  /**
   * @description Initializes the user authentication state based on the stored data.
   */
  const initializeAuth = () => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUser = localStorage.getItem("currentUser");
    const storedToken = localStorage.getItem("sessionToken");

    if (storedIsLoggedIn && storedUser && storedToken) {
      setIsLoggedIn(true);
      setCurrentUser(storedUser);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  };

  const handleError = (error) => {
    const errorMessage = error.response?.data?.message || "An error occurred.";
    console.error(errorMessage, message);
    setMessage(errorMessage);
    showError(errorMessage);
  };

  /**
   * @description Sets the authentication data in the local storage and axios headers.
   */
  const setAuthData = (username, sessionToken) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", username);
    localStorage.setItem("sessionToken", sessionToken);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${sessionToken}`;
  };

  /**
   * @description Clears the authentication data from the local storage and axios headers.
   * Also resets the user authentication state.
   */
  const clearAuthData = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("sessionToken");
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  const register = async (username, email, password1, password2) => {
    try {
      const response = await axiosInstance.post("/register/", {
        username,
        email,
        password1,
        password2,
      });
      const { message, data: { username: registeredUsername } } = response.data;
      setMessage(message);
      showSuccess(`Welcome to the community, ${registeredUsername}!`);
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/login/", { username, password });
      const { message, data: { username: loggedInUsername, session_token } } = response.data;
      setMessage(message);
      setAuthData(loggedInUsername, session_token);
      showSuccess(`Welcome back, ${loggedInUsername}!`);
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/logout/");
      const { message } = response.data;
      setMessage(message);
      clearAuthData();
      showSuccess(`Till next time!`);
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  return {
    message,
    currentUser,
    isLoggedIn,
    register,
    login,
    logout,
  };
};

export default useAuth;