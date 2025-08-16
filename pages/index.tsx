import {useState} from 'react';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import Hero from '../components/Hero';

export default function Home() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            <Header onLoginClick={() => setShowLogin(true)} onTabChange={() => {
            }}/>
            <main className="relative grow flex items-center isolation-auto">
                {/* Background layer (behind everything, not clickable) */}
                <div
                    aria-hidden="true"
                    className="
      absolute inset-0 -z-10 pointer-events-none select-none
      bg-[url('/images/hunch-mobile.png')] md:bg-[url('/images/hunch-desktop.png')]
      bg-top md:bg-center bg-cover
    "
                />
                <Hero/>
            </main>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)}/>}
        </div>
    );
}
