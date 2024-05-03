import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchPlugins } from '../api/fetchPlugins';
import { Plugin } from '../types';
import { getUser } from './utils';

export const apiGetPlugins = createAsyncThunk(
  'plugins/apiGetPlugins',
  async () => {
    const { header } = getUser();
    return header ? await fetchPlugins(header) : [];
  },
);

//export const apiSavePlugin = createAsyncThunk() ??сохранение изменений плагина
//export const apiCreatePlugin = createAsyncThunk() ??создание нового плагина

const pluginsSlice = createSlice({
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
        alert(action.error.message);
      });
  },
});

export default pluginsSlice.reducer;
