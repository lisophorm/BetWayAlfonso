import reducer, { signInThunk } from './authSlice';

describe('authSlice', () => {
    beforeEach(() => {
        // @ts-ignore
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ accountId: 'abc', accountStatus: 'verified', name: 'John', registeredCountry: 'GBR' }),
        });
    });

    test('signInThunk fulfills', async () => {
        const dispatch = jest.fn();
        const getState = jest.fn();
        const action: any = await signInThunk({ email: 'a@b.com', password: 'passw0rd' })(dispatch, getState, undefined);
        expect(action.type).toMatch(/fulfilled/);
        expect(action.payload.accountStatus).toBe('verified');
    });

    test('reducer sets user on fulfilled', () => {
        const state = reducer(undefined, { type: signInThunk.fulfilled.type, payload: { accountId:'x', accountStatus:'verified', name:'N', registeredCountry:'GBR' } });
        expect(state.user?.accountId).toBe('x');
    });
});
