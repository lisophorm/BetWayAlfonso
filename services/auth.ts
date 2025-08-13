// /services/auth.ts
export type SignInResponse = {
    accountId: string;
    accountStatus: string;
    name: string;
    registeredCountry: string;
};

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
