import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchBookStand } from '../api/fetchBookStand';
import { fetchReleaseStand } from '../api/fetchReleaseStand';
import fetchStands from '../api/fetchStands';
import { Stand } from '../types';
import { getUser } from './utils';

export const apiGetStands = createAsyncThunk(
  'stands/apiGetStands',
  async () => {
    const { header } = getUser();
    return header ? await fetchStands(header) : [];
  },
);

export const apiLeaveStand = createAsyncThunk(
  'stands/apiLeaveStand',
  async (standId: number) => {
    const { header } = getUser();
    await fetchReleaseStand(standId, header);
    return header && standId;
  },
);

export const apiTakeStand = createAsyncThunk(
  'stands/apiTakeStand',
  async (standId: number) => {
    const { header, login } = getUser();
    return header && (await fetchBookStand(standId, login, header));
  },
);

const slice = createSlice({
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
      .addCase(apiGetStands.rejected, (_state, action) => {
        alert(action.error.message);
      })
      .addCase(apiLeaveStand.fulfilled, (state, action) => {
        const id = action.payload;
        const stand = state.stands.find((s) => s.id === id);
        if (!stand) return;
        stand.takenBy = null;
      })
      .addCase(apiLeaveStand.rejected, (_state, action) => {
        alert(action.error.message);
      })
      .addCase(apiTakeStand.fulfilled, (state, action) => {
        const id = action.payload.standId;
        const stand = state.stands.find((s) => s.id === id);
        if (!stand) return;
        stand.takenBy = action.payload.email;
      })
      .addCase(apiTakeStand.rejected, (_state, action) => {
        alert(action.error.message);
      });
  },
});

export default slice.reducer;
