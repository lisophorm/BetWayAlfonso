'use client';

import {useEffect, useState} from 'react';
import type {Content} from '../content/types/type.content';
import Link from "next/link";
import FireworksCanvas from "@/components/FireworksCanvas";
import MobileStickyOffer from "@/components/MobileStickyOffer";

export default function Hero() {
    // Only needed for the mobile sticky CTA
    const [content, setContent] = useState<Pick<
        Content,
        'offerTitle' | 'offerSubtitle' | 'offerCTA'
    > | null>(null);

    useEffect(() => {
        fetch('/api/content')
            .then((r) => r.json())
            .then((d) =>
                setContent({
                    offerTitle: d.offerTitle,
                    offerSubtitle: d.offerSubtitle,
                    offerCTA: d.offerCTA,
                })
            );
    }, []);

    return (
        <section className="relative z-10 w-full pointer-events-auto" aria-label="Hero">
            {content && (
                <div className="md:grid grid-cols-6 hidden mx-auto px-24 py-16 text-left md:py-24">
                    <div
                        className="col-start-1 col-end-6 md:col-end-4">
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-2xl">                            {content.offerTitle}
                        </h1>
                        <p className="mt-3 text-lg md:text-2xl opacity-90 max-w-2xl">{content.offerSubtitle}</p>
                        <Link href="/register">
                            <button
                                className="button-jittery mt-6 inline-block px-6 py-3 rounded font-semibold"
                                style={{background: 'var(--brand)'}}
                            >
                                {content.offerCTA}
                            </button>
                        </Link>
                    </div>
                </div>
            )}
            {/* Mobile: sticky CTA at the bottom (unchanged) */}
            <MobileStickyOffer content={content}/>

        </section>
    );
}
