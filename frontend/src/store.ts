
import { configureStore } from '@reduxjs/toolkit';
import stands from './store/stands';
import plugins from './store/plugins';

export const store = configureStore({
    reducer: {
        stands,
        plugins
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
