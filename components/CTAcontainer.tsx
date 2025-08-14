import {OfferContent} from "../content/types/type.OfferContent";


export default function CTAcontainer({offer}: { offer: OfferContent }) {
    return (
        <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"/>

            <div className="relative container mx-auto px-4 py-16 text-white text-center md:text-left md:py-24">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-2xl">{offer.offerTitle}</h1>
                <p className="mt-3 text-lg md:text-2xl opacity-90 max-w-2xl">{offer.offerSubtitle}</p>

                <button
                    className="mt-6 inline-block px-6 py-3 rounded font-semibold"
                    style={{background: 'var(--brand)'}}
                >
                    {offer.offerCTA}
                </button>
            </div>
        </>
    );
}