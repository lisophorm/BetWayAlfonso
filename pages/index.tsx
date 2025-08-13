import { useState } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import LandingSection from '../components/LandingSection';
import FooterCTA from '../components/FooterCTA';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
  <div className="min-h-screen flex flex-col">
    <Header onLoginClick={() => setShowLogin(true)} />
    <main className="flex-1">
      <LandingSection />
    </main>
    <FooterCTA />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
  </div>
);

}