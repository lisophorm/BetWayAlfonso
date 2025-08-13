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
    <section className="relative interface-font">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/the-hunch-mobile.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

      <div className="relative container mx-auto px-4 py-16 text-white text-center md:text-left md:py-24">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-2xl">{offer.offerTitle}</h1>
        <p className="mt-3 text-lg md:text-2xl opacity-90 max-w-2xl">{offer.offerSubtitle}</p>

        <button
          className="mt-6 inline-block px-6 py-3 rounded font-semibold"
          style={{ background: 'var(--brand)' }}
        >
          {offer.offerCTA}
        </button>
      </div>
    </section>
  );
}