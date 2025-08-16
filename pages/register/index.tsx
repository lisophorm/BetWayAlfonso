// /pages/register/index.tsx
'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {RegistrationPayload, submitRegistration} from "../../services/register";

type StepKey = 1 | 2 | 3 | 4;

const TITLES = ['Mr', 'Ms', 'Mrs', 'Mx', 'Dr'] as const;

export default function RegisterPage() {
    const [step, setStep] = useState<StepKey>(1);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string>('');

    // form state
    const [offer, setOffer] = useState<'sports' | 'none'>('none');

    const [title, setTitle] = useState<typeof TITLES[number]>('Mr');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState({ day: 1, month: 1, year: 1990 });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [phone, setPhone] = useState('');

    const steps = useMemo(
        () => [
            { key: 1, label: 'Welcome Offer' },
            { key: 2, label: 'Personal Details' },
            { key: 3, label: 'Account Information' },
            { key: 4, label: 'Contact Details' },
        ],
        []
    );

    function next() {
        setError('');
        if (step === 1) return setStep(2);
        if (step === 2) {
            if (!firstName || !lastName) return setError('Please fill first and last name.');
            return setStep(3);
        }
        if (step === 3) {
            if (!username || password.length < 8 || !/^[^@]+@[^@]+\.[^@]+$/.test(email))
                return setError('Please enter a username, a strong password (8+) and a valid email.');
            return setStep(4);
        }
        if (step === 4) return handleSubmit();
    }

    function prev() {
        setError('');
        if (step > 1) setStep((s) => (s - 1) as StepKey);
    }

    async function handleSubmit() {
        setBusy(true);
        setError('');
        const payload: RegistrationPayload = {
            offer,
            title,
            firstName,
            lastName,
            dob,
            username,
            password,
            email,
            phone,
        };
        try {
            const res = await submitRegistration(payload);
            console.log('Registration complete:', { payload, res }); // <- per your spec
            alert('Registration complete! Check the console.');
        } catch (e) {
            setError('Registration failed. Please try again.');
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            {/* Simple header with logo link back home */}
            <header className="bg-black text-white">
                <div className="container mx-auto px-4 py-3 flex items-center gap-4">
                    <Link href="/" className="inline-flex">
                        <Image src="/images/betway-logo.svg" alt="Betway" width={112} height={28} className="invert" />
                    </Link>
                    <span className="text-sm opacity-80">Create your account</span>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                {/* Progress bar */}
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
                                <span className={['text-sm', active ? 'font-semibold' : 'opacity-70'].join(' ')}>{s.label}</span>
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

                    {step === 1 && (
                        <Step1 offer={offer} setOffer={setOffer} />
                    )}

                    {step === 2 && (
                        <Step2
                            title={title}
                            setTitle={setTitle}
                            firstName={firstName}
                            setFirstName={setFirstName}
                            lastName={lastName}
                            setLastName={setLastName}
                            dob={dob}
                            setDob={setDob}
                        />
                    )}

                    {step === 3 && (
                        <Step3
                            username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                            email={email}
                            setEmail={setEmail}
                        />
                    )}

                    {step === 4 && (
                        <Step4 phone={phone} setPhone={setPhone} email={email} />
                    )}

                    <div className="mt-6 flex items-center justify-between">
                        <button className="btn btn-secondary" onClick={prev} disabled={step === 1 || busy}>
                            Back
                        </button>
                        <button className="btn btn-primary" onClick={next} disabled={busy}>
                            {step === 4 ? (busy ? 'Submitting…' : 'Finish') : 'Next'}
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

/* ============== STEP PANELS ============== */

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

/* Step 1 — Welcome Offer */
function Step1({
                   offer,
                   setOffer,
               }: {
    offer: 'sports' | 'none';
    setOffer: (v: 'sports' | 'none') => void;
}) {
    return (
        <>
            <h2 className="text-lg font-bold mb-3">Choose the Welcome Offer you would like to receive</h2>

            <div className="border rounded-md overflow-hidden">
                <label className="flex items-start gap-3 p-4 border-b cursor-pointer">
                    <input
                        type="radio"
                        className="mt-1"
                        name="offer"
                        checked={offer === 'sports'}
                        onChange={() => setOffer('sports')}
                    />
                    <div className="grow">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-[var(--brand)]">sports</span>
                            <span className="text-sm underline opacity-80">View all offers</span>
                        </div>
                        <p className="mt-1">Upto £30 Matched Free Bet if your first Acca loses + 100 Free Spins</p>
                        <p className="text-xs opacity-70 mt-1">Full Terms apply</p>
                    </div>
                </label>

                <label className="flex items-start gap-3 p-4 cursor-pointer">
                    <input
                        type="radio"
                        className="mt-1"
                        name="offer"
                        checked={offer === 'none'}
                        onChange={() => setOffer('none')}
                    />
                    <div className="grow">
                        <span className="font-semibold">No Welcome Offer</span>
                    </div>
                </label>
            </div>
        </>
    );
}

/* Step 2 — Personal Details */
function Step2({
                   title, setTitle,
                   firstName, setFirstName,
                   lastName, setLastName,
                   dob, setDob,
               }: {
    title: typeof TITLES[number];
    setTitle: (v: typeof TITLES[number]) => void;
    firstName: string; setFirstName: (v: string) => void;
    lastName: string; setLastName: (v: string) => void;
    dob: { day: number; month: number; year: number }; setDob: (v: { day: number; month: number; year: number }) => void;
}) {
    return (
        <>
            <h2 className="text-lg font-bold mb-3">Personal Details</h2>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <FieldLabel>Title</FieldLabel>
                    <Select value={title} onChange={(e) => setTitle(e.target.value as any)}>
                        {TITLES.map((t) => (<option key={t} value={t}>{t}</option>))}
                    </Select>
                </div>

                <div>
                    <FieldLabel>First Name</FieldLabel>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>

                <div>
                    <FieldLabel>Last Name</FieldLabel>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="md:col-span-2">
                    <FieldLabel>Date of Birth</FieldLabel>
                    <div className="grid grid-cols-3 gap-2">
                        <Select value={dob.day} onChange={(e) => setDob({ ...dob, day: Number(e.target.value) })}>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (<option key={d} value={d}>{d}</option>))}
                        </Select>
                        <Select value={dob.month} onChange={(e) => setDob({ ...dob, month: Number(e.target.value) })}>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (<option key={m} value={m}>{String(m).padStart(2,'0')}</option>))}
                        </Select>
                        <Select value={dob.year} onChange={(e) => setDob({ ...dob, year: Number(e.target.value) })}>
                            {Array.from({ length: 80 }, (_, i) => 2024 - i).map((y) => (<option key={y} value={y}>{y}</option>))}
                        </Select>
                    </div>
                </div>
            </div>
        </>
    );
}

/* Step 3 — Account Information */
function Step3({
                   username, setUsername,
                   password, setPassword,
                   email, setEmail,
               }: {
    username: string; setUsername: (v: string) => void;
    password: string; setPassword: (v: string) => void;
    email: string; setEmail: (v: string) => void;
}) {
    const strong = password.length >= 8;
    return (
        <>
            <h2 className="text-lg font-bold mb-3">Account Information</h2>

            <div className="space-y-4">
                <div>
                    <FieldLabel>Username</FieldLabel>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                    {username && <OKBadge />}
                </div>

                <div>
                    <FieldLabel>Password</FieldLabel>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="mt-2 text-sm">
                        <p className={okClass(strong)}>✔ Your password should be at least 8 characters.</p>
                        <p className={okClass(/[A-Za-z]/.test(password) && /\d/.test(password))}>✔ Contains letters and numbers.</p>
                        <p className={okClass(!username || !password.includes(username))}>✔ Does not contain your username.</p>
                    </div>
                </div>

                <div>
                    <FieldLabel>Email</FieldLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {email && /^[^@]+@[^@]+\.[^@]+$/.test(email) && <OKBadge />}
                </div>
            </div>
        </>
    );
}

/* Step 4 — Contact Details (minimal) */
function Step4({
                   phone, setPhone, email
               }: {
    phone: string; setPhone: (v: string) => void;
    email: string;
}) {
    return (
        <>
            <h2 className="text-lg font-bold mb-3">Contact Details</h2>

            <div className="space-y-4">
                <div>
                    <FieldLabel>Phone (optional)</FieldLabel>
                    <Input inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="text-sm text-gray-600">
                    We will use <strong>{email || 'your email'}</strong> to send account updates.
                </div>
            </div>
        </>
    );
}

/* small UI helpers */
function OKBadge() {
    return <span className="inline-block ml-2 align-middle text-[var(--brand)] font-bold">✔</span>;
}
function okClass(ok: boolean) {
    return ok ? 'text-[var(--brand)]' : 'text-gray-400';
}
