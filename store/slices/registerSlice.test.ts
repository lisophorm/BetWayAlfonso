import reducer, { patchForm, setStep, submitRegistrationThunk } from './registerSlice';

describe('registerSlice', () => {
    test('patchForm updates nested fields', () => {
        const state = reducer(undefined, patchForm({ firstName: 'John' }) as any);
        expect(state.form.firstName).toBe('John');
    });

    test('setStep moves the wizard', () => {
        const s1 = reducer(undefined, setStep(2) as any);
        expect(s1.step).toBe(2);
    });

    test('submitRegistrationThunk posts form', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ accountId: 'z', status: 'created' }) });
        const dispatch = jest.fn();
        const getState = () => ({ register: reducer(undefined, patchForm({ firstName: 'John' }) as any) } as any);
        const action = await submitRegistrationThunk()(dispatch, getState, undefined);
        expect(action.type).toMatch(/fulfilled/);
    });
});
