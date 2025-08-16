// /services/register.ts
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

export type RegistrationResponse = {
    accountId: string;
    status: 'created' | 'pending' | 'rejected';
};

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
