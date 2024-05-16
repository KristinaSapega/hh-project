// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchApplyPlugins } from '../api/fetchApplyPlugins'; 
// import { Task } from '../types';

// interface PluginState {
//     loading: boolean;
//     error: string | null;
//     data: ApplyPluginsResponse | null;
//   }

//   const initialState: PluginState = {
//     loading: false,
//     error: null,
//     data: null,
//   };

//   export const applyPlugins = createAsyncThunk(
//     'plugins/apiApplyPlugins',
//     async ({ user, standIds, tasks }: { user: string; standIds: number[]; tasks: Task[] }) => {
//       const response = await fetchApplyPlugins(user, standIds, tasks);
//       return response;
//     }
//   );
  
//   const pluginSlice = createSlice({
//     name: 'plugins',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//         .addCase(applyPlugins.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//           state.data = null;
//         })
//         .addCase(applyPlugins.fulfilled, (state, action) => {
//           state.loading = false;
//           state.error = null;
//           state.data = action.payload;
//         })
//         .addCase(applyPlugins.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message ?? 'Ошибка при применении плагина/плагинов к стенду';
//           state.data = null;
//         });
//     },
//   });
  
//   export default pluginSlice.reducer;


