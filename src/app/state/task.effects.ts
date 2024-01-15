// src/app/store/effects/task.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { TaskService } from '../services/task.service';
import { of } from 'rxjs';

@Injectable()
export class TaskEffects {
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      mergeMap(({ task }) =>
        this.taskService
          .addTask(task)
          .pipe(
            map((addedTask) => TaskActions.addTaskSuccess({ task: addedTask }))
          )
      )
    )
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.editTask),
      mergeMap(({ task }) =>
        this.taskService
          .editTask(task)
          .pipe(
            map((editedTask) =>
              TaskActions.editTaskSuccess({ task: editedTask })
            )
          )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(({ taskId }) =>
        this.taskService
          .deleteTask(taskId)
          .pipe(map(() => TaskActions.deleteTaskSuccess({ taskId })))
      )
    )
  );

  getTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.getTask),
      mergeMap(({ taskId }) =>
        this.taskService.getTask(taskId).pipe(
          map((task) => TaskActions.getTaskSuccess({ task })),
          catchError((error) => of(TaskActions.getTaskFailure({ error })))
        )
      )
    )
  );

  getAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.getAllTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TaskActions.getAllTasksSuccess({ tasks })),
          catchError((error) => of(TaskActions.getAllTasksFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
