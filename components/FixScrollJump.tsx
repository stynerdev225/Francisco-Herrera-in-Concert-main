"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Simple component to reset scroll position without animations
export default function FixScrollJump() {
    const pathname = usePathname();

    useEffect(() => {
        // Just reset the scroll position instantly
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
} 