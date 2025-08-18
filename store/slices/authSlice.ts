import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../';
import {SignInResponse} from "../../content/types/type.SigninResponse";
import {AuthState} from "../../content/types/type.AuthState";


export const signInThunk = createAsyncThunk<SignInResponse, { email: string; password: string }>(
    'auth/signIn',
    async (payload) => {
        const res = await fetch('/api/sign-in', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Sign-in failed');
        const data: SignInResponse = await res.json();
        console.log('Login complete:', data);
        return data;
    }
);


const initialState: AuthState = {user: null, status: 'idle'};

export const authInitialState: AuthState = initialState;

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut(state) {
            state.user = null;
            state.status = 'idle';
            state.error = undefined;
        }
    },
    extraReducers: (b) => {
        b.addCase(signInThunk.pending, (s) => {
            s.status = 'loading';
            s.error = undefined;
        });
        b.addCase(signInThunk.fulfilled, (s, a) => {
            s.status = 'succeeded';
            s.user = a.payload;
        });
        b.addCase(signInThunk.rejected, (s, a) => {
            s.status = 'failed';
            s.error = a.error.message;
        });
    }
});

export const {signOut} = slice.actions;
export const selectAuth = (st: RootState) => st.auth ?? authInitialState;
export default slice.reducer;
