import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import {AppStore, RootState, setupStore} from "@/store/index";

export function renderWithStore(
    ui: React.ReactElement,
    preloadedState?: Partial<RootState>
) {
    const store: AppStore = setupStore(preloadedState);

    function Wrapper({ children }: PropsWithChildren) {
        return <Provider store={store}>{children}</Provider>;
    }

    return { store, ...render(ui, { wrapper: Wrapper }) };
}
