import {SignInResponse} from "./type.SigninResponse";

export type AuthState = {
    user: SignInResponse | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
};