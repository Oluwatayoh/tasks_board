// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task, User } from '../helper/task_dto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://65a48a7552f07a8b4a3d7227.mockapi.io/';

  storedUser!: User;
  storedUserString = sessionStorage.getItem('loggedInUser');

  constructor(private http: HttpClient) {
    if (this.storedUserString) {
      this.storedUser = JSON.parse(this.storedUserString);
    }
  }

  private loadStoredUser() {
    const storedUserString = sessionStorage.getItem('loggedInUser');
    this.storedUser = storedUserString ? JSON.parse(storedUserString) : null;
  }

  getTasks(): Observable<Task[]> {
    this.loadStoredUser();

    return this.http.get<Task[]>(
      this.apiUrl + `user/${this.storedUser.id}/tasks`
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + `user`);
  }
  getUserByUsername(username: string): Observable<User | null> {
    return this.getUsers().pipe(
      map((users: User[]) => {
        const foundUser = users.find((user) => user.username === username);
        return foundUser || null;
      })
    );
  }

  getTask(taskId: string): Observable<Task> {
    this.loadStoredUser();
    return this.http.get<Task>(
      this.apiUrl + `user/${this.storedUser.id}/tasks/${taskId}`
    );
  }

  addTask(task: Task): Observable<Task> {
    this.loadStoredUser();
    return this.http.post<Task>(
      this.apiUrl + `user/${this.storedUser.id}/tasks`,
      task
    );
  }

  editTask(task: Task): Observable<Task> {
    this.loadStoredUser();
    console.log('wee got herr to update');
    return this.http.put<Task>(
      this.apiUrl + `user/${this.storedUser.id}/tasks/${task.id}`,
      task
    );
  }

  deleteTask(taskId: string): Observable<void> {
    this.loadStoredUser();
    return this.http.delete<void>(
      this.apiUrl + `user/${this.storedUser.id}/tasks/${taskId}`
    );
  }
}
