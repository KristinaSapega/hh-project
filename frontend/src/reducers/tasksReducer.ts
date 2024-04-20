import {
  AddStandToTasksAction,
  AddTaskToTasksAction,
  RemoveStandFromTasksAction,
  RemoveTaskFromTasksAction,
  ResetTasksAction,
  TasksState,
} from '../types';

const initialState: TasksState = {
  stands: [],
  tasks: [],
};

const ADD_STAND_TO_TASKS = 'ADDSTANDTOTASKS';
const REMOVE_STAND_FROM_TASKS = 'REMOVESTANDFROMTASKS';
const ADD_TASK_TO_TASKS = 'ADDTASKSTOTASKS';
const REMOVE_TASK_FROM_TASKS = 'REMOVETASKFROMTASKS';
const RESET_TASKS = 'RESETTASKS';

const addStandToTasks = (host: string): AddStandToTasksAction => ({
  type: ADD_STAND_TO_TASKS,
  payload: host,
});

const removeStandFromTasks = (host: string): RemoveStandFromTasksAction => ({
  type: REMOVE_STAND_FROM_TASKS,
  payload: host,
});

const addTaskToTasks = (task: {
  [key: string]: string;
}): AddTaskToTasksAction => ({
  type: ADD_TASK_TO_TASKS,
  payload: task,
});

const removeTaskFromTasks = (id: number): RemoveTaskFromTasksAction => ({
  type: REMOVE_TASK_FROM_TASKS,
  payload: id,
});

const resetTasks = (): ResetTasksAction => ({
  type: RESET_TASKS,
  payload: undefined, // Как организовать редьюсер, чтобы убрать этот костыль?
});

type TasksActions =
  | AddStandToTasksAction
  | RemoveStandFromTasksAction
  | AddTaskToTasksAction
  | RemoveTaskFromTasksAction
  | ResetTasksAction;

const tasksReducer = (
  state: TasksState = initialState,
  action: TasksActions,
) => {
  switch (action.type) {
    case ADD_STAND_TO_TASKS: {
      const host = action.payload as string;
      return {
        ...state,
        stands: [...state.stands, host],
      };
    }
    case REMOVE_STAND_FROM_TASKS: {
      const standHost = action.payload as string;
      const filteredStands = state.stands.filter((host) => host !== standHost);
      return {
        ...state,
        stands: filteredStands,
      };
    }
    case ADD_TASK_TO_TASKS: {
      const task = action.payload as { [key: string]: string };
      return {
        ...state,
        tasks: [...state.tasks, { id: state.tasks.length + 1, ...task }],
      };
    }
    case REMOVE_TASK_FROM_TASKS: {
      const taskId = action.payload as number;
      const filteredTasks = state.tasks.filter((task) => task.id !== taskId);
      return {
        ...state,
        tasks: filteredTasks,
      };
    }
    case RESET_TASKS:
      return {
        stands: [],
        tasks: [],
      }
    default:
      return state;
  }
};

export {
  addStandToTasks,
  removeStandFromTasks,
  addTaskToTasks,
  removeTaskFromTasks,
  resetTasks,
  tasksReducer,
};
