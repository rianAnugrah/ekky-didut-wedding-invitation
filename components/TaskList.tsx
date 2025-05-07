// components/TaskList.tsx
"use client";

import { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  // Function to determine the badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Todo':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!tasks.length) {
    return <p className="text-gray-500">No tasks found. Create one to get started!</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{task.Name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.Status)}`}>
                {task.Status}
              </span>
            </div>
            
            {task.Notes && (
              <p className="text-gray-600 mb-4">{task.Notes}</p>
            )}
            
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id as string)}
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}