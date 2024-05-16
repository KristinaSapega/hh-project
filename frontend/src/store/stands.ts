import { Slice, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchBookStand } from '../api/fetchBookStand';
import { fetchReleaseStand } from '../api/fetchReleaseStand';
import fetchStands from '../api/fetchStands';
import { Stand } from '../types';
import { getUser } from './utils';

export const apiGetStands = createAsyncThunk<Stand[], string>(
  'stands/apiGetStands',
  async (header: string) => {
    return await fetchStands(header);
  },
);

export const apiLeaveStand = createAsyncThunk(
  'stands/apiLeaveStand',
  async (standId: number) => {
    const user = getUser();
    user && (await fetchReleaseStand(standId, user.header));
    return user && standId;
  },
);

export const apiTakeStand = createAsyncThunk(
  'stands/apiTakeStand',
  async (standId: number) => {
    const user = getUser();
    return user && (await fetchBookStand(standId, user.login, user.header));
  },
);

const slice: Slice<{ stands: Stand[] }> = createSlice({
  name: 'stands',
  initialState: {
    stands: [] as Stand[],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(apiGetStands.fulfilled, (state, action) => {
        state.stands = action.payload;
      })
      .addCase(apiLeaveStand.fulfilled, (state, action) => {
        const id = action.payload;
        const stand = state.stands.find((s) => s.id === id);
        if (!stand) return;
        stand.takenBy = null;
      })
      .addCase(apiTakeStand.fulfilled, (state, action) => {
        const id = action.payload?.standId;
        const stand = state.stands.find((s) => s.id === id);
        if (!stand) return;
        stand.takenBy = action.payload?.email as string;
      });
  },
});

export default slice.reducer;
