import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "./components/SnackbarContext";
import { Register } from "./containers/Register";
import { Login } from "./containers/Login";
import { PostPage } from "./containers/PostPage";
import HelloScribeMotion from "./components/HelloScribemotion";

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HelloScribeMotion />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<PostPage />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
