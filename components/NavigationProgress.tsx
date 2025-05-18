"use client";

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationProgress() {
    const [isNavigating, setIsNavigating] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // When the path or search params change, trigger the animation
        const handleRouteChangeStart = () => {
            setIsNavigating(true);
        };

        const handleRouteChangeComplete = () => {
            setTimeout(() => {
                setIsNavigating(false);
            }, 300); // Match this with the page transition duration
        };

        // Simulate a route change event when pathname or searchParams changes
        handleRouteChangeStart();
        const timer = setTimeout(handleRouteChangeComplete, 100);

        return () => {
            clearTimeout(timer);
        };
    }, [pathname, searchParams]);

    return (
        <div
            className={`fixed top-0 left-0 right-0 h-0.5 bg-red-500 z-[9999] transition-all duration-300 ease-in-out ${isNavigating ? 'opacity-100' : 'opacity-0'
                }`}
            style={{
                width: isNavigating ? '100%' : '0%',
                boxShadow: isNavigating ? '0 0 10px rgba(239, 68, 68, 0.7)' : 'none'
            }}
        />
    );
} 