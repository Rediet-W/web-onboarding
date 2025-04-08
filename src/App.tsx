import React from "react";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <TaskList />
    </div>
  );
};

export default App;
