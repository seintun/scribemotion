import React from "react";
import { SnackbarProvider } from "./components/SnackbarContext/SnackbarContext";
import HelloScribeMotion from "./components/HelloScribemotion";
import { Post as PostContainer } from "./containers/Post";

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <HelloScribeMotion />
      <PostContainer />
    </SnackbarProvider>
  );
};

export default App;
