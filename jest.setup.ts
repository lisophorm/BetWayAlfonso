import '@testing-library/jest-dom';

// Mock Next/Image to behave like a normal img
jest.mock('next/image', () => (props: any) => <img {...props} />);

// Optional: silence console.error for act() warnings if any noisy libs appear
const err = console.error;
beforeAll(() => {
    console.error = (...args: any[]) => {
        const msg = args[0] || '';
        if (typeof msg === 'string' && msg.includes('act(')) return;
        err(...args);
    };
});
afterAll(() => { console.error = err; });
