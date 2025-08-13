import { useEffect, useState } from 'react';

type Content = { nav: string[]; login: string; signup: string; brandColors?: Record<string, string> };

export default function Header({ onLoginClick, onTabChange }: { onLoginClick: () => void; onTabChange?: (tab: string, color: string) => void }) {
  const [content, setContent] = useState<Content>({ nav: [], login: '', signup: '' });
  const [activeTab, setActiveTab] = useState<string>('sports');

  useEffect(() => {
    fetch('/api/content').then((r) => r.json()).then((d) => {
      setContent(d);
      const initial = 'sports';
      const color = d.brandColors?.[initial] || '#00a826';
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
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold text-xl">betway</div>
        <nav className="flex gap-6">
          {content.nav.map((label) => {
            const key = keyify(label);
            const active = activeTab === key;
            return (
              <button
                key={label}
                onClick={() => handleTab(label)}
                className={
                  'capitalize pb-1 border-b-2 transition-colors ' +
                  (active ? 'border-[var(--brand)] text-[var(--brand)]' : 'border-transparent hover:border-white')
                }
              >
                {label}
              </button>
            );
          })}
        </nav>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-white text-black" onClick={onLoginClick}>
            {content.login}
          </button>
          <button className="px-3 py-1 rounded border border-white">{content.signup}</button>
        </div>
      </div>
    </header>
  );
}
