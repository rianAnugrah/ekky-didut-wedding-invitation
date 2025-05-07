// Now let's create our components
// components/TaskForm.tsx
"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Task } from '@/types';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialTask: Task | null;
  resetForm: () => void;
}

export default function TaskForm({ onSubmit, initialTask, resetForm }: TaskFormProps) {
  const [task, setTask] = useState<Task>({
    Name: '',
    Notes: '',
    Status: 'Todo'
  });

  // Update form if initialTask changes
  useEffect(() => {
    if (initialTask) {
      setTask({
        Name: initialTask.Name || '',
        Notes: initialTask.Notes || '',
        Status: initialTask.Status || 'Todo'
      });
    } else {
      setTask({
        Name: '',
        Notes: '',
        Status: 'Todo'
      });
    }
  }, [initialTask]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    // Clear form if not editing
    if (!initialTask) {
      setTask({
        Name: '',
        Notes: '',
        Status: 'Todo'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-semibold mb-4">{initialTask ? 'Edit Task' : 'Create New Task'}</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">
        Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Name"
          type="text"
          name="Name"
          value={task.Name}
          onChange={handleChange}
          placeholder="Task Name"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Notes">
          Notes
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Notes"
          name="Notes"
          value={task.Notes || ''}
          onChange={handleChange}
          placeholder="Task Notes"
          rows={3}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Status">
          Status
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Status"
          name="Status"
          value={task.Status}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="In progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {initialTask ? 'Update Task' : 'Create Task'}
        </button>
        
        {initialTask && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}