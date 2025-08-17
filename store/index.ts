import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/authSlice';
import content from './slices/contentSlice';
import register from './slices/registerSlice';

export const store = configureStore({
    reducer: { auth, content, register },
    middleware: (gDM) => gDM(), // default middleware incl. thunk & immutability checks
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
