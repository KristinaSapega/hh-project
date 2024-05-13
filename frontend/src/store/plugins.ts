import { Slice, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchPlugins } from '../api/fetchPlugins';
import { Plugin } from '../types';

export const apiGetPlugins = createAsyncThunk(
  'plugins/apiGetPlugins',
  async (header: string) => {
    return await fetchPlugins(header);
  },
);

//export const apiSavePlugin = createAsyncThunk() ??сохранение изменений плагина
//export const apiCreatePlugin = createAsyncThunk() ??создание нового плагина

const pluginsSlice: Slice<{ plugins: Plugin[] }> = createSlice({
  name: 'plugins',
  initialState: {
    plugins: [] as Plugin[],
  },
  reducers: {
    //savePlugin
    //createPlugin
    //removePlugin?
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiGetPlugins.fulfilled, (state, action) => {
        state.plugins = action.payload;
      })
      .addCase(apiGetPlugins.rejected, (_state, action) => {
        console.log(action.error.message);
        // alert(action.error.message);
      });
  },
});

export default pluginsSlice.reducer;
