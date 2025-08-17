import { emailRx, isAtLeast18, isValidPhone } from './validation';

describe('validation helpers', () => {
    test('email regex', () => {
        expect(emailRx.test('john@doe.com')).toBe(true);
        expect(emailRx.test('a@b')).toBe(false);
        expect(emailRx.test('x@y.')).toBe(false);
        expect(emailRx.test('')).toBe(false);
    });

    test('isAtLeast18', () => {
        const now = new Date();
        const seventeen = { day: 1, month: 1, year: now.getFullYear() - 17 };
        const nineteen = { day: 1, month: 1, year: now.getFullYear() - 19 };
        expect(isAtLeast18(seventeen)).toBe(false);
        expect(isAtLeast18(nineteen)).toBe(true);
    });

    test('isValidPhone', () => {
        expect(isValidPhone('')).toBe(true); // optional
        expect(isValidPhone('+44 7123 456 789')).toBe(true);
        expect(isValidPhone('071234')).toBe(false);
        expect(isValidPhone('+123456789012345')).toBe(true);  // 15 digits
        expect(isValidPhone('+1234567890123456')).toBe(false); // 16 digits
    });
});
