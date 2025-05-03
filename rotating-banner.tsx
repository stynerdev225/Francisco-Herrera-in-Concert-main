"use client"
import { useEffect, useState } from "react"

export default function RotatingBanner() {
  // Add state to track if on mobile
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 767)
      }

      // Initial check
      checkMobile()

      // Add resize listener
      window.addEventListener('resize', checkMobile)

      // Cleanup
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <div
      className="unified-banner-block"
      style={{
        marginTop: isMobile ? '950px' : '0',  // MOVED MUCH LOWER for mobile view
        width: '100%',
        position: 'relative',
        zIndex: 999
      }}
    >
      <div
        className="black-banner-background"
        style={{
          backgroundColor: 'black',
          width: '100%',
          padding: '2rem 0',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 -5px 10px rgba(0,0,0,0.5)',
          height: 'auto',
          maxHeight: '120px'
        }}
      >
        <div className="banner-text-container" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div className="banner-text-animation" style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
            {Array.from({ length: 15 }).map((_, index) => (
              <span key={index} className="text-white text-5xl md:text-7xl font-extrabold mx-8 uppercase">
                UNE <span className="text-red-500 mx-2">•</span> LA <span className="text-red-500 mx-2">•</span> MÚSICA <span className="text-red-500 mx-2">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .banner-text-animation {
          animation: slide 40s linear infinite;
          will-change: transform;
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 767px) {
          .banner-text-animation {
            animation-duration: 30s;
          }
          
          /* Additional mobile positioning to ensure it stays where intended */
          .unified-banner-block {
            margin-top: 950px !important;
            position: relative !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .banner-text-animation {
            animation-duration: 60s;
          }
        }
      `}</style>
    </div>
  )
}
