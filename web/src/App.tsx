import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "./components/SnackbarContext";
import { MenuAppBar } from "./components/MenuAppBar";
import { Register } from "./containers/Register";
import { Login } from "./containers/Login";
import { AllPostsPage } from "./containers/PostPage";

// import HelloScribeMotion from "./components/HelloScribemotion";

const theme = createTheme();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <Router>
            <MenuAppBar />
            <Routes>
              {/* <Route path="/" element={<HelloScribeMotion />} /> */}
              <Route path="/" element={<AllPostsPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
