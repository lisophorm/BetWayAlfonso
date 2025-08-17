import React, {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {render} from '@testing-library/react';
import auth from '@/store/slices/authSlice';
import content from '@/store/slices/contentSlice';
import register from '@/store/slices/registerSlice';

export function renderWithStore(ui: React.ReactElement, preloadedState?: any) {
    const store = configureStore({reducer: {auth, content, register}, preloadedState});

    function Wrapper({children}: PropsWithChildren) {
        return <Provider store={store}>{children}</Provider>;
    }

    return {store, ...render(ui, {wrapper: Wrapper})};
}
