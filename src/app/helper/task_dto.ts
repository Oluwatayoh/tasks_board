export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'Open' | 'Pending' | 'In Progress' | 'Completed';
  userId: string;
}


export interface User {
  createdAt: string;
  name: string;
  avatar: string;
  username: string;
  id: string;
}
