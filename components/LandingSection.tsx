import { useEffect, useState } from 'react';
import {OfferContent} from "../content/types/type.OfferContent";
import CTAcontainer from "./CTAcontainer";


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
        style={{ backgroundImage: "url('/images/the-hunch-regenerated.png')" }}
      />
      <CTAcontainer offer={offer} />
    </section>
  );
}