// src/app/store/actions/task.actions.ts
import { createAction, props } from '@ngrx/store';
import { Task } from '../helper/task_dto';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const addTaskSuccess = createAction('[Task] Add Task Success', props<{ task: Task }>());

export const editTask = createAction('[Task] Edit Task', props<{ task: Task }>());
export const editTaskSuccess = createAction('[Task] Edit Task Success', props<{ task: Task }>());

export const deleteTask = createAction('[Task] Delete Task', props<{ taskId: string }>());
export const deleteTaskSuccess = createAction('[Task] Delete Task Success', props<{ taskId: string }>());


export const getTask = createAction('[Task] Get Task', props<{ taskId: string }>());
export const getTaskSuccess = createAction('[Task] Get Task Success', props<{ task: Task }>());
export const getTaskFailure = createAction('[Task] Get Task Failure', props<{ error: any }>());


export const getAllTasks = createAction('[Task] Get All Tasks');
export const getAllTasksSuccess = createAction('[Task] Get All Tasks Success', props<{ tasks: Task[] }>());
export const getAllTasksFailure = createAction('[Task] Get All Tasks Failure', props<{ error: any }>());
