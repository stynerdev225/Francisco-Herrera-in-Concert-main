"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function ImageWithBanner() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [bannerOffset, setBannerOffset] = useState(0);
  const guitaristImgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobileView(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div ref={containerRef} className="guitarist-banner-container relative">
      {/* Guitarist Image */}
      <div className="absolute inset-0 flex items-center justify-center overflow-visible">
        <div className="relative w-[450px] h-[650px] sm:w-[500px] sm:h-[700px] md:w-[900px] md:h-[1200px]">
          <Image
            ref={guitaristImgRef}
            src="https://pub-28e558b74ea64a0781531927a8b49e0e.r2.dev/tio.png"
            alt="Guitarist performing"
            fill
            sizes="(max-width: 640px) 500px, (max-width: 768px) 600px, 900px"
            className={`absolute ${isMobileView ? 'mobile-guitarist-img' : 'desktop-guitarist-img'}`}
            style={{
              objectFit: "contain",
              objectPosition: "center",
              transform: isMobileView ? 'translateY(15%)' : 'translateY(25%)',
              zIndex: 20,
              maxHeight: isMobileView ? '600px' : 'auto',
              pointerEvents: 'none'
            }}
            priority
          />
        </div>
      </div>

      {/* Rotating Banner - Only visible at the bottom on mobile */}
      <div
        className={`rotating-banner w-full bg-black py-8 overflow-hidden ${isMobileView ? 'fixed-mobile-banner' : ''}`}
        style={{
          height: 'auto' // Ensure the height is determined by content, not stretched
        }}
      >
        <div className="relative w-full overflow-hidden">
          <div className="inline-flex whitespace-nowrap animate-smooth-banner">
            {Array.from({ length: 15 }).map((_, index) => (
              <span key={index} className="text-white text-5xl md:text-7xl font-extrabold mx-8 uppercase">
                UNE <span className="text-red-500 mx-2">•</span> LA <span className="text-red-500 mx-2">•</span> MÚSICA <span className="text-red-500 mx-2">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes smooth-banner {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-smooth-banner {
          animation: smooth-banner 40s linear infinite;
          will-change: transform;
        }

        /* Mobile performance optimization */
        @media (max-width: 767px) {
          .animate-smooth-banner {
            animation-duration: 30s;
          }
        }

        /* Accessibility - respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .animate-smooth-banner {
            animation-duration: 60s;
          }
        }

        /* Together as one unit positioning */
        .guitarist-banner-container {
          position: relative;
          z-index: 10;
        }

        /* Mobile specific positioning */
        @media (max-width: 640px) {
          .fixed-mobile-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            padding-top: 3px;
            padding-bottom: 3px;
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
          }

          /* This class can be added via JavaScript to move both elements */
          .move-down-10 {
            transform: translateY(10%);
          }

          .move-down-20 {
            transform: translateY(20%);
          }

          .move-up-10 {
            transform: translateY(-10%);
          }
        }

        /* Move both components together with a single CSS class */
        .guitarist-banner-container.move-down {
          transform: translateY(20px);
        }

        .guitarist-banner-container.move-up {
          transform: translateY(-20px);
        }
      `}</style>
    </div>
  );
}