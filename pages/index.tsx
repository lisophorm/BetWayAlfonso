import { useState } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import LandingSection from '../components/LandingSection';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <Header onLoginClick={() => setShowLogin(true)} />
      <LandingSection />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}