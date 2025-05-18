"use client"

import Link from "next/link"
import { Facebook, Instagram, Youtube, Linkedin, MapPin, Calendar, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 md:py-10 w-full relative mt-auto">
      <div className="container mx-auto px-4">
        {/* Top section with columns - Mobile responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 mb-8">
          {/* Find me - centered */}
          <div className="md:col-span-3 text-center">
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 flex items-center justify-center">
              <span className="text-red-500 mr-2 text-xl md:text-2xl">•</span>
              Find me
            </h3>
            <p className="text-gray-300 text-sm md:text-base">P.O. BOX 411723</p>
            <p className="text-gray-300 text-sm md:text-base">SAN FRANCISCO, CA 94141</p>
          </div>

          {/* Contact me - centered */}
          <div className="md:col-span-3 text-center">
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 flex items-center justify-center">
              <span className="text-red-500 mr-2 text-xl md:text-2xl">•</span>
              Contact me
            </h3>
            <div className="space-y-1 md:space-y-2">
              <p className="text-gray-300 text-sm md:text-base">miranomas@franciscoherreramusic.com</p>
            </div>
          </div>

          {/* Follow me - centered */}
          <div className="md:col-span-2 text-center">
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 flex items-center justify-center">
              <span className="text-red-500 mr-2 text-xl md:text-2xl">•</span>
              Follow me
            </h3>
            <div className="flex space-x-4 justify-center">
              <Link href="https://www.facebook.com/franciscoherreramusic" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 p-2">
                <Facebook size={20} />
              </Link>
              <Link href="https://www.instagram.com/franciscoherreramusica/?hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 p-2">
                <Instagram size={20} />
              </Link>
              <Link href="https://www.tiktok.com/foryou?lang=en" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 p-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-300"
                  style={{ fill: 'currentColor' }}
                >
                  <path
                    d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.9 2.9 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                  />
                </svg>
              </Link>
              <Link href="https://www.linkedin.com/in/francisco-javier-herrera-37168416/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500 p-2">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Upcoming Event - reverted to previous style but mobile optimized */}
          <div className="md:col-span-4 md:pl-4 lg:pl-8">
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 flex items-center justify-center md:justify-start">
              <span className="text-red-500 mr-2 text-xl md:text-2xl">•</span>
              Upcoming Event
            </h3>
            <div className="ml-0 md:ml-6 border-l-0 md:border-l-2 border-red-500 pl-0 md:pl-5 py-0 md:py-2 text-center md:text-left">
              <h4 className="text-white text-base md:text-xl font-bold flex items-center justify-center md:justify-start">
                <span className="text-red-500 mr-2">🎶</span> Live in San Francisco
              </h4>

              <div className="mt-2 md:mt-3 space-y-1 md:space-y-2">
                <p className="text-gray-300 text-sm md:text-base flex items-center justify-center md:justify-start">
                  <Calendar size={14} className="text-red-500 mr-2 flex-shrink-0" />
                  Saturday, June 21, 2025
                </p>

                <p className="text-gray-300 text-sm md:text-base flex items-center justify-center md:justify-start">
                  <Clock size={14} className="text-red-500 mr-2 flex-shrink-0" />
                  <span className="flex items-center">7:00 PM</span>
                </p>

                <p className="text-gray-300 text-sm md:text-base flex items-center justify-center md:justify-start">
                  <MapPin size={14} className="text-red-500 mr-2 flex-shrink-0" />
                  Herbst Theatre
                </p>
              </div>

              <Link
                href="/#reserve-tickets"
                className="inline-block mt-3 md:mt-4 text-red-500 text-sm md:text-base font-medium hover:text-red-400 transition-colors p-1"
                onClick={(e) => {
                  e.preventDefault();

                  // Check if we're already on the homepage
                  if (window.location.pathname !== '/' && typeof window !== 'undefined') {
                    // If not on homepage, navigate to homepage with hash
                    window.location.href = '/#reserve-tickets';
                    return;
                  }

                  // Multiple approaches for more reliable scrolling
                  const scrollToReserveSection = () => {
                    console.log("Footer: Scrolling to reserve-tickets section");

                    // Find the reserve tickets section
                    const reserveSection = document.getElementById('reserve-tickets');

                    if (reserveSection) {
                      // Approach 1: scrollIntoView with behavior and block options
                      reserveSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });

                      // Approach 2: window.scrollTo with offset (as fallback)
                      setTimeout(() => {
                        window.scrollTo({
                          top: reserveSection.offsetTop - 20,
                          behavior: 'smooth'
                        });
                      }, 100);

                      // Approach 3: Force scroll after a longer delay
                      setTimeout(() => {
                        window.scrollTo({
                          top: reserveSection.offsetTop - 20,
                          behavior: 'auto' // Use 'auto' for more reliable scrolling
                        });
                      }, 500);
                    } else {
                      // Find hero section by class as fallback
                      const heroSection = document.querySelector(".from-purple-700") ||
                        document.querySelector("main > div:nth-child(3)");

                      if (heroSection) {
                        (heroSection as HTMLElement).scrollIntoView({ behavior: 'smooth' });
                      } else {
                        // If we can't find the section, navigate directly to homepage
                        window.location.href = '/#reserve-tickets';
                      }
                    }
                  };

                  // Execute with a slight delay to ensure event bubbling completes
                  setTimeout(scrollToReserveSection, 10);
                }}
              >
                Reserve your spot Today →
              </Link>
            </div>
          </div>
        </div>

        {/* Horizontal line */}
        <div className="h-px bg-gray-800 w-full mb-6"></div>

        {/* Logo and copyright - Updated with F. and larger text - Mobile responsive */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h1 className="text-[3rem] sm:text-[3.5rem] md:text-[6rem] font-bold tracking-tighter leading-none">
              <span className="text-red-500 mr-2">F.</span>HERRERA
            </h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 text-xs md:text-sm text-gray-400 text-center md:text-right">
            <p>© 2025 Francisco Herrera. All rights reserved.</p>
            <div className="flex space-x-4 md:space-x-6 justify-center">
              <Link href="/privacy-policy" className="hover:text-white transition-colors p-2">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors p-2">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra-aggressive mobile optimizations - Enhanced for tiny mobile screens */}
      <style jsx>{`
        @media (max-width: 767px) {
          /* Enhanced touch feedback */
          a:active {
            transform: scale(0.97);
          }
          
          /* Ultra-compact footer on mobile */
          footer {
            padding-top: 3px !important;
            padding-bottom: 3px !important;
            margin-top: -10px !important;
          }
          
          .container {
            padding-left: 2px !important;
            padding-right: 2px !important;
          }
          
          /* Microspacing for mobile */
          .grid {
            gap: 2px !important;
            margin-bottom: 2px !important;
          }
          
          /* Compress all headings */
          h3 {
            font-size: 0.9rem !important;
            margin-bottom: 1px !important;
            line-height: 1 !important;
          }
          
          h3 span {
            font-size: 0.9rem !important;
            margin-right: 1px !important;
          }
          
          /* Ultra-small paragraph text */
          p, .text-sm {
            font-size: 0.7rem !important;
            line-height: 1 !important;
            margin: 0 !important;
          }
          
          /* Compress social icons */
          .flex.space-x-4 {
            column-gap: 0 !important;
          }
          
          .p-2 {
            padding: 2px !important;
          }
          
          /* Ultra-compact social icons */
          svg {
            width: 15px !important;
            height: 15px !important;
          }
          
          /* Compress spacing in event info */
          .space-y-1, .space-y-2 {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
          
          .space-y-1 > *, .space-y-2 > * {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
          
          .mt-2, .mt-3, .mt-4 {
            margin-top: 1px !important;
          }
          
          /* Compress logo section */
          .mb-4 {
            margin-bottom: 1px !important;
          }
          
          .mb-6 {
            margin-bottom: 1px !important;
          }
          
          .mb-8 {
            margin-bottom: 2px !important;
          }
          
          /* Smaller logo text */
          .text-\\[3rem\\] {
            font-size: 1.8rem !important;
            line-height: 1 !important;
          }
          
          /* Microscopic copyright */
          .text-xs {
            font-size: 0.6rem !important;
            line-height: 1 !important;
          }
          
          .space-y-2 {
            gap: 1px !important;
          }
          
          /* Remove all unnecessary spacing */
          .flex.flex-col.md\\:flex-row {
            gap: 1px !important;
          }
          
          /* Ultra-compact links */
          .space-x-4 {
            gap: 0 !important;
          }
          
          .space-x-6 {
            gap: 0 !important;
          }
        }

        /* Even more aggressive for extra small mobile */
        @media (max-width: 350px) {
          footer {
            padding-top: 2px !important;
            padding-bottom: 2px !important;
          }
          
          h3 {
            font-size: 0.8rem !important;
          }
          
          p, .text-sm {
            font-size: 0.65rem !important;
          }
          
          .text-\\[3rem\\] {
            font-size: 1.5rem !important;
          }
          
          svg {
            width: 12px !important;
            height: 12px !important;
          }
          
          .text-xs {
            font-size: 0.55rem !important;
          }
        }
      `}</style>
    </footer>
  )
}
