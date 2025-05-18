"use client";

import React, { useEffect } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    useEffect(() => {
        // Force scroll restoration to always go to top
        if (typeof window !== 'undefined') {
            // Set browser scroll restoration to manual
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
            }

            // Force scroll to top on page load
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Force scroll to top on any hash change or popstate events
            const scrollToTop = () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            };

            window.addEventListener('popstate', scrollToTop);
            window.addEventListener('hashchange', scrollToTop);

            return () => {
                window.removeEventListener('popstate', scrollToTop);
                window.removeEventListener('hashchange', scrollToTop);
            };
        }
    }, []);

    return <>{children}</>;
} 