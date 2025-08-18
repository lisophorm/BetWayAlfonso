'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {fetchContent, selectContent} from '@/store/slices/contentSlice';
import Link from "next/link";
import {keyify} from "../lib/utils";

type HeaderProps = {
    onLoginClick: () => void;
    onTabChange?: (tab: string, brand: string) => void;
};

export default function Header({onLoginClick, onTabChange}: HeaderProps) {
    const dispatch = useAppDispatch();
    const content = useAppSelector(selectContent);
    const [activeKey, setActiveKey] = useState('sports');

    useEffect(() => {
        dispatch(fetchContent());
    }, [dispatch]);

    const handleTab = (label: string) => {
        const key = keyify(label);
        setActiveKey(key);
        const color = content?.brandColors?.[key] || '#00a826';
        document.documentElement.style.setProperty('--brand', color);
        onTabChange?.(key, color);
    };

    return (
        <header className="text-white interface-font">
            {/* Row 1 — black bar: brand + auth */}
            <div className="bg-black">
                <div className="mx-auto px-4 py-3 flex items-center justify-between">
                    {/* brand */}
                    <div className="flex-shrink-0">
                        <Image
                            src="/images/betway-logo.svg"
                            alt="Betway"
                            width={112}
                            height={28}
                            priority
                            className="invert"
                        />
                    </div>

                    {/* auth */}
                    <div className="flex items-center header-auth">
                        <button className="btn btn-primary" onClick={onLoginClick}>
                            {content?.login ?? 'Login'}
                        </button>
                        <Link href="/register">
                            <button className="btn btn-secondary ml-2">
                                {content?.signup ?? 'Sign up'}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Row 2 — grey nav bar */}
            <nav className="nav-grey">
                <div className="mx-auto overflow-x-auto no-scrollbar">
                    <div className="flex h-[36px] md:h-[40px] items-stretch gap-2 md:justify-start">
                        {(content?.nav ?? ['sports', 'live & real', 'casino', 'esports', 'vegas']).map((label) => {
                            const key = keyify(label);
                            const active = key === activeKey;
                            return (
                                <button
                                    key={label}
                                    onClick={() => handleTab(label)}
                                    className={
                                        'nav-item ' +
                                        (active ? 'nav-item--active' : 'nav-item--inactive')
                                    }
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </header>

    );
}
