/* /components/Header.tsx */
import { useEffect, useState } from 'react';
import {Content} from "../content/types/type.content";

type HeaderProps = {
  onLoginClick: () => void;
  onTabChange?: (tab: string, color: string) => void;
};

export default function Header({ onLoginClick, onTabChange }: HeaderProps) {
  const [content, setContent] = useState<Content>({
    nav: [],
    login: '',
    signup: '',
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
    return label
        .toLowerCase()
        .replace(/\s*&\s*/g, 'and')
        .replace(/\s+/g, '');
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
        <div className="container mx-auto px-4 py-3 header-shell">
          {/* Brand row */}
          <div className="header-brand-row">
            <div className="font-bold text-xl">betway</div>
          </div>

          {/* Nav row (text buttons only) */}
          <nav className="header-nav-row">
            {content.nav.map((label) => {
              const key = keyify(label);
              const active = activeTab === key;
              return (
                  <button
                      key={label}
                      onClick={() => handleTab(label)}
                      className={
                          'capitalize pb-1 border-b-2 transition-colors ' +
                          (active
                              ? 'border-[var(--brand)] text-[var(--brand)]'
                              : 'border-transparent hover:border-white')
                      }
                  >
                    {label}
                  </button>
              );
            })}
          </nav>

          {/* Auth row */}
          <div className="header-auth-row">
            <button className="btn btn-primary" onClick={onLoginClick}>
              {content.login || 'Login'}
            </button>
            <button className="btn btn-secondary">
              {content.signup || 'Sign up'}
            </button>
          </div>
        </div>
      </header>
  );
}
