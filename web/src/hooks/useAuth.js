import { useState } from "react";
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
  const {
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    setCurrentUser
  } = useAuthContext();

  const handleError = (error) => {
    const errorMessage = error.response?.data?.message || "An error occurred.";
    console.error(errorMessage, message);
    setMessage(errorMessage);
    showError(errorMessage);
  };

  const register = async (username, email, password1, password2) => {
    try {
      const { data } = await axiosInstance.post("/register/", {
        username,
        email,
        password1,
        password2,
      });
      setMessage(data.message);
      showSuccess(`Welcome to the community, ${data.data.username}!`);
    } catch (error) {
      handleError(error);
    }
  };

  const login = async (username, password) => {
    try {
      const { data } = await axiosInstance.post("/login/", {
        username,
        password,
      });
      setMessage(data.message);
      setIsLoggedIn(true);
      setCurrentUser(data.data.username);
      showSuccess(`Welcome back, ${currentUser}!`);
    } catch (error) {
      handleError(error);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axiosInstance.post("/logout/");
      setMessage(data.message);
      setIsLoggedIn(false);
      setCurrentUser(null);
      showSuccess(`Till next time, ${currentUser}!`);
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