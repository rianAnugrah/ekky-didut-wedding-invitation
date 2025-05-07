export interface Task {
    id?: string;
    Name: string;
    Notes?: string;
    Status: 'Todo' | 'In Progress' | 'Done';
  }