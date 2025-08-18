import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import contentReducer from './slices/contentSlice';
import registerReducer from './slices/registerSlice';

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
