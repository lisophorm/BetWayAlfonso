export type RegistrationStep = {
    key: number;
    label: string;
}

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

export type RegisterState = {
    step: StepKey;
    form: RegistrationPayload;
    status: 'idle' | 'submitting' | 'succeeded' | 'failed';
    error?: string;
};