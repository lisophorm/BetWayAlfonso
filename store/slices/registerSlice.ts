import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../';

export type StepKey = 1 | 2 | 3 | 4;
export type RegistrationPayload = {
    offer: 'sports' | 'none';
    title: 'Mr' | 'Ms' | 'Mrs' | 'Mx' | 'Dr';
    firstName: string;
    lastName: string;
    dob: { day: number; month: number; year: number };
    username: string;
    password: string;
    email: string;
    phone?: string;
};

export const submitRegistrationThunk = createAsyncThunk<
    { accountId: string; status: 'created' },
    void,
    { state: RootState }
>('register/submit', async (_void, api) => {
    const payload = api.getState().register.form;
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Registration failed');
    const data = await res.json();
    console.log('Registration complete:', { payload, res: data });
    return data;
});

type RegisterState = {
    step: StepKey;
    form: RegistrationPayload;
    status: 'idle' | 'submitting' | 'succeeded' | 'failed';
    error?: string;
};

const initialState: RegisterState = {
    step: 1,
    form: {
        offer: 'none',
        title: 'Mr',
        firstName: '',
        lastName: '',
        dob: { day: 1, month: 1, year: 1990 },
        username: '',
        password: '',
        email: '',
        phone: '',
    },
    status: 'idle',
};

const slice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setStep(state, action: PayloadAction<StepKey>) { state.step = action.payload; },
        patchForm(state, action: PayloadAction<Partial<RegistrationPayload>>) {
            state.form = { ...state.form, ...action.payload };
        },
    },
    extraReducers: (b) => {
        b.addCase(submitRegistrationThunk.pending, (s)=>{ s.status='submitting'; s.error=undefined; });
        b.addCase(submitRegistrationThunk.fulfilled, (s)=>{ s.status='succeeded'; });
        b.addCase(submitRegistrationThunk.rejected, (s,a)=>{ s.status='failed'; s.error=a.error.message; });
    }
});

export const { setStep, patchForm } = slice.actions;
export const selectRegister = (st: RootState) => st.register;
export default slice.reducer;
