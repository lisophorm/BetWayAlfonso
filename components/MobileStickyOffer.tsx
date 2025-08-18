'use client';

import Link from 'next/link';
import FireworksCanvas from "@/components/FireworksCanvas";
import {Content} from "../content/types/type.content";

export default function MobileStickyOffer({content}: { content: Content | null }) {

    if (!content) return null;

    return (
        <div
            className="
        md:hidden
        fixed bottom-0 inset-x-0 z-40
        bg-black/80 text-white
        px-5 py-5  /* (4) slightly more padding */
        backdrop-blur-sm
      "
            role="region"
            aria-label="Mobile sticky offer"
        >
            <FireworksCanvas active={true}/>
            <div className="max-w-screen-sm mx-auto text-center">
                {/* (1) Two rows: offerSubtitle then offerTitle */}
                {content.offerSubtitle && (
                    <div className="text-sm tracking-wide font-bold uppercase">
                        {content.offerSubtitle}
                    </div>
                )}
                {content.offerTitle && (
                    <div className="mt-2 text-2xl font-extrabold leading-snug">
                        {content.offerTitle}
                    </div>
                )}

                {/* (2) Button 70% width; (3) centered */}
                <Link href="/register" className="inline-block mt-4 w-full">
                    <button
                        className="btn btn-primary block mx-auto w-[70%] button-jittery"
                        style={{background: 'var(--brand)'}}
                    >
                        {content.offerCTA || 'Join Now'}
                    </button>
                </Link>
            </div>
        </div>
    );
}
