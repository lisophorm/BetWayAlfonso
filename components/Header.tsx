'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Content } from '../content/types/type.content';

type HeaderProps = {
  onLoginClick: () => void;
  onTabChange?: (tab: string, color: string) => void;
};

export default function Header({ onLoginClick, onTabChange }: HeaderProps) {
  const [content, setContent] = useState<Content>({
    nav: [],
    login: 'Login',
    signup: 'Sign up',
    offerTitle: '',
    offerSubtitle: '',
    offerCTA: '',
    brandColors: {},
  });
  const [activeTab, setActiveTab] = useState<string>('sports');

  useEffect(() => {
    fetch('/api/content')
        .then((r) => r.json())
        .then((d: Content) => {
          setContent(d);
          const init = 'sports';
          const color = d.brandColors?.[init] || '#00a826';
          document.documentElement.style.setProperty('--brand', color);
        });
  }, []);

  const keyify = (label: string) =>
      label.toLowerCase().replace(/\s*&\s*/g, 'and').replace(/\s+/g, '');

  function handleTab(label: string) {
    const key = keyify(label);
    setActiveTab(key);
    const color = content.brandColors?.[key] || '#00a826';
    document.documentElement.style.setProperty('--brand', color);
    onTabChange?.(key, color);
  }

  return (
      <header className="bg-black text-white interface-font">
        {/* Mobile: 2-col grid  -> logo | auth  + nav below (spans 2)
          md+:    3-col grid -> Brand | Nav (center) | Auth (right) */}
        <div className="container mx-auto px-4 py-3 grid grid-cols-2 items-center gap-y-2 md:grid-cols-[auto_1fr_auto]">
          {/* Brand */}
          <div className="col-start-1 row-start-1">
            <Image
                src="/images/betway-logo.svg"
                alt="Betway"
                width={112}   // looks better on desktop; Tailwind will size container
                height={28}
                priority
                className="invert"
            />
          </div>

          {/* Auth */}
          <div className="col-start-2 row-start-1 justify-self-end flex header-auth relative z-10">
            <button className="btn btn-primary" onClick={onLoginClick}>{content.login}</button>
            <button className="btn btn-secondary">{content.signup}</button>
          </div>

          {/* Nav */}
          <nav className="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1 overflow-x-auto no-scrollbar relative z-0">
            <div className="flex gap-4 md:justify-center">
            {content.nav.map((label) => {
                const key = keyify(label);
                const active = activeTab === key;
                return (
                    <button
                        key={label}
                        onClick={() => handleTab(label)}
                        className={
                            'nav-button capitalize pb-1 border-b-2 transition-colors ' +
                            (active
                                ? 'border-[var(--brand)] text-[var(--brand)]'
                                : 'border-transparent hover:border-white')
                        }
                    >
                      {label}
                    </button>
                );
              })}
            </div>
          </nav>
        </div>
      </header>
  );
}
