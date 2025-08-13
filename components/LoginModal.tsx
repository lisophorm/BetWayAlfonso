import { useState } from 'react';

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!email || !password) return setError('Both fields are required');
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) return setError('Invalid email');
    if (password.length < 8) return setError('Password must be at least 8 characters');

    const res = await fetch('/api/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      console.log(`Welcome, ${data.name}`);
      onClose();
    } else {
      setError('Login failed');
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', minWidth: '300px' }}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
}
