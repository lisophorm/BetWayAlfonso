'use client';

import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {selectAuth, signInThunk} from '../store/slices/authSlice';
import {emailRx} from '../lib/validation';
import Link from 'next/link';

type Props = { onClose: () => void };

export default function LoginModal({onClose}: Props) {
    const dispatch = useAppDispatch();
    const {status} = useAppSelector(selectAuth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validate = (): string | null => {
        if (!email || !password) return 'Both fields are required';
        if (!emailRx.test(email)) return 'Invalid email';
        if (password.length < 8) return 'Password must be at least 8 characters';
        return null;
    };

    async function handleSubmit(e?: React.FormEvent) {
        e?.preventDefault();
        const msg = validate();
        if (msg) return setError(msg);
        setError('');
        try {
            await dispatch(signInThunk({email, password})).unwrap();
            onClose();
        } catch {
            setError('Invalid credentials');
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30" onClick={onClose}/>

            <div
                className="relative bg-white shadow-xl overflow-hidden w-screen md:w-[92%] md:max-w-[640px] md:rounded-md">
                {/* Header */}
                <div className="relative px-4 md:px-6 pt-5 pb-3 border-b">
                    <button
                        aria-label="Close"
                        onClick={onClose}
                        className="absolute right-3 top-3 text-xl leading-none opacity-70 hover:opacity-100"
                    >
                        ×
                    </button>
                    <h2 className="text-xl md:text-2xl font-semibold text-center">Login</h2>
                    <p className="mt-1 md:mt-2 text-sm md:text-base text-center">
                        New customer?{' '}
                        <Link href="/register"
                              className="text-brand-underline underline-offset-2 decoration-[1.5px] hover:opacity-80">
                            Register here
                        </Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="px-4 md:px-6 pt-4 pb-6">
                    {error && (
                        <div
                            role="alert"
                            className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-none md:rounded px-3 py-2"
                        >
                            {error}
                        </div>
                    )}

                    <label htmlFor="email" className="block md:text-base text-sm font-medium mb-1">
                        Username
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 px-3 text-sm py-3 md:text-base placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--brand)] focus:border-[var(--brand)] rounded-none md:rounded"
                    />

                    <label htmlFor="password" className="block md:text-base text-sm font-medium mt-3.5 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-3 text-sm md:text-base placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--brand)] focus:border-[var(--brand)] rounded-none md:rounded"
                    />

                    <div className="mt-5 flex justify-center">
                        <button
                            type="submit"
                            className="btn btn-primary w-1/2"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Signing in…' : 'Login'}
                        </button>
                    </div>

                    <div className="mt-3 text-sm text-center">
                        <Link
                            href="#"
                            className="text-brand underline font-semibold hover:opacity-80 no-underline"
                        >
                            Forgot Username/Password
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
