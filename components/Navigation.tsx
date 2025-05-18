"use client";

import React, { useState, useEffect, useRef, use } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useMusic } from '@/context/MusicContext';
import LanguageToggle from './LanguageToggle';

// Navigation items with translations
const navItems = [
    { key: "home", href: "/", translationKey: "home" },
    // Buy tickets item is now handled separately with special styling
    { key: "music", href: "/sections/music", translationKey: "music" },
];

const navTranslations = {
    "home": {
        en: "Home",
        es: "Inicio",
    },
    "about": {
        en: "About",
        es: "Sobre",
    },
    "music": {
        en: "Music",
        es: "Música",
    },
    "events": {
        en: "Events",
        es: "Eventos",
    },
    "buy tickets": {
        en: "Buy Tickets",
        es: "Comprar Boletos",
    },
    "contact": {
        en: "Contact",
        es: "Contacto",
    },
    "nav.toggleMenu": {
        en: "Toggle Menu",
        es: "Alternar Menú",
    },
    "nav.concert": {
        en: "Francisco Herrera in Concert",
        es: "Francisco Herrera en Concierto",
    },
};

export default function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { t, language } = useLanguage();
    const pathname = usePathname();
    const router = useRouter();
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const hasInitialized = useRef(false);

    const { isPlaying, toggleMusic, currentSong, initializeAudio, songTitle } = useMusic();

    useEffect(() => {
        // Initialize audio only once when component mounts
        if (!hasInitialized.current) {
            initializeAudio();
            hasInitialized.current = true;
        }
    }, [initializeAudio]);

    // Enhanced toggle menu with debounce protection to prevent double-tap issues
    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);

        // Add haptic feedback for better mobile experience
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        console.log("Menu toggled, new state:", !menuOpen);
    };

    // Add event listener to close menu when clicking outside with improved touch detection
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target as Node) &&
                menuOpen) {
                setMenuOpen(false);
            }
        };

        // Use both touch and mouse events for better cross-device compatibility
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside, { passive: true });
        document.addEventListener('touchend', handleClickOutside, { passive: true });

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('touchend', handleClickOutside);
        };
    }, [menuOpen]);

    const handleTabClick = () => {
        // Close menu when any link is clicked
        setMenuOpen(false);

        // Add haptic feedback for better mobile experience
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    const handleLogoClick = () => {
        setMenuOpen(false);

        // Add haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    return (
        <nav className="bg-black text-white sticky top-0 z-50 w-full shadow-xl border-b border-red-500/30 hidden md:block">
            {/* Main navbar will now be hidden on mobile (md:block) */}
            <div className="max-w-7xl mx-auto px-2 sm:px-8 lg:px-10">
                <div className="flex items-center justify-between h-20 sm:h-28 py-2 sm:py-6">
                    {/* Logo section - made smaller on mobile */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 sm:space-x-4 group cursor-pointer"
                            onClick={handleLogoClick}
                        >
                            <span className="text-red-500 text-xl sm:text-3xl font-bold bg-black/40 rounded-full w-8 h-8 sm:w-14 sm:h-14 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-red-500/20 border border-red-500/30 relative before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-red-400 before:to-red-600 before:opacity-30 before:blur-sm">
                                <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">♫</span>
                            </span>
                            <div className="hidden md:flex flex-col items-start">
                                <span className="font-black text-3xl leading-none tracking-tighter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                    <span className="text-red-500 mr-1 relative">
                                        F.<span className="absolute -inset-1 bg-red-500 blur-sm opacity-30 -z-10"></span>
                                    </span>
                                    <span className="text-white relative inline-block transform hover:translate-y-[1px] transition-transform">
                                        HERRERA
                                        <span className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 -z-10 rounded"></span>
                                    </span>
                                </span>
                                <span className="text-sm text-white/70 uppercase tracking-widest font-medium mt-1.5 drop-shadow-sm">
                                    {t("nav.concert")}
                                </span>
                            </div>
                            <div className="flex md:hidden flex-col">
                                <span className="font-black text-sm sm:text-lg leading-none">
                                    <span className="text-red-500">F.</span>
                                    <span className="text-white">HERRERA</span>
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop navigation - keep unchanged */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    onClick={handleTabClick}
                                    className={`px-6 py-3.5 rounded-xl text-base font-bold uppercase tracking-wide transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${(pathname === item.href)
                                        ? "text-white shadow-[0_7px_0_rgba(239,68,68,0.8),0_4px_12px_rgba(239,68,68,0.5)] hover:shadow-[0_9px_0_rgba(239,68,68,0.7),0_6px_15px_rgba(239,68,68,0.5)] active:shadow-[0_2px_0_rgba(239,68,68,0.6)] active:translate-y-1"
                                        : "text-gray-200 hover:bg-white/5 hover:text-white shadow-[0_6px_0_rgba(239,68,68,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_0_rgba(239,68,68,0.2),0_6px_10px_rgba(0,0,0,0.25)] active:shadow-[0_2px_0_rgba(239,68,68,0.3)] active:translate-y-1"
                                        }`}
                                >
                                    <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] relative z-10">{t(item.translationKey)}</span>
                                </Link>
                            ))}
                            <Link
                                key="buy tickets"
                                href="/tickets"
                                onClick={handleTabClick}
                                className="nav-tickets-button px-6 py-3.5 rounded-xl text-base font-bold uppercase tracking-wide transition-all duration-300 bg-gradient-to-r from-red-500 to-red-600 text-white cursor-pointer transform hover:scale-105 hover:-translate-y-1 shadow-[0_7px_0_rgb(153,27,27),0_5px_10px_rgba(0,0,0,0.4)] hover:shadow-[0_5px_0_rgb(153,27,27),0_3px_8px_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-1"
                                style={{
                                    touchAction: 'manipulation',
                                    WebkitTapHighlightColor: 'transparent',
                                    whiteSpace: 'nowrap',
                                    minWidth: language === 'es' ? '210px' : '160px'
                                }}
                            >
                                <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] relative z-10">{t("buy tickets")}</span>
                            </Link>
                            <Link
                                key="contact"
                                href="/contact"
                                onClick={handleTabClick}
                                className={`px-6 py-3.5 rounded-xl text-base font-bold uppercase tracking-wide transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${(pathname === "/contact")
                                    ? "text-white shadow-[0_7px_0_rgba(239,68,68,0.8),0_4px_12px_rgba(239,68,68,0.5)] hover:shadow-[0_9px_0_rgba(239,68,68,0.7),0_6px_15px_rgba(239,68,68,0.5)] active:shadow-[0_2px_0_rgba(239,68,68,0.6)] active:translate-y-1"
                                    : "text-gray-200 hover:bg-white/5 hover:text-white shadow-[0_6px_0_rgba(239,68,68,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_0_rgba(239,68,68,0.2),0_6px_10px_rgba(0,0,0,0.25)] active:shadow-[0_2px_0_rgba(239,68,68,0.3)] active:translate-y-1"
                                    }`}
                            >
                                <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] relative z-10">{t("contact")}</span>
                            </Link>
                            <div className="ml-4">
                                <LanguageToggle
                                    variant="pill"
                                    className="py-3 px-6 font-bold shadow-[0_6px_0_rgba(239,68,68,0.3),0_4px_8px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_0_rgba(239,68,68,0.2),0_6px_10px_rgba(0,0,0,0.25)] active:shadow-[0_2px_0_rgba(239,68,68,0.3)] active:translate-y-1 transition-all transform text-base"
                                />
                            </div>

                            <button
                                onClick={toggleMusic}
                                className="w-10 h-10 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 transition-colors overflow-hidden relative group"
                                aria-label={isPlaying ? `Pause ${songTitle}` : `Play ${songTitle}`}
                                title={isPlaying ? `Pause ${songTitle}` : `Play ${songTitle}`}
                                style={{ touchAction: 'manipulation' }}
                            >
                                {isPlaying && (
                                    <div className="absolute -top-10 right-0 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        {songTitle}
                                    </div>
                                )}
                                {isPlaying ? (
                                    <div className="flex justify-center items-center w-full">
                                        <div className="flex items-end h-5 space-x-0.5">
                                            <div className="w-1 bg-white h-2 sound-wave-1 rounded-full animate-sound-wave"></div>
                                            <div className="w-1 bg-white h-4 sound-wave-2 rounded-full animate-sound-wave animation-delay-100"></div>
                                            <div className="w-1 bg-white h-3 sound-wave-3 rounded-full animate-sound-wave animation-delay-200"></div>
                                            <div className="w-1 bg-white h-5 sound-wave-4 rounded-full animate-sound-wave animation-delay-300"></div>
                                            <div className="w-1 bg-white h-2 sound-wave-5 rounded-full animate-sound-wave animation-delay-400"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
