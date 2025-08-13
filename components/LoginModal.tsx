/* /components/LoginModal.tsx */
'use client';

import { useState } from 'react';
import { signIn } from '../services/auth';

type Props = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    setError('');
    if (!email || !password) return setError('Both fields are required');
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) return setError('Invalid email');
    if (password.length < 8) return setError('Password must be at least 8 characters');

    try {
      const data = await signIn(email, password);
      console.log(`Welcome, ${data.name}`);
      onClose();
    } catch (e) {
      setError('Login failed');
    }
  }

  return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold interface-font">Login</h2>
            <button
                aria-label="Close"
                onClick={onClose}
                className="ml-4 text-gray-500 hover:text-black transition-opacity"
            >
              ✕
            </button>
          </div>

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <input
              placeholder="Email"
              className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <input
              placeholder="Password"
              type="password"
              className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end gap-2 mt-2">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Login
            </button>
          </div>

          <div className="mt-3 text-sm flex justify-between">
            <a href="#" className="text-[var(--brand)] hover:opacity-80">
              Forgot Username/Password
            </a>
            <a href="#" className="text-[var(--brand)] hover:opacity-80">
              Register here
            </a>
          </div>
        </div>
      </div>
  );
}
