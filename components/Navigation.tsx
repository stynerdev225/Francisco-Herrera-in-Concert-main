"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useMusic } from '@/context/MusicContext';
import LanguageToggle from './LanguageToggle';

// Navigation items with translations
const navItems = [
    { key: "home", href: "/", translationKey: "nav.home" },
    { key: "music", href: "/sections/music", translationKey: "nav.music" },
    { key: "contact", href: "/contact", translationKey: "nav.contact" },
];

// Add translations to use in this component
const navTranslations = {
    "nav.home": {
        en: "Home",
        es: "Inicio",
    },
    "nav.about": {
        en: "About",
        es: "Sobre",
    },
    "nav.music": {
        en: "Music",
        es: "Música",
    },
    "nav.events": {
        en: "Events",
        es: "Eventos",
    },
    "nav.contact": {
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

    // Use shared music context instead of local state
    const { isPlaying, toggleMusic, currentSong } = useMusic();

    // Get song title from the filename
    const getSongTitle = (songPath: string) => {
        if (!songPath) return 'Music';

        if (songPath.includes('nuevo-sol-snippet1')) {
            return 'Nuevo Sol (Part 1)';
        } else if (songPath.includes('nuevo-sol-snippet2')) {
            return 'Nuevo Sol (Part 2)';
        } else if (songPath.includes('saber-migra-snippet1')) {
            return 'Saber Migra (Part 1)';
        } else if (songPath.includes('saber-migra-snippet2')) {
            return 'Saber Migra (Part 2)';
        }

        return 'Music';
    };

    // Song title to display
    const songTitle = getSongTitle(currentSong);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-black text-white sticky top-0 z-50 w-full shadow-xl border-b border-red-500/30">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                <div className="flex items-center justify-between h-20 sm:h-28 py-3 sm:py-6">
                    {/* Logo and site title with 3D effect */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center space-x-3 sm:space-x-4 group">
                            <span className="text-red-500 text-2xl sm:text-3xl font-bold bg-black/40 rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-red-500/20 border border-red-500/30 relative before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-red-400 before:to-red-600 before:opacity-30 before:blur-sm">
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
                            {/* Mobile only mini title */}
                            <div className="flex md:hidden flex-col">
                                <span className="font-black text-lg leading-none">
                                    <span className="text-red-500">F.</span>
                                    <span className="text-white">HERRERA</span>
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop navigation with 3D tabs */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={`px-6 py-3.5 rounded-xl text-base font-bold uppercase tracking-wide transition-all duration-300 transform hover:-translate-y-1 ${pathname === item.href
                                        ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_5px_0_rgb(127,29,29)] hover:shadow-[0_3px_0_rgb(127,29,29)] active:shadow-none active:translate-y-1"
                                        : "text-gray-200 hover:bg-white/5 hover:text-white shadow-[0_3px_0_rgba(255,255,255,0.1)] hover:shadow-[0_5px_0_rgba(255,255,255,0.05)]"
                                        }`}
                                >
                                    <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{t(item.translationKey)}</span>
                                </Link>
                            ))}
                            <div className="ml-4">
                                <LanguageToggle
                                    variant="pill"
                                    className="py-3 px-6 font-bold shadow-[0_4px_0_rgba(239,68,68,0.3)] hover:-translate-y-1 hover:shadow-[0_6px_0_rgba(239,68,68,0.2)] transition-all transform text-base"
                                />
                            </div>

                            {/* Music player button - explicitly updated to match BackgroundMusic exactly */}
                            <button
                                onClick={toggleMusic}
                                className="w-10 h-10 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 transition-colors overflow-hidden relative ml-3 group"
                                aria-label={isPlaying ? `Pause ${songTitle}` : `Play ${songTitle}`}
                                title={isPlaying ? `Pause ${songTitle}` : `Play ${songTitle}`}
                            >
                                {isPlaying && (
                                    <div className="absolute -top-10 right-0 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        {songTitle}
                                    </div>
                                )}
                                {isPlaying ? (
                                    <div className="flex justify-center items-center w-full">
                                        {/* Audio wave animation when playing */}
                                        <div className="flex items-end h-5 space-x-0.5">
                                            <div className="w-1 bg-white sound-wave-1 rounded-full"></div>
                                            <div className="w-1 bg-white sound-wave-2 rounded-full"></div>
                                            <div className="w-1 bg-white sound-wave-3 rounded-full"></div>
                                            <div className="w-1 bg-white sound-wave-4 rounded-full"></div>
                                            <div className="w-1 bg-white sound-wave-5 rounded-full"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button with 3D effect and language toggle */}
                    <div className="md:hidden flex items-center">
                        <div className="flex items-center gap-3">
                            <LanguageToggle
                                variant="pill"
                                className="bg-black/30 py-1.5 px-3 shadow-inner shadow-black/50 border border-red-500/20 text-sm"
                            />

                            {/* Mobile music player button - updated to match BackgroundMusic exactly */}
                            <button
                                onClick={toggleMusic}
                                className="w-10 h-10 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 transition-colors overflow-hidden relative group"
                                aria-label={isPlaying ? `Pause ${songTitle}` : `Play ${songTitle}`}
                                title={isPlaying ? `Pause ${songTitle}` : `Play ${songTitle}`}
                            >
                                {isPlaying && (
                                    <div className="absolute -top-10 right-0 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        {songTitle}
                                    </div>
                                )}
                                {isPlaying ? (
                                    <div className="flex justify-center items-center w-full">
                                        {/* Audio wave animation when playing */}
                                        <div className="flex items-end h-5 space-x-0.5">
                                            <div className="w-1 bg-white sound-wave-1 rounded-full"></div>
                                            <div className="w-1 bg-white sound-wave-2 rounded-full"></div>
                                            <div className="w-1 bg-white sound-wave-3 rounded-full"></div>
                                            <div className="w-1 bg-white sound-wave-4 rounded-full"></div>
                                            <div className="w-1 bg-white sound-wave-5 rounded-full"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                )}
                            </button>

                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white shadow-[0_3px_0_rgb(127,29,29)] hover:shadow-[0_2px_0_rgb(127,29,29)] active:shadow-none active:translate-y-1 transform transition-all"
                                aria-expanded={menuOpen}
                                aria-label={t("nav.toggleMenu")}
                            >
                                <svg
                                    className={`${menuOpen ? "hidden" : "block"} h-6 w-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                                <svg
                                    className={`${menuOpen ? "block" : "hidden"} h-6 w-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu with 3D effect - Compact floating design */}
            <div
                className={`${menuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-[-20px] opacity-0 pointer-events-none"} md:hidden fixed right-4 top-[80px] z-50 w-[200px] transition-all duration-300 ease-in-out shadow-xl rounded-xl overflow-hidden`}
            >
                <div className="bg-black border border-red-500/20 rounded-xl">
                    <div className="px-2 py-3 space-y-1.5">
                        {navItems.map((item) => (
                            <a
                                key={item.key}
                                href={item.href}
                                className={`block px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transform hover:-translate-y-0.5 transition-all ${pathname === item.href
                                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_3px_0_rgb(127,29,29)] hover:shadow-[0_2px_0_rgb(127,29,29)] active:shadow-none active:translate-y-0.5"
                                    : "text-gray-200 hover:bg-white/5 hover:text-white"
                                    }`}
                                onClick={() => {
                                    // Simply close the menu, the native <a> tag will handle navigation
                                    setMenuOpen(false);
                                    console.log(`Native navigation to: ${item.href}`);
                                }}
                                // Improve touch behavior
                                style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                            >
                                <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] block py-1">{t(item.translationKey)}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Optional dropdown arrow for visual effect */}
                <div className="absolute top-[-8px] right-5 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black"></div>
            </div>

            {/* Backdrop for mobile menu */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}
        </nav>
    );
}
