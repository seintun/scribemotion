import React from "react";
import { SnackbarProvider } from "./components/SnackbarContext/SnackbarContext";
import HelloScribeMotion from "./components/HelloScribemotion";
import { PostPage } from "./containers/PostPage";

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <HelloScribeMotion />
      <PostPage />
    </SnackbarProvider>
  );
};

export default App;
