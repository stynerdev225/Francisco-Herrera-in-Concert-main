"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useMusic } from '@/context/MusicContext';
import { useIsMobile } from '@/components/ui/use-mobile';
import LanguageToggle from './LanguageToggle';

export default function MobileNavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { language } = useLanguage();
    const { isPlaying, toggleMusic } = useMusic();
    const isMobile = useIsMobile();
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);
    const [touchFeedback, setTouchFeedback] = useState<string | null>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (menuOpen && !target.closest('#mobile-nav-menu') && !target.closest('#mobile-menu-button')) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [menuOpen]);

    // Enhanced navigation function with touch feedback and navigation protection
    const navigateTo = (path: string, event?: React.MouseEvent) => {
        if (event) event.preventDefault();
        if (isNavigating) return; // Prevent multiple rapid taps

        setIsNavigating(true); // Set navigating flag
        setTouchFeedback(path); // Set visual feedback
        setMenuOpen(false);

        // Add haptic feedback for better mobile experience
        if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }

        // Use Next.js router for navigation
        router.push(path);

        // Reset navigation flag after timeout
        setTimeout(() => {
            setTouchFeedback(null);
            setIsNavigating(false);
        }, 300);
    };

    // Don't render anything on non-mobile devices
    if (!isMobile) {
        return null;
    }

    // Simple translations based on language
    const labels = {
        home: language === 'es' ? 'Inicio' : 'Home',
        music: language === 'es' ? 'Música' : 'Music',
        buyTickets: language === 'es' ? 'Comprar Boletos' : 'Buy Tickets',
        contact: language === 'es' ? 'Contacto' : 'Contact',
        menu: language === 'es' ? 'Menú' : 'Menu',
        close: language === 'es' ? 'Cerrar' : 'Close'
    };

    return (
        <>
            {/* Top navigation bar for mobile - replaces the original navbar */}
            <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-b border-red-500/30 shadow-lg z-50 md:hidden">
                <div className="flex justify-between items-center h-16 px-3">
                    {/* Logo */}
                    <a
                        href="/"
                        className="flex items-center"
                        onClick={(e) => navigateTo("/", e)}
                    >
                        <span className="text-red-500 text-xl font-bold bg-black/40 rounded-full w-8 h-8 flex items-center justify-center mr-2">♫</span>
                        <span className="font-black text-sm">
                            <span className="text-red-500">F.</span>
                            <span className="text-white">HERRERA</span>
                        </span>
                    </a>

                    {/* Right side controls - moved more to the left */}
                    <div className="flex items-center space-x-3 mr-2">
                        <LanguageToggle
                            variant="pill"
                            className="bg-black/30 py-1 px-2 shadow-inner shadow-black/50 border border-red-500/20 text-xs"
                        />

                        {/* Music player button with animated sound waves when playing */}
                        <button
                            onClick={toggleMusic}
                            className={`w-8 h-8 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 shadow-inner shadow-red-900/50 relative ${isPlaying ? 'sound-playing' : ''}`}
                            aria-label={isPlaying ? "Pause music" : "Play music"}
                        >
                            {isPlaying ? (
                                <>
                                    <div className="sound-wave-container absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="sound-bar"></div>
                                        <div className="sound-bar"></div>
                                        <div className="sound-bar"></div>
                                        <div className="sound-bar"></div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                                        <circle cx="12" cy="12" r="3" fill="white" />
                                    </svg>
                                </>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" stroke="none" fill="none" />
                                    <polygon points="9 7 17 12 9 17 9 7" fill="white"></polygon>
                                </svg>
                            )}
                        </button>

                        {/* Menu button moved more to the left */}
                        <button
                            id="mobile-menu-button"
                            className="inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-br from-red-600 to-red-700 text-white relative z-50"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? labels.close : labels.menu}
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                            {menuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6L6 18M6 6l12 12"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile dropdown menu - now positioned on the right side */}
            {menuOpen && (
                <>
                    {/* Dark overlay behind the menu */}
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setMenuOpen(false)}
                    ></div>

                    {/* Right-aligned dropdown menu */}
                    <div
                        id="mobile-nav-menu"
                        className="fixed top-32 right-0 w-56 max-w-[70%] bg-black border-l border-t border-b border-red-500/20 shadow-xl rounded-bl-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out"
                        style={{
                            WebkitBackfaceVisibility: 'hidden',
                            WebkitTransform: 'translateZ(0)',
                            willChange: 'transform'
                        }}
                    >
                        <div className="py-3 px-2">
                            <a
                                href="/"
                                className={`block px-3 py-2.5 rounded-lg text-white text-sm font-medium hover:bg-red-600/20 ${touchFeedback === '/' ? 'bg-red-600/10' : ''}`}
                                onClick={(e) => navigateTo("/", e)}
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                {labels.home}
                            </a>
                            <a
                                href="/sections/music"
                                className={`block px-3 py-2.5 rounded-lg text-white text-sm font-medium hover:bg-red-600/20 mt-1 ${touchFeedback === '/sections/music' ? 'bg-red-600/10' : ''}`}
                                onClick={(e) => navigateTo("/sections/music", e)}
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                {labels.music}
                            </a>

                            <a
                                href="/tickets"
                                className={`block px-3 py-2.5 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-red-600 to-red-500 mt-1 ${touchFeedback === '/tickets' ? 'bg-red-600/10' : ''}`}
                                onClick={(e) => navigateTo("/tickets", e)}
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                {labels.buyTickets}
                            </a>

                            <a
                                href="/contact"
                                className={`block px-3 py-2.5 rounded-lg text-white text-sm font-medium hover:bg-red-600/20 mt-1 ${touchFeedback === '/contact' ? 'bg-red-600/10' : ''}`}
                                onClick={(e) => navigateTo("/contact", e)}
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                {labels.contact}
                            </a>
                        </div>
                    </div>
                </>
            )}

            {/* Add CSS for touch feedback */}
            <style jsx global>{`
                @media (max-width: 767px) {
                    /* Only add a tiny bit of padding to avoid layout issues */
                    body {
                        padding-top: 12px;
                    }
                }
                
                /* Prevent double-tap zooming on navigation items */
                a, button {
                    touch-action: manipulation;
                }
            `}</style>
        </>
    );
}