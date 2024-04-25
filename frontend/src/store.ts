
import { configureStore } from '@reduxjs/toolkit';
import stands from './store/stands';

export const store = configureStore({
    reducer: {
        stands
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
