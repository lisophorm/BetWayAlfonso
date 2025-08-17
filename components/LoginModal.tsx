'use client';

import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {selectAuth, signInThunk} from '../store/slices/authSlice';
import {emailRx} from "../lib/validation";
import Link from "next/link";

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
        const v = validate();
        if (v) {
            setError(v);
            return
        }
        setError('');
        try {
            await dispatch(signInThunk({email, password})).unwrap();
            onClose();
        } catch {
            setError('Login failed');
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold interface-font">Login</h2>
                    <button aria-label="Close" onClick={onClose} className="ml-4 text-gray-500 hover:text-black">✕
                    </button>
                </div>

                {error && <p className="text-red-600 mb-2">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="flex justify-end gap-2 mt-2">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Signing in…' : 'Login'}
                        </button>
                    </div>
                </form>

                <div className="mt-3 text-sm flex justify-between">
                    <Link href="#" className="text-[var(--brand)] hover:opacity-80">Forgot Username/Password</Link>
                    <Link href="/register" className="text-[var(--brand)] hover:opacity-80">Register here</Link>
                </div>
            </div>
        </div>
    );
}
