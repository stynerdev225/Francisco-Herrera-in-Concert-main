"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition() {
    const pathname = usePathname();

    useEffect(() => {
        // Simple scroll to top with minimal impact on animations
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }, [pathname]);

    return null;
} 