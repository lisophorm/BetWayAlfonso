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

