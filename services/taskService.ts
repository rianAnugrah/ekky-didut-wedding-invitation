// Task service for API calls
// services/taskService.ts
import api from '@/lib/axios';
import { Task } from '@/types';

export const TaskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },
  
  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },
  
  createTask: async (task: Task): Promise<Task> => {
    const response = await api.post('/tasks', task);
    return response.data;
  },
  
  updateTask: async (id: string, task: Task): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },
  
  deleteTask: async (id: string): Promise<any> => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};