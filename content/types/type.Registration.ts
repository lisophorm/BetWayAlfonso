export type RegistrationResponse = {
    accountId: string;
    status: 'created' | 'pending' | 'rejected';
};

