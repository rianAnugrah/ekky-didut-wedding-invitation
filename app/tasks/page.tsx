"use client";

import { useState, useEffect } from 'react';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Task } from '@/types';
import { TaskService } from '@/services/taskService';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await TaskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new task
  const createTask = async (task: Task) => {
    try {
      await TaskService.createTask(task);
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Update a task
  const updateTask = async (id: string, task: Task) => {
    try {
      await TaskService.updateTask(id, task);
      setCurrentTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    try {
      await TaskService.deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Edit a task (set current task)
  const editTask = (task: Task) => {
    setCurrentTask(task);
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      
      <div className="mb-8">
        <TaskForm 
          onSubmit={currentTask && currentTask.id 
            ? (task) => updateTask(currentTask.id as string, task) 
            : createTask} 
          initialTask={currentTask}
          resetForm={() => setCurrentTask(null)}
        />
      </div>

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList 
          tasks={tasks} 
          onEdit={editTask} 
          onDelete={deleteTask} 
        />
      )}
    </main>
  );
}