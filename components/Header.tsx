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

  function keyify(label: string) {
    return label.toLowerCase().replace(/\s*&\s*/g, 'and').replace(/\s+/g, '');
  }

  function handleTab(label: string) {
    const key = keyify(label);
    setActiveTab(key);
    const color = content.brandColors?.[key] || '#00a826';
    document.documentElement.style.setProperty('--brand', color);
    onTabChange?.(key, color);
  }

  return (
      <header className="bg-black text-white interface-font">
        {/* Mobile: grid (2 cols) — logo left, auth right; Nav below spanning 2 cols
          md+   : grid (3 cols) — Brand | Nav | Auth */}
        <div className="container mx-auto px-4 py-3 grid grid-cols-2 items-center gap-y-2 md:grid-cols-3">
          {/* Brand */}
          <div className="col-start-1 row-start-1 w-auto">
            <Image
                src="/images/betway-logo.svg"
                alt="Betway"
                width={88}
                height={24}
                priority
                className="invert"
            />
          </div>

          {/* Auth (same row as brand on mobile, right-aligned; right column on md+) */}
          <div className="col-start-2 row-start-1 justify-self-end flex header-auth">
            <button className="btn btn-primary" onClick={onLoginClick}>
              {content.login || 'Login'}
            </button>
            <button className="btn btn-secondary">
              {content.signup || 'Sign up'}
            </button>
          </div>

          {/* Nav (row 2 on mobile, center column on md+) */}
          <nav className="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1 overflow-x-auto no-scrollbar">
            <div className="flex gap-4">
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
