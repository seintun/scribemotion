import React from "react";
import { SnackbarProvider } from "./components/SnackbarContext/SnackbarContext";
import { AnalyzeTextView } from "./components/AnalyzeTextView";
import HelloScribeMotion from "./components/HelloScribemotion";

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <HelloScribeMotion />
      <AnalyzeTextView />
    </SnackbarProvider>
  );
};

export default App;
