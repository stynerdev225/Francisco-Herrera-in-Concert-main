"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationProgress() {
    const [progress, setProgress] = useState<number>(0);
    const [isNavigating, setIsNavigating] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        // Check if this is a problem page
        const isProblemPage = pathname.includes('/sections/music') || pathname.includes('/tickets');

        // Reset progress and make visible when pathname changes
        setProgress(0);
        setVisible(true);
        setIsNavigating(true);

        // Special handling for problem pages
        if (isProblemPage) {
            // IMMEDIATE SCROLL TO TOP for problem pages
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0; // For Safari

            // Additional scrolls with timeouts
            for (let i = 1; i <= 5; i++) {
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                }, i * 50);
            }
        } else {
            // SMOOTH SCROLL TO TOP for normal pages
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Create smooth progress animation
        let startTimestamp: number | null = null;
        const duration = 800; // ms

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            const nextProgress = Math.min(elapsed / duration, 1);

            setProgress(nextProgress);

            if (nextProgress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Wait a bit before hiding
                setTimeout(() => {
                    setVisible(false);
                    setIsNavigating(false);

                    // One final scroll for problem pages
                    if (isProblemPage) {
                        window.scrollTo(0, 0);
                    }
                }, 300);
            }
        };

        const animationFrame = window.requestAnimationFrame(step);

        // Add subtle page transition effect
        const pageContent = document.querySelector('main');
        if (pageContent) {
            // For problem pages, force scroll
            if (isProblemPage) {
                window.scrollTo(0, 0);
            } else {
                // Smooth scroll for normal pages
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            pageContent.classList.add('page-transitioning');
            setTimeout(() => {
                pageContent.classList.remove('page-transitioning');

                // For problem pages, force scroll
                if (isProblemPage) {
                    window.scrollTo(0, 0);
                } else {
                    // Smooth scroll for normal pages
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }, 600);
        }

        return () => window.cancelAnimationFrame(animationFrame);
    }, [pathname]);

    if (!visible) return null;

    return (
        <>
            <div className="fixed top-0 left-0 right-0 h-1 bg-red-500/20 z-[9999]">
                <div
                    className="h-full bg-gradient-to-r from-red-500 via-white to-red-500 background-animate"
                    style={{
                        width: `${progress * 100}%`,
                        transition: 'width 0.2s ease-out'
                    }}
                />
            </div>

            <style jsx global>{`
                @keyframes background-pan {
                    from {
                        background-position: 0% center;
                    }
                    to {
                        background-position: 200% center;
                    }
                }
                
                .background-animate {
                    background-size: 200% auto;
                    animation: background-pan 2s linear infinite;
                }
                
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease;
                }
                
                /* Page transition effect */
                .page-transitioning {
                    opacity: 0.95;
                    transform: translateY(8px);
                    transition: opacity 0.4s ease, transform 0.4s ease;
                }
            `}</style>
        </>
    );
} 