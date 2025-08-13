import { useState } from 'react';
import FooterCTA from '../components/FooterCTA';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import LandingSection from '../components/LandingSection';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <Header onLoginClick={() => setShowLogin(true)} onTabChange={() => {}} />
      <LandingSection />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
          <FooterCTA />
    </div>
  );
}