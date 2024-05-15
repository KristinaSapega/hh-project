import { Slice, createSlice } from '@reduxjs/toolkit';

import { AddErrorNotificationAction, INotificatonsState } from '../types';
import { apiGetPlugins } from './plugins';
import { apiGetStands, apiLeaveStand, apiTakeStand } from './stands';

const initialState: INotificatonsState = {
  notifications: [],
};

const notificationsSlice: Slice<INotificatonsState> = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push({
        type: action.payload.type,
        message: action.payload.message,
      });
    },
    resetNotifications: (state) => {
      state.notifications = [];
    },
  },
  extraReducers(builder) {
    const addErrorNotification = (
      state: INotificatonsState,
      action: AddErrorNotificationAction,
    ) => {
      state.notifications.push({
        type: 'error',
        message: action.error.message,
      });
    };

    builder
      .addCase(apiGetStands.rejected, addErrorNotification)
      .addCase(apiLeaveStand.rejected, addErrorNotification)
      .addCase(apiTakeStand.rejected, addErrorNotification)
      .addCase(apiGetPlugins.rejected, addErrorNotification);
  },
});

export default notificationsSlice.reducer;
export const { addNotification, resetNotifications } =
  notificationsSlice.actions;
