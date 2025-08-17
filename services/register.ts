// /services/register.ts


import {RegistrationResponse} from "../content/types/type.Registration";
import {RegistrationPayload} from "../content/types/type.RegistrationStep";

export async function submitRegistration(
    payload: RegistrationPayload
): Promise<RegistrationResponse> {
    // Call our mock API route to avoid CORS (and keep a single place to swap a real API later)
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
}
