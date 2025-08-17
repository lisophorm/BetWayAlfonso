// /services/auth.ts

import {SignInResponse} from "../content/types/type.SigninResponse";

export async function signIn(email: string, password: string): Promise<SignInResponse> {
    const res = await fetch('/api/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error('Sign-in failed');
    }

    return res.json();
}
