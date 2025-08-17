// jest.setup.ts
import '@testing-library/jest-dom';
import React from 'react';


jest.mock('next/image', () => {
    return function NextImage(props: any) {
        return React.createElement('img', props);
    };
});

// (Optional) silence act() warnings if a lib is noisy
const originalError = console.error;
beforeAll(() => {
    console.error = (...args: any[]) => {
        const msg = args[0] || '';
        if (typeof msg === 'string' && msg.includes('act(')) return;
        originalError(...args);
    };
});
afterAll(() => {
    console.error = originalError;
});
