import React from "react";
import { SnackbarProvider } from "./components/SnackbarContext/SnackbarContext";
import { AnalyzeTextView } from "./components/AnalyzeTextView";
import HelloScribeMotion from "./components/HelloScribemotion";
import { PostDetailedView } from "./components/PostDetailedView";

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <HelloScribeMotion />
      <AnalyzeTextView />
      <PostDetailedView />
    </SnackbarProvider>
  );
};

export default App;
