/* /pages/index.tsx (only the relevant part) */
import { useState } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import LandingSection from '../components/LandingSection';
import CTAcontainer from '../components/CTAcontainer';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
      <div className="min-h-screen flex flex-col">
        <Header onLoginClick={() => setShowLogin(true)} onTabChange={() => {}} />
        <main className="flex-1">
          <LandingSection />
        </main>
        <CTAcontainer />
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      </div>
  );
}
