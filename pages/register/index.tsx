'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
    selectRegister,
    setStep,
    patchForm,
    submitRegistrationThunk,
    type StepKey,
} from '../../store/slices/registerSlice';
import {useAppDispatch, useAppSelector} from "../../store/hooks";

const TITLES = ['Mr', 'Ms', 'Mrs', 'Mx', 'Dr'] as const;

export default function RegisterPage() {
    const dispatch = useAppDispatch();
    const { step, form, status, error } = useAppSelector(selectRegister);

    const steps = useMemo(
        () => [
            { key: 1, label: 'Welcome Offer' },
            { key: 2, label: 'Personal Details' },
            { key: 3, label: 'Account Information' },
            { key: 4, label: 'Contact Details' },
        ],
        []
    );

    const next = () => {
        if (step < 4) dispatch(setStep((step + 1) as StepKey));
        else dispatch(submitRegistrationThunk());
    };
    const prev = () => {
        if (step > 1) dispatch(setStep((step - 1) as StepKey));
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
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
                        <button className="btn btn-secondary" onClick={prev} disabled={step === 1 || status === 'submitting'}>
                            Back
                        </button>
                        <button className="btn btn-primary" onClick={next} disabled={status === 'submitting'}>
                            {step === 4 ? (status === 'submitting' ? 'Submitting…' : 'Finish') : 'Next'}
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

/* ===== Helpers ===== */
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
    return <span className="inline-block ml-2 align-middle text-[var(--brand)] font-bold">✔</span>;
}
function okClass(ok: boolean) {
    return ok ? 'text-[var(--brand)]' : 'text-gray-400';
}

/* ===== Steps ===== */
function Step1() {
    const dispatch = useAppDispatch();
    const { form } = useAppSelector(selectRegister);
    return (
        <>
            <h2 className="text-lg font-bold mb-3">Choose the Welcome Offer</h2>
            <div className="border rounded-md overflow-hidden">
                <label className="flex items-start gap-3 p-4 border-b cursor-pointer">
                    <input
                        type="radio"
                        checked={form.offer === 'sports'}
                        onChange={() => dispatch(patchForm({ offer: 'sports' }))}
                    />
                    <div className="grow">
                        <span className="font-bold text-[var(--brand)]">Sports</span>
                        <p className="text-xs opacity-70 mt-1">Upto £30 Matched Free Bet + 100 Free Spins</p>
                    </div>
                </label>
                <label className="flex items-start gap-3 p-4 cursor-pointer">
                    <input
                        type="radio"
                        checked={form.offer === 'none'}
                        onChange={() => dispatch(patchForm({ offer: 'none' }))}
                    />
                    <div className="grow">
                        <span className="font-semibold">No Welcome Offer</span>
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
                    <Select value={form.title} onChange={(e) => dispatch(patchForm({ title: e.target.value as any }))}>
                        {TITLES.map((t) => (
                            <option key={t}>{t}</option>
                        ))}
                    </Select>
                </div>
                <div>
                    <FieldLabel>First Name</FieldLabel>
                    <Input value={form.firstName} onChange={(e) => dispatch(patchForm({ firstName: e.target.value }))} />
                </div>
                <div>
                    <FieldLabel>Last Name</FieldLabel>
                    <Input value={form.lastName} onChange={(e) => dispatch(patchForm({ lastName: e.target.value }))} />
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
                    <Input value={form.username} onChange={(e) => dispatch(patchForm({ username: e.target.value }))} />
                </div>
                <div>
                    <FieldLabel>Password</FieldLabel>
                    <div className="relative">
                        <Input
                            type={show ? 'text' : 'password'}
                            value={form.password}
                            onChange={(e) => dispatch(patchForm({ password: e.target.value }))}
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShow((s) => !s)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                        >
                            {show ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <div className="mt-2 text-sm">
                        <p className={okClass(strong)}>✔ At least 8 characters</p>
                    </div>
                </div>
                <div>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => dispatch(patchForm({ email: e.target.value }))}
                    />
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
            <FieldLabel>Phone (optional)</FieldLabel>
            <Input
                inputMode="tel"
                value={form.phone}
                onChange={(e) => dispatch(patchForm({ phone: e.target.value }))}
            />
        </>
    );
}
