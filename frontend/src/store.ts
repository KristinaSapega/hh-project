
import { configureStore } from '@reduxjs/toolkit';
import stands from './store/stands';
import plugins from './store/plugins';
import tasks from './store/tasks';

export const store = configureStore({
    reducer: {
        stands,
        plugins,
        tasks,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
