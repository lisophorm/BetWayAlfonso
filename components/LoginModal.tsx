'use client';

import { useState } from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {selectAuth, signInThunk} from "../store/slices/authSlice";

type Props = { onClose: () => void };

export default function LoginModal({ onClose }: Props) {
  const dispatch = useAppDispatch();
  const { status, error: authError } = useAppSelector(selectAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    setError('');
    if (!email || !password) return setError('Both fields required');
    try {
      await dispatch(signInThunk({ email, password })).unwrap();
      onClose();
    } catch {
      setError('Login failed');
    }
  }

  return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
          <h2 className="text-lg font-bold mb-4">Sign In</h2>
          {error && <p className="text-red-600">{error}</p>}
          {authError && <p className="text-red-600">{authError}</p>}
          <input
              type="email"
              placeholder="Email"
              className="border rounded-md px-3 py-2 w-full mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <input
              type="password"
              placeholder="Password"
              className="border rounded-md px-3 py-2 w-full mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={status === 'loading'}>
              {status === 'loading' ? 'Signing in…' : 'Login'}
            </button>
          </div>
        </div>
      </div>
  );
}
