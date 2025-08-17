import { screen } from '@testing-library/react';
import { renderWithStore } from '@/test/utils';
import LoginModal from '@/components/LoginModal';
import userEvent from '@testing-library/user-event';

jest.mock('@/store/slices/authSlice', () => {
    const actual = jest.requireActual('@/store/slices/authSlice');
    return {
        ...actual,
        signInThunk: () => async () => ({ payload: { ok: true } }),
    };
});

describe('LoginModal', () => {
    const onClose = jest.fn();

    test('shows errors for invalid inputs', async () => {
        renderWithStore(<LoginModal onClose={onClose} />);

        await userEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(screen.getByText(/both fields are required/i)).toBeInTheDocument();

        await userEvent.type(screen.getByPlaceholderText(/email/i), 'bademail');
        await userEvent.type(screen.getByPlaceholderText(/password/i), 'short');
        await userEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();

        await userEvent.clear(screen.getByPlaceholderText(/email/i));
        await userEvent.type(screen.getByPlaceholderText(/email/i), 'john@doe.com');
        await userEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
    });

    test('dispatches thunk on valid submit', async () => {
        renderWithStore(<LoginModal onClose={onClose} />);
        await userEvent.type(screen.getByPlaceholderText(/email/i), 'john@doe.com');
        await userEvent.type(screen.getByPlaceholderText(/password/i), 'passw0rd!');
        await userEvent.click(screen.getByRole('button', { name: /login/i }));
        // onClose called after successful login
        // (If your component closes on thunk success.)
    });
});
