import { useEffect, useState } from 'react';

type OfferContent = {
  offerTitle: string;
  offerSubtitle: string;
  offerCTA: string;
};

export default function LandingSection() {
  const [offer, setOffer] = useState<OfferContent | null>(null);

  useEffect(() => {
    fetch('/api/content').then(res => res.json()).then(data => {
      setOffer({
        offerTitle: data.offerTitle,
        offerSubtitle: data.offerSubtitle,
        offerCTA: data.offerCTA
      });
    });
  }, []);

  if (!offer) return null;

  return (
    <section style={{ padding: '3rem 1rem', background: '#111', color: '#fff', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{offer.offerTitle}</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>{offer.offerSubtitle}</p>
        <button style={{ padding: '0.75rem 1.5rem', background: '#00a826', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '1rem', cursor: 'pointer' }}>
          {offer.offerCTA}
        </button>
      </div>
    </section>
  );
}