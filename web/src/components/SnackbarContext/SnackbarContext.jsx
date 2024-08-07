import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

// Create a context for the Snackbar
const SnackbarContext = createContext(undefined);

/**
 * SnackbarProvider component that provides snackbar functionality to its children.
 * https://mui.com/material-ui/react-snackbar/
 * This component wraps its children with a context provider that allows them to
 * show error messages using a snackbar.
 */
export const SnackbarProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  /**
   * Function to show an error message in the snackbar.
   *
   * @param {string} message - The error message to display.
   */
  const showError = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  /**
   * Function to show a success message in the snackbar.
   *
   * @param {string} message - The success message to display.
   */
  const showSuccess = (message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showError, showSuccess }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarOpen}
        autoHideDuration={8000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

/**
 * Custom hook to use the snackbar context.
 *
 * This hook provides access to the snackbar context, allowing components to show error messages.
 *
 */
export const useSnackbar = () => {
  // Get the snackbar context from the context provider
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
