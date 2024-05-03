import { createSlice } from '@reduxjs/toolkit';

const initialState: { stands: number[]; tasks: number[] } = {
  stands: [],
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskToQueue: (state, action) => {
      const task = action.payload;
      state.tasks.push(task);
    },
    removeTaskFromQueue: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((id) => id !== taskId);
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
    resetTasks: () => initialState,
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
