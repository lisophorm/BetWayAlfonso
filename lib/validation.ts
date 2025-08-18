export const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const digitsOnly = (s: string) => (s.match(/\d/g) || []).length;

export type DOB = { day: number; month: number; year: number };

export function isAtLeast18(dob: DOB) {
    const {day, month, year} = dob || ({} as DOB);
    const d = new Date(year, month - 1, day);
    if (Number.isNaN(d.getTime())) return false;
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const beforeBirthdayThisYear =
        now.getMonth() < d.getMonth() ||
        (now.getMonth() === d.getMonth() && now.getDate() < d.getDate());
    if (beforeBirthdayThisYear) age--;
    return age >= 18;
}

export function isValidPhone(phone: string) {
    if (!phone) return true;
    const count = digitsOnly(phone);
    return count >= 10 && count <= 15;
}
