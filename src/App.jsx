import React from "react";
import { TaskWrapper } from "./components/task/TaskWrapper";
import { TaskProvider } from "./context/TaskProvider";

export function App() {

  return (
    <TaskProvider>
      <TaskWrapper />
    </TaskProvider>
  );
}
