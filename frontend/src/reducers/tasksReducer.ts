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
    case ADD_STAND_TO_TASKS:
      return {
        ...state,
        stands: [...state.stands, action.payload],
      };
    case REMOVE_STAND_FROM_TASKS: {
      const filteredStands = state.stands.filter((id) => id !== action.payload);
      return {
        ...state,
        stands: filteredStands,
      };
    }
    case ADD_TASK_TO_TASKS:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: state.tasks.length + 1, standId: action.payload },
        ],
      };
    case REMOVE_TASK_FROM_TASKS: {
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload,
      );
      return {
        ...state,
        tasks: filteredTasks,
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
