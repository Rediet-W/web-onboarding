import React from "react";

interface TaskProps {
  taskValue: string;
  completed: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({
  taskValue,
  completed,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`flex items-center p-3 border rounded-lg transition-all ${
        completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300"
      }`}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 mr-3"
      />

      <p
        className={`flex-grow ${
          completed ? "line-through text-gray-400" : "text-gray-700"
        }`}
      >
        {taskValue}
      </p>

      <div className="flex space-x-2">
        <button
          onClick={onEdit}
          className="text-sm text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded hover:bg-indigo-50"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-sm text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
