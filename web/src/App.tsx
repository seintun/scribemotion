import React from "react";
import { SnackbarProvider } from "./components/SnackbarContext/SnackbarContext";
import HelloScribeMotion from "./components/HelloScribemotion";
import { AnalyzeTextView } from "./components/AnalyzeTextView";

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <HelloScribeMotion />
      <AnalyzeTextView />
    </SnackbarProvider>
  );
};

export default App;
