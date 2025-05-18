"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ScrollToTop() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Special handling for problem pages
        const isProblemPage = pathname.includes('/sections/music') || pathname.includes('/tickets');

        // AGGRESSIVE scroll to top implementation with SMOOTH behavior
        const smoothScrollToTop = () => {
            // For problem pages, use multiple aggressive scroll approaches
            if (isProblemPage) {
                // Instant scroll first to ensure proper positioning
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0; // For Safari

                // Followed by smooth scrolling for any remaining distance
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, 10);

                // Additional scrolls for extra reliability on problem pages
                for (let i = 1; i <= 5; i++) {
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                        document.documentElement.scrollTop = 0;
                        document.body.scrollTop = 0;
                    }, i * 100);
                }
            } else {
                // Primary smooth scroll for normal pages
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

                // Secondary scroll with slight delay
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, 100);

                // Animation frame for better performance, still smooth
                requestAnimationFrame(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        };

        // Immediately execute when route changes
        smoothScrollToTop();

        // Create interval to ensure scrolling happens
        const scrollInterval = setInterval(() => {
            if (window.scrollY > 0) {
                // For problem pages, use more aggressive approach during the interval
                if (isProblemPage) {
                    window.scrollTo(0, 0);
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                } else {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            } else {
                clearInterval(scrollInterval);
            }
        }, 100);

        // Maximum duration for interval (safety)
        setTimeout(() => clearInterval(scrollInterval), 1000);

        // Handle various navigation events
        window.addEventListener('popstate', smoothScrollToTop);

        return () => {
            clearInterval(scrollInterval);
            window.removeEventListener('popstate', smoothScrollToTop);
        };
    }, [pathname, searchParams]);

    return null; // This component doesn't render anything
} 