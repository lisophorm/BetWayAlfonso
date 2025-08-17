import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import contentReducer from './slices/contentSlice';
import registerReducer from './slices/registerSlice';

// IMPORTANT: use the SAME KEYS you use in the real app.
// If your real app uses { authentication, content, registration },
// then rename the keys here to match exactly.
export const rootReducer = combineReducers({
    auth: authReducer,
    content: contentReducer,
    register: registerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Factory that can accept a preloaded state (used by tests)
export const setupStore = (preloadedState?: Partial<RootState>) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
    });

// App-wide store for production/dev usage
export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
