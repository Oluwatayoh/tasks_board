import { Component, Input } from '@angular/core';
import { Task } from '../../helper/task_dto';
import Swal from 'sweetalert2';
import { TaskService } from 'src/app/services/task.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as TaskActions from '../../state/task.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: Task | undefined;

  constructor(
    private taskService: TaskService,
    private store: Store<AppState>
  ) {
  }

  getTaskStatusClass(status: string): string {
    switch (status) {
      case 'Open':
        return 'bg-yellow-100';
      case 'Pending':
        return 'bg-blue-100';
      case 'In Progress':
        return 'bg-green-100';
      case 'Completed':
        return 'bg-gray-100';
      default:
        return '';
    }
  }

  deleteTask(taskId: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(TaskActions.deleteTask({ taskId }));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
    console.log(taskId);
  }
}
