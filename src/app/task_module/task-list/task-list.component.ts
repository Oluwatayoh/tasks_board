import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { addTask } from '../../state/task.actions';
import { Task, User } from '../../helper/task_dto';
import { TaskService } from '../../services/task.service';
import { Observable, map, tap } from 'rxjs';
import { AppState } from '../../state/app.state';

import * as TaskActions from '../../state/task.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks!: Task[];
  storedUser!: User;
  edit: boolean = false;
  selectedTask!: Task;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.tasks$ = this.store.pipe(select('tasks'));

    const storedUserString = sessionStorage.getItem('loggedInUser');
    if (storedUserString) {
      this.storedUser = JSON.parse(storedUserString);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.getAllTasks());
    this.store.pipe(select('tasks')).subscribe((tasks: any) => {
      this.todoTasks = tasks.tasks.filter(
        (task: Task) => task.status === 'Open'
      );
      this.pendingTasks = tasks.tasks.filter(
        (task: Task) => task.status === 'Pending'
      );
      this.inProgressTasks = tasks.tasks.filter(
        (task: Task) => task.status === 'In Progress'
      );
      this.completeTasks = tasks.tasks.filter(
        (task: Task) => task.status === 'Completed'
      );
    });
  }

  tasks$: Observable<Task[]>;
  title = '';
  description = '';
  dueDate: Date = new Date();
  now = Date.now();

  todoTasks: Task[] = [];
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completeTasks: Task[] = [];

  isModalOpen: boolean = false;

  addTask() {
    const task: Task = {
      id: Date.now().toString(),
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      status: 'Open',
      userId: this.storedUser.id,
    };
    this.store.dispatch(TaskActions.addTask({ task }));
    this.closeDialog();
  }

  editTask() {
    const task: Task = {
      id: this.selectedTask.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      status: this.selectedTask.status,
      userId: this.selectedTask.userId,
    };
    this.store.dispatch(TaskActions.editTask({ task }));

    this.isModalOpen = false;
    this.edit =  false;
    this.title = "";
    this.description = "";
    this.dueDate = new Date();
    // this.selectedTask = undefined;
  }
  onEdit(task: Task) {
    this.isModalOpen = true;
    this.edit = true;
    this.title = task.title;
    this.description = task.description;
    this.dueDate = task.dueDate;
    this.selectedTask = task;
  }
  allowDrop(event: any) {
    event.preventDefault();
  }

  drag(event: any) {
    event.dataTransfer.setData('text', event.target.id);
  }

  drop(event: any, columnId: string) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const draggedElement = document.getElementById(data);
    const target = event.target;

    if (target.classList.contains('droppable')) {
      target.appendChild(draggedElement);

      // Update the task list based on the column
      let task = this.findTaskById(data);
      if (task) {
        let updatedTask!: Task; // Create a new Task object for the update

        switch (columnId) {
          case 'todo':
            updatedTask = { ...task, status: 'Open' };
            this.todoTasks = this.todoTasks.filter((t) => t.id !== task!.id);
            break;
          case 'pending':
            updatedTask = { ...task, status: 'Pending' };
            this.pendingTasks = this.pendingTasks.filter(
              (t) => t.id !== task!.id
            );
            break;
          case 'inProgress':
            updatedTask = { ...task, status: 'In Progress' };
            this.inProgressTasks = this.inProgressTasks.filter(
              (t) => t.id !== task!.id
            );
            break;
          case 'complete':
            updatedTask = { ...task, status: 'Completed' };
            this.completeTasks = this.completeTasks.filter(
              (t) => t.id !== task!.id
            );
            break;
        }

        // Dispatch the updated task to the store
        this.store.dispatch(TaskActions.editTask({ task: updatedTask }));
      }
    }
  }

  private findTaskById(taskId: string): Task | undefined {
    const allTasks = [
      ...this.todoTasks,
      ...this.pendingTasks,
      ...this.inProgressTasks,
      ...this.completeTasks,
    ];
    return allTasks.find((task) => task.id === taskId);
  }

  openDialog() {
    this.isModalOpen = true;
  }

  closeDialog() {
    this.isModalOpen = false;
  }

  logOut() {
    sessionStorage.clear();
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
