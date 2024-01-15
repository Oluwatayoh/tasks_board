// src/app/store/reducers/task.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { AppState } from '../state/app.state';
import * as TaskActions from './task.actions';

export const initialState: AppState = {
  tasks: []
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(TaskActions.editTask, (state, { task }) => ({ ...state, tasks: state.tasks.map(t => (t.id === task.id ? task : t)) })),
  on(TaskActions.deleteTask, (state, { taskId }) => ({ ...state, tasks: state.tasks.filter(t => t.id !== taskId) })),
  on(TaskActions.getTaskSuccess, (state, { task }) => {
    const existingTaskIndex = state.tasks.findIndex(t => t.id === task.id);

    if (existingTaskIndex !== -1) {
      const updatedTasks = [...state.tasks];
      updatedTasks[existingTaskIndex] = task;

      return { ...state, tasks: updatedTasks };
    } else {
      return { ...state, tasks: [...state.tasks, task] };
    }
  }),

  on(TaskActions.getAllTasksSuccess, (state, { tasks }) => ({ ...state, tasks }))
);
