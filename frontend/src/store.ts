import { configureStore } from '@reduxjs/toolkit';

import notifications from './store/notifications';
import plugins from './store/plugins';
import stands from './store/stands';
import tasks from './store/tasks';

export const store = configureStore({
  reducer: {
    stands,
    plugins,
    tasks,
    notifications,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
