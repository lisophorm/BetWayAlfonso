import userEvent from '@testing-library/user-event';
import { screen, within } from '@testing-library/react';
import { renderWithStore } from '@/test/utils';
import RegisterPage from '@/pages/register';

jest.mock('@/store/slices/registerSlice', () => {
    const actual = jest.requireActual('@/store/slices/registerSlice');
    return {
        ...actual,
        submitRegistrationThunk: () => async () => ({ payload: { accountId: 'x', status: 'created' } }),
    };
});

describe('RegisterPage', () => {
    test('blocks progress until each step is valid', async () => {
        renderWithStore(<RegisterPage />);

        // Step 1: must choose an offer
        await userEvent.click(screen.getByRole('button', { name: /next/i }));
        expect(screen.getByText(/please select a welcome offer/i)).toBeInTheDocument();

        await userEvent.click(screen.getByText(/sports/i));
        await userEvent.click(screen.getByRole('button', { name: /next/i }));

        // Step 2: names + dob
        await userEvent.click(screen.getByRole('button', { name: /next/i }));
        expect(screen.getByText(/please fill first and last name/i)).toBeInTheDocument();

        // Fill names
        const inputs = screen.getAllByRole('textbox');
        await userEvent.type(inputs[0], 'John'); // first name
        await userEvent.type(inputs[1], 'Doe');  // last name

        // Set DoB to over 18
        const selects = screen.getAllByRole('combobox');
        await userEvent.selectOptions(selects[selects.length - 3], '1');      // day
        await userEvent.selectOptions(selects[selects.length - 2], '1');      // month
        await userEvent.selectOptions(selects[selects.length - 1], '1990');   // year
        await userEvent.click(screen.getByRole('button', { name: /next/i }));

        // Step 3: username/password/email
        const u = screen.getByLabelText(/username/i) || within(screen.getByText(/username/i)).getByRole('textbox');
        await userEvent.type(u, 'johnny');

        const pwd = screen.getByLabelText(/password/i) || screen.getAllByRole('textbox').find(e => (e as HTMLInputElement).type === 'password');
        await userEvent.type(pwd as Element, 'passw0rd!');

        const email = screen.getByText(/email/i).parentElement!.querySelector('input')!;
        await userEvent.type(email, 'john@doe.com');

        await userEvent.click(screen.getByRole('button', { name: /next/i }));

        // Step 4: phone optional, can finish
        await userEvent.click(screen.getByRole('button', { name: /finish/i }));
    });
});
