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

const addStandToTasks = (id: number): AddStandToTasksAction => ({
  type: ADD_STAND_TO_TASKS,
  payload: id,
});

const removeStandFromTasks = (id: number): RemoveStandFromTasksAction => ({
  type: REMOVE_STAND_FROM_TASKS,
  payload: id,
});

const addTaskToTasks = (id: number): AddTaskToTasksAction => ({
  type: ADD_TASK_TO_TASKS,
  payload: id,
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
      const standId = action.payload as number;
      return {
        ...state,
        stands: [...state.stands, standId],
      };
    }
    case REMOVE_STAND_FROM_TASKS: {
      const standId = action.payload as number;
      const filteredStands = state.stands.filter((id) => id !== standId);
      return {
        ...state,
        stands: filteredStands,
      };
    }
    case ADD_TASK_TO_TASKS: {
      const taskId = action.payload as number;
      const existingTask = state.tasks.find((task) => task.taskId === taskId);
      if (!existingTask) {
        return {
          ...state,
          tasks: [...state.tasks, { id: state.tasks.length + 1, taskId }].map(
            ({ taskId }, index) => ({ id: index, taskId }),
          ),
        };
      }
      return state;
    }
    case REMOVE_TASK_FROM_TASKS: {
      const taskId = action.payload as number;
      const filteredTasks = state.tasks.filter(
        (task) => task.taskId !== taskId,
      );
      return {
        ...state,
        tasks: filteredTasks.map(({ taskId }, index) => ({
          id: index,
          taskId,
        })),
      };
    }
    case RESET_TASKS:
      return {
        stands: [],
        tasks: [],
      };
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
