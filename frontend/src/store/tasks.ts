import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    stands: [] as number[],
    tasks: [] as number[],
  },
  reducers: {
    addTaskToQueue: (state, action) => {
      const task = action.payload;
      return {
        ...state,
        tasks: [...state.tasks, task],
      };
    },
    removeTaskFromQueue: (state, action) => {
      const taskId = action.payload;
      const filteredTasks = state.tasks.filter((id) => id !== taskId);
      return {
        ...state,
        tasks: filteredTasks,
      };
    },
    addStandToQueue: (state, action) => {
      const standId = action.payload;
      return {
        ...state,
        stands: [...state.stands, standId],
      };
    },
    removeStandFromQueue: (state, action) => {
      const standId = action.payload;
      const filteredStands = state.stands.filter((id) => id !== standId);
      return {
        ...state,
        stands: filteredStands,
      };
    },
    resetTasks: () => {
      return {
        stands: [],
        tasks: [],
      };
    },
  },
});

export const {
  addTaskToQueue,
  removeTaskFromQueue,
  addStandToQueue,
  removeStandFromQueue,
  resetTasks,
} = tasksSlice.actions;
export default tasksSlice.reducer;
