'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {Content} from "../content/types/type.content";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {fetchContent, selectContent} from "../store/slices/contentSlice";
import Link from 'next/link';


type HeaderProps = { onLoginClick: () => void; onTabChange?: (tab: string, color: string) => void };

export default function Header({onLoginClick, onTabChange}: HeaderProps) {
    const dispatch = useAppDispatch();
    const content = useAppSelector(selectContent);
    const [activeTab, setActiveTab] = useState('sports');

    useEffect(() => {
        dispatch(fetchContent());
    }, [dispatch]);

    function keyify(label: string) {
        return label.toLowerCase().replace(/\s*&\s*/g, 'and').replace(/\s+/g, '');
    }

    function handleTab(label: string) {
        const key = keyify(label);
        setActiveTab(key);
        const color = content?.brandColors?.[key] || '#00a826';
        document.documentElement.style.setProperty('--brand', color);
        onTabChange?.(key, color);
    }

    return (
        <header className="bg-black text-white interface-font">
            <div
                className="container mx-auto px-4 py-3 grid grid-cols-2 items-center gap-y-2 md:grid-cols-[auto_1fr_auto]">
                <div className="col-start-1 row-start-1">
                    <Image
                        src="/images/betway-logo.svg"
                        alt="Betway"
                        width={112}
                        height={28}
                        priority
                        className="invert"
                    />
                </div>
                <div className="col-start-2 row-start-1 justify-self-end flex header-auth relative z-10">
                    <button className="btn btn-primary" onClick={onLoginClick}>
                        {content?.login || 'Login'}
                    </button>
                    <Link href="/register">
                        <button className="btn btn-secondary">{content?.signup || 'Sign Up'}</button>
                    </Link>
                </div>
                <nav
                    className="col-span-2 row-start-2 md:col-start-2 md:row-start-1 overflow-x-auto no-scrollbar relative z-0">
                    <div className="flex gap-4 md:justify-center">
                        {content?.nav?.map((label) => {
                            const key = keyify(label);
                            const active = activeTab === key;
                            return (
                                <button
                                    key={label}
                                    onClick={() => handleTab(label)}
                                    className={
                                        'nav-button capitalize pb-1 border-b-2 transition-colors ' +
                                        (active
                                            ? 'border-[var(--brand)] text-[var(--brand)]'
                                            : 'border-transparent hover:border-white')
                                    }
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </header>
    );
}
