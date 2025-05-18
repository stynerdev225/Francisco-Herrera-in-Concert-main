"use client";

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ScrollAnimation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation on route change
    setIsAnimating(true);

    // Perform smooth scroll with animation
    const scrollToTopWithAnimation = () => {
      const scrollDuration = 800; // ms
      const scrollStep = -window.scrollY / (scrollDuration / 15);

      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
          setTimeout(() => setIsAnimating(false), 300);
        }
      }, 15);

      return () => clearInterval(scrollInterval);
    };

    scrollToTopWithAnimation();
  }, [pathname, searchParams]);

  return (
    <>
      {isAnimating && (
        <div className="fixed top-0 left-0 w-full h-2 z-[9999] bg-gradient-to-r from-red-500 via-white to-red-500 animate-scroll-indicator pointer-events-none"></div>
      )}

      <style jsx global>{`
        @keyframes scrollIndicator {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-scroll-indicator {
          animation: scrollIndicator 1.5s ease-in-out infinite;
          background-size: 200% 200%;
        }
        
        /* Add smooth scrolling to the whole document */
        html {
          scroll-behavior: smooth !important;
        }
        
        /* Remove body opacity transition */
      `}</style>
    </>
  );
} 