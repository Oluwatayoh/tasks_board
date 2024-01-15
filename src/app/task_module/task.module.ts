import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: TaskListComponent }];

@NgModule({
  declarations: [TaskListComponent, TaskComponent, NewTaskComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class TaskListModule {}
