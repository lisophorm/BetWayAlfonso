import { useEffect, useState } from 'react';

type Content = {
  nav: string[];
  login: string;
  signup: string;
};

export default function Header({ onLoginClick }: { onLoginClick: () => void }) {
  const [content, setContent] = useState<Content>({ nav: [], login: '', signup: '' });

  useEffect(() => {
    fetch('/api/content').then(res => res.json()).then(data => setContent(data));
  }, []);

  return (
      <header className="bg-black text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-bold">betway</div>
          <nav className="flex gap-4">
          {content.nav.map((item) => (
            <a key={item} href="#">{item}</a>
          ))}
          </nav>
            <div className="flex gap-2 font-bold">
                <button className="px-3 py-1 rounded bg-white text-black" onClick={onLoginClick}>
                    {content.login}
                </button>
                <button className="px-3 py-1 rounded border border-white">{content.signup}</button>
            </div>
        </div>
      </header>
  );
}
