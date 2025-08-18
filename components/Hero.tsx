'use client';

import {useEffect} from 'react';
import Link from "next/link";
import MobileStickyOffer from "@/components/MobileStickyOffer";
import {fetchContent, selectContent} from '@/store/slices/contentSlice';
import {useAppDispatch, useAppSelector} from "@/store/hooks";


export default function Hero() {
    const dispatch = useAppDispatch();

    const content = useAppSelector(selectContent);
    useEffect(() => {
        dispatch(fetchContent());
    }, [dispatch]);

    return (
        <section className="relative z-10 w-full pointer-events-auto" aria-label="Hero">
            {content && (
                <div className="hidden md:grid grid-cols-6 mx-auto px-24 py-16 text-left md:py-24">
                    <div
                        className="col-start-1 col-end-4 xl:col-start-2 xl:col-end-6">
                        <p className="mt-3 text-lg md:text-2xl opacity-90 max-w-2xl uppercase">{content.offerSubtitle}</p>
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">                            {content.offerTitle}
                        </h1>
                    </div>
                    <div className="col-start-1 col-end-3 xl:col-start-2 xl:col-end-3">
                        <Link href="/register">
                            <button
                                className="button-jittery mt-6 w-full px-6 py-3 rounded font-semibold text-white"
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
