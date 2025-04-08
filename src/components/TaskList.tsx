import React, { useState } from "react";
import Task from "./Task";
import TaskInput from "./TaskInput";

interface Task {
  id: number;
  value: string;
  completed: boolean; // Added completion state
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (taskValue: string) => {
    const newTask = {
      id: Date.now(),
      value: taskValue,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (id: number) => {
    const editedValue = prompt(
      "Edit task",
      tasks.find((t) => t.id === id)?.value
    );
    if (editedValue) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, value: editedValue } : task
        )
      );
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
        Todo List
      </h1>

      <TaskInput onAddTask={handleAddTask} />

      <div className="space-y-3 mt-4">
        {tasks.map((task) => (
          <Task
            key={task.id}
            taskValue={task.value}
            completed={task.completed}
            onToggle={() => toggleComplete(task.id)}
            onEdit={() => handleEditTask(task.id)}
            onDelete={() => handleDeleteTask(task.id)}
          />
        ))}
      </div>

      {tasks.length > 0 && (
        <p className="text-sm text-gray-500 mt-4">
          {tasks.filter((t) => t.completed).length} of {tasks.length} completed
        </p>
      )}
    </div>
  );
};

export default TaskList;
