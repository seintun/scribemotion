import { useState } from "react";
import axiosInstance from "../utils/axiosUtil";
import { useSnackbar } from "../components/SnackbarContext";

/**
 * Custom hook to handle user authentication.
 */
const useAuth = () => {
  const [message, setMessage] = useState("");
  const { showSuccess, showError } = useSnackbar();

  const handleError = (error) => {
    if (error.response) {
      setMessage(error.response.data.message);
      showError(error.response.data.message);
    } else {
      setMessage("An error occurred.");
      showError("An error occurred.");
    }
  };

  const register = async (username, email, password1, password2) => {
    try {
      const response = await axiosInstance.post("/register/", {
        username,
        email,
        password1,
        password2,
      });
      setMessage(response.data.message);
      showSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/login/", {
        username,
        password,
      });
      setMessage(response.data.message);
      showSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/logout/");
      setMessage(response.data.message);
      showSuccess(response.data.message);
    } catch (error) {
      handleError(error);
    }
  };

  return {
    message,
    register,
    login,
    logout,
  };
};

export default useAuth;