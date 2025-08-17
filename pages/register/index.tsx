// /pages/register/index.tsx
'use client';

import {useMemo, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {patchForm, selectRegister, setStep, submitRegistrationThunk,} from '../../store/slices/registerSlice';
import {StepKey} from "../../content/types/type.RegistrationStep";
import {emailRx, isAtLeast18, isValidPhone} from "../../lib/validation";
import {TITLES} from "../../content/declarations/const.titles";

/* =========================
   Page
========================= */
export default function RegisterPage() {
    const dispatch = useAppDispatch();
    const { step, form, status } = useAppSelector(selectRegister);
    const [error, setError] = useState('');

    const steps = useMemo(
        () => [
            { key: 1 as StepKey, label: 'Welcome Offer' },
            { key: 2 as StepKey, label: 'Personal Details' },
            { key: 3 as StepKey, label: 'Account Information' },
            { key: 4 as StepKey, label: 'Contact Details' },
        ],
        []
    );

    const validateStep = (): string | null => {
        if (step === 1) {
            if (!form.offer) return 'Please select a welcome offer or choose no offer.';
        }
        if (step === 2) {
            if (!form.firstName || !form.lastName) return 'Please fill first and last name';
            const { day, month, year } = form.dob || { day: 0, month: 0, year: 0 };
            if (!day || !month || !year) return 'Please complete your date of birth.';
            if (!isAtLeast18(form.dob)) return 'You must be at least 18 years old to register.';
        }
        if (step === 3) {
            if (!form.username) return 'Please choose a username.';
            if (form.password.length < 8) return 'Password must be at least 8 characters.';
            if (!/[A-Za-z]/.test(form.password) || !/\d/.test(form.password))
                return 'Password must contain letters and numbers.';
            if (!emailRx.test(form.email)) return 'Please provide a valid email.';
        }
        if (step === 4) {
            if (!isValidPhone(form.phone || '')) return 'Please enter a valid phone number.';
        }
        return null;
    };

    const next = async () => {
        const v = validateStep();
        if (v) return setError(v);
        setError('');
        if (step < 4) dispatch(setStep((step + 1) as StepKey));
        else {
            try {
                await dispatch(submitRegistrationThunk()).unwrap();
                alert('Registration complete! Check the console.');
            } catch {
                setError('Registration failed. Please try again.');
            }
        }
    };

    const prev = () => {
        setError('');
        if (step > 1) dispatch(setStep((step - 1) as StepKey));
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            {/* Header */}
            <header className="bg-black text-white">
                <div className="container mx-auto px-4 py-3 flex items-center gap-4">
                    <Link href="/" className="inline-flex">
                        <Image
                            src="/images/betway-logo.svg"
                            alt="Betway"
                            width={112}
                            height={28}
                            className="invert"
                        />
                    </Link>
                    <span className="text-sm opacity-80">Create your account</span>
                </div>
            </header>

            {/* Main */}
            <main className="container mx-auto px-4 py-6">
                {/* Progress */}
                <ol className="relative grid grid-cols-4 gap-4 mb-6">
                    {steps.map((s, idx) => {
                        const active = s.key === step;
                        const done = s.key < step;
                        return (
                            <li key={s.key} className="flex items-center gap-3">
                <span
                    className={[
                        'inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-sm font-semibold',
                        done ? 'bg-[var(--brand)]' : active ? 'bg-[var(--brand)]' : 'bg-gray-300',
                    ].join(' ')}
                >
                  {s.key}
                </span>
                                <span className={['text-sm', active ? 'font-semibold' : 'opacity-70'].join(' ')}>
                  {s.label}
                </span>
                                {idx < steps.length - 1 && (
                                    <span className="absolute left-0 right-0 top-3.5 -z-10 h-0.5 bg-gray-200"></span>
                                )}
                            </li>
                        );
                    })}
                </ol>

                {/* Card */}
                <section className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                    {error && <p className="text-red-600 mb-3">{error}</p>}

                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                    {step === 4 && <Step4 />}

                    <div className="mt-6 flex items-center justify-between">
                        <button
                            className="btn btn-secondary"
                            onClick={prev}
                            disabled={step === 1 || status === 'submitting'}
                        >
                            Back
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={next}
                            disabled={status === 'submitting'}
                        >
                            {step === 4 ? (status === 'submitting' ? 'Submitting…' : 'Finish') : 'Next'}
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

/* =========================
   Small UI helpers
========================= */
function FieldLabel({ children }: { children: React.ReactNode }) {
    return <label className="block text-gray-700 mb-1 font-semibold">{children}</label>;
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={
                'w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] ' +
                (props.className ?? '')
            }
        />
    );
}
function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            className={
                'w-full border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand)] ' +
                (props.className ?? '')
            }
        />
    );
}
function OKBadge() {
    return (
        <span className="inline-block ml-2 align-middle text-[var(--brand)] font-bold">✔</span>
    );
}
function okClass(ok: boolean) {
    return ok ? 'text-[var(--brand)]' : 'text-gray-400';
}

/* =========================
   Steps
========================= */
function Step1() {
    const dispatch = useAppDispatch();
    const { form } = useAppSelector(selectRegister);

    const choose = (offer: 'sports' | 'none') => dispatch(patchForm({ offer }));

    return (
        <>
            <h2 className="text-lg font-bold mb-3">Choose the Welcome Offer</h2>
            <div className="border rounded-md overflow-hidden" role="radiogroup" aria-label="Welcome offer">
                {/* SPORTS */}
                <label
                    className="flex items-start gap-3 p-4 border-b cursor-pointer"
                    htmlFor="offer-sports"
                    onClick={() => choose('sports')}
                    data-testid="offer-sports-label"
                >
                    <input
                        id="offer-sports"
                        name="welcome-offer"
                        type="radio"
                        value="sports"
                        checked={form.offer === 'sports'}
                        onChange={() => choose('sports')}
                        aria-label="Sports"
                    />
                    <div className="grow">
            <span
                className="font-bold text-[var(--brand)]"
                role="button"
                tabIndex={0}
                onClick={() => choose('sports')}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && choose('sports')}
            >
              Sports
            </span>
                        <p className="text-xs opacity-70 mt-1">Upto £30 Matched Free Bet + 100 Free Spins</p>
                    </div>
                </label>

                {/* NONE */}
                <label
                    className="flex items-start gap-3 p-4 cursor-pointer"
                    htmlFor="offer-none"
                    onClick={() => choose('none')}
                    data-testid="offer-none-label"
                >
                    <input
                        id="offer-none"
                        name="welcome-offer"
                        type="radio"
                        value="none"
                        checked={form.offer === 'none'}
                        onChange={() => choose('none')}
                        aria-label="No Welcome Offer"
                    />
                    <div className="grow">
            <span
                className="font-semibold"
                role="button"
                tabIndex={0}
                onClick={() => choose('none')}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && choose('none')}
            >
              No Welcome Offer
            </span>
                    </div>
                </label>
            </div>
        </>
    );
}


function Step2() {
    const dispatch = useAppDispatch();
    const { form } = useAppSelector(selectRegister);
    return (
        <>
            <h2 className="text-lg font-bold mb-3">Personal Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <FieldLabel>Title</FieldLabel>
                    <Select
                        value={form.title}
                        onChange={(e) => dispatch(patchForm({ title: e.target.value as any }))}
                    >
                        {TITLES.map((t) => (
                            <option key={t}>{t}</option>
                        ))}
                    </Select>
                </div>

                <div>
                    <FieldLabel>First Name</FieldLabel>
                    <Input
                        value={form.firstName}
                        onChange={(e) => dispatch(patchForm({ firstName: e.target.value }))}
                    />
                </div>

                <div>
                    <FieldLabel>Last Name</FieldLabel>
                    <Input
                        value={form.lastName}
                        onChange={(e) => dispatch(patchForm({ lastName: e.target.value }))}
                    />
                </div>

                <div className="md:col-span-2">
                    <FieldLabel>Date of Birth</FieldLabel>
                    <div className="grid grid-cols-3 gap-2">
                        <Select
                            value={form.dob.day}
                            onChange={(e) =>
                                dispatch(patchForm({ dob: { ...form.dob, day: Number(e.target.value) } }))
                            }
                        >
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </Select>
                        <Select
                            value={form.dob.month}
                            onChange={(e) =>
                                dispatch(patchForm({ dob: { ...form.dob, month: Number(e.target.value) } }))
                            }
                        >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                                <option key={m} value={m}>
                                    {String(m).padStart(2, '0')}
                                </option>
                            ))}
                        </Select>
                        <Select
                            value={form.dob.year}
                            onChange={(e) =>
                                dispatch(patchForm({ dob: { ...form.dob, year: Number(e.target.value) } }))
                            }
                        >
                            {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
        </>
    );
}

function Step3() {
    const dispatch = useAppDispatch();
    const { form } = useAppSelector(selectRegister);
    const [show, setShow] = useState(false);
    const strong = form.password.length >= 8;

    return (
        <>
            <h2 className="text-lg font-bold mb-3">Account Information</h2>
            <div className="space-y-4">
                <div>
                    <FieldLabel>Username</FieldLabel>
                    <Input
                        value={form.username}
                        onChange={(e) => dispatch(patchForm({ username: e.target.value }))}
                    />
                    {form.username && <OKBadge />}
                </div>

                <div>
                    <FieldLabel>Password</FieldLabel>
                    <div className="relative">
                        <Input
                            type={show ? 'text' : 'password'}
                            value={form.password}
                            onChange={(e) => dispatch(patchForm({ password: e.target.value }))}
                            className="pr-10"
                            aria-describedby="password-help"
                        />
                        <button
                            type="button"
                            onClick={() => setShow((s) => !s)}
                            aria-label={show ? 'Hide password' : 'Show password'}
                            aria-pressed={show}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-opacity"
                        >
                            {show ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <div id="password-help" className="mt-2 text-sm">
                        <p className={okClass(strong)}>✔ At least 8 characters</p>
                        <p
                            className={
                                /[A-Za-z]/.test(form.password) && /\d/.test(form.password)
                                    ? 'text-[var(--brand)]'
                                    : 'text-gray-400'
                            }
                        >
                            ✔ Contains letters and numbers
                        </p>
                        <p
                            className={
                                !form.username || !form.password.includes(form.username)
                                    ? 'text-[var(--brand)]'
                                    : 'text-gray-400'
                            }
                        >
                            ✔ Does not contain your username
                        </p>
                    </div>
                </div>

                <div>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                        type="text" // custom validation; avoid built-in browser validation
                        value={form.email}
                        onChange={(e) => dispatch(patchForm({ email: e.target.value }))}
                    />
                    {form.email && emailRx.test(form.email) && <OKBadge />}
                </div>
            </div>
        </>
    );
}

function Step4() {
    const dispatch = useAppDispatch();
    const { form } = useAppSelector(selectRegister);
    return (
        <>
            <h2 className="text-lg font-bold mb-3">Contact Details</h2>
            <div className="space-y-4">
                <div>
                    <FieldLabel>Phone {/** optional */}</FieldLabel>
                    <Input
                        inputMode="tel"
                        value={form.phone}
                        onChange={(e) => dispatch(patchForm({ phone: e.target.value }))}
                        placeholder="+44 7123 456 789"
                    />
                    {form.phone && !isValidPhone(form.phone) && (
                        <p className="text-sm text-red-600 mt-1">Please enter a valid phone number.</p>
                    )}
                </div>

                <div className="text-sm text-gray-600">
                    We will use <strong>{form.email || 'your email'}</strong> to send account updates.
                </div>
            </div>
        </>
    );
}
