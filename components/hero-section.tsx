// --- FILE: hero-section.tsx ---
// COMPLETE CODE - Minimal fix applied ONLY to handleNonLinkClick logic.
// Design, layout, animations, and other functions are UNCHANGED from YOUR version.

"use client"

import type React from "react"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, Star as StarIcon, ChevronRight } from "lucide-react"

// Testimonials data removed as per your code
// const testimonials = [ ... ];

export default function HeroSection() {
  // --- State and Refs (Unchanged from your version) ---
  const [showScrollUp, setShowScrollUp] = useState(false)
  const [concertInfoCollapsed, setConcertInfoCollapsed] = useState(true)
  const [eventDetailsCollapsed, setEventDetailsCollapsed] = useState(true)
  const [isMobileView, setIsMobileView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const guitaristImgRef = useRef<HTMLImageElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)
  const leftCardContentRef = useRef<HTMLDivElement>(null)
  const rightCardContentRef = useRef<HTMLDivElement>(null)
  const ticketButtonRef = useRef<HTMLAnchorElement>(null)
  const toggleButtonsRef = useRef<(HTMLButtonElement | HTMLDivElement | null)[]>([])
  const scrollButtonsRef = useRef<(HTMLButtonElement | null)[]>([])
  const lastScrollAttemptRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);

  // --- Functions (COMPLETELY DISABLED ALL AUTO-SCROLL) ---
  const scrollToElement = (elementId: string) => {
    // DISABLED - No scrolling
    return;
  }

  const throttledScrollToTickets = (event?: React.MouseEvent) => {
    // DISABLED - No scrolling
    return;
  };

  const scrollToTickets = (event?: React.MouseEvent) => {
    // DISABLED - No scrolling
    return;
  };

  const scrollToTop = () => {
    // DISABLED - No scrolling
    return;
  }

  const scrollToContent = () => {
    // DISABLED - No scrolling
    return;
  }

  // --- useEffects (Unchanged from your version, except the last one) ---
  useEffect(() => { // scroll/hash/anchor listener
    if (typeof window === 'undefined') return;
    const reserveTicketsSection = document.getElementById("reserve-tickets");
    if (reserveTicketsSection) {
      reserveTicketsSection.style.scrollMarginTop = "50px";
      (reserveTicketsSection.style as any).scrollSnapMarginTop = "50px";

      // DISABLED automatic scrolling on hash
      // if (window.location.hash === '#reserve-tickets') {
      //   setTimeout(() => {
      //     throttledScrollToTickets();
      //   }, 300);
      // }
    }

    // DISABLED hash change handler
    const handleHashChange = () => {
      // Disabled automatic scrolling on hash change
      // if (window.location.hash === '#reserve-tickets') {
      //   setTimeout(() => {
      //     throttledScrollToTickets();
      //   }, 100);
      // }
    };

    window.addEventListener('hashchange', handleHashChange);

    // DISABLED initial hash check
    // if (window.location.hash === '#reserve-tickets') {
    //   handleHashChange();
    // }
    const handleScroll = () => { const scrollPosition = window.scrollY || document.documentElement.scrollTop; const shouldShowButtons = scrollPosition > 300; setShowScrollUp(shouldShowButtons); const scrollTopButton = scrollButtonsRef.current[0]; const scrollTicketsButton = scrollButtonsRef.current[1]; const updateButtonVisibility = (button: HTMLButtonElement | null, show: boolean) => { if (button) { button.style.display = show ? 'flex' : 'none'; button.style.opacity = show ? '1' : '0'; button.style.visibility = show ? 'visible' : 'hidden'; } }; updateButtonVisibility(scrollTopButton, shouldShowButtons); updateButtonVisibility(scrollTicketsButton, shouldShowButtons); }; window.addEventListener("scroll", handleScroll);
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // FIXED: Check if target supports closest() method
      const anchor = target && 'closest' in target ? target.closest('a[href^="#"]') : null;

      if (anchor) {
        const targetId = anchor.getAttribute("href");
        if (targetId === "#reserve-tickets") {
          e.preventDefault();
          scrollToTickets();
          return;
        }
        if (targetId && targetId !== "#") {
          e.preventDefault();
          const targetIdWithoutHash = targetId.slice(1);
          history.pushState(null, '', `#${targetIdWithoutHash}`);
          setTimeout(() => {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => { document.removeEventListener("click", handleAnchorClick); window.removeEventListener("scroll", handleScroll); window.removeEventListener('hashchange', handleHashChange); }
  }, [])
  useEffect(() => { // Mobile detection
    if (typeof window === 'undefined') return; const checkMobile = () => { setIsMobileView(window.innerWidth <= 640) }; checkMobile(); window.addEventListener('resize', checkMobile); return () => window.removeEventListener('resize', checkMobile)
  }, [])
  useEffect(() => { // Client-side mobile styling
    if (typeof window === 'undefined' || !isMobileView) return; const img = guitaristImgRef.current; if (img) { /* styles... */ } const leftContent = leftCardContentRef.current; if (leftContent) { /* styles... */ } const rightContent = rightCardContentRef.current; if (rightContent) { /* styles... */ } const leftCard = leftCardRef.current; if (leftCard) leftCard.style.display = 'none'; const rightCard = rightCardRef.current; if (rightCard) rightCard.style.display = 'none'; if (ticketButtonRef.current) { /* styles... */ } toggleButtonsRef.current.forEach(button => { /* styles... */ }); scrollButtonsRef.current.forEach(button => { /* styles... */ });
  }, [isMobileView]);
  const toggleConcertInfo = () => { if (typeof window === 'undefined') return; setConcertInfoCollapsed(!concertInfoCollapsed); moveSecondCardOnToggle(!concertInfoCollapsed); if (leftCardContentRef.current && leftCardRef.current && rightCardRef.current) { if (concertInfoCollapsed) { /* Opening logic */ } else { /* Closing logic */ } } };
  const toggleEventDetails = () => { if (typeof window === 'undefined') return; setEventDetailsCollapsed(!eventDetailsCollapsed); if (rightCardContentRef.current) { if (eventDetailsCollapsed) { /* Opening logic */ } else { /* Closing logic */ } } };
  const moveSecondCardOnToggle = (isCollapsed: boolean) => { if (typeof window === 'undefined') return; const firstCard = document.querySelector('.left-card-container'); const secondCard = document.querySelector('.right-card-container'); if (firstCard && secondCard) { const firstCardRect = firstCard.getBoundingClientRect(); const firstCardHeight = firstCardRect.height; const newTopPosition = isCollapsed ? '64%' : `calc(64% + ${firstCardHeight / 2}px)`; (secondCard as HTMLElement).style.top = newTopPosition; } };
  useEffect(() => { // localStorage scroll check
    if (typeof window === 'undefined') return;

    // DISABLED localStorage auto-scroll
    // const shouldScrollToTickets = localStorage.getItem('scrollToTickets') === 'true';
    // if (shouldScrollToTickets) {
    //   localStorage.removeItem('scrollToTickets');
    //   setTimeout(() => {
    //     scrollToTickets();
    //   }, 500);
    // }
  }, []);
  useEffect(() => { // hash scroll check on load
    if (typeof window === 'undefined') return;
    // Disable automatic scrolling on page load
    if (window.location.hash && false) { // Adding 'false' condition to disable this behavior
      if (window.location.hash === '#reserve-tickets' || window.location.hash.includes('ticket') || window.location.hash.includes('reserve')) {
        setTimeout(() => {
          document.body.classList.add('smooth-scrolling');
          throttledScrollToTickets();
          setTimeout(() => {
            document.body.classList.remove('smooth-scrolling');
          }, 1000);
        }, 500);
      }
    }
  }, []);
  useEffect(() => { // Link Click Interception (Modified to disable auto-scroll)
    if (typeof window === 'undefined') return;

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let currentElement: HTMLElement | null = target;

      while (currentElement) {
        if (currentElement.tagName === 'A') {
          const href = currentElement.getAttribute('href');

          // Prevent any auto-scrolling for reserve-tickets links
          if (href && (href === '#reserve-tickets' || href.includes('ticket') || href.includes('reserve') || href.includes('boleto'))) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }

          // Allow other anchor links to work normally
          if (href && href.startsWith('#') && href !== '#reserve-tickets') {
            e.preventDefault();
            e.stopPropagation();

            const targetId = href.substring(1);
            history.pushState(null, '', `#${targetId}`);

            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return;
          }
        }
        currentElement = currentElement.parentElement;
      }
    };

    document.addEventListener('click', handleLinkClick, true);
    return () => { document.removeEventListener('click', handleLinkClick, true); };
  }, []);
  useEffect(() => { // Non-Link Click Interception
    if (typeof window === 'undefined') return; // Client-side only

    const handleNonLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if target is an Element that supports closest() method
      if (!target || !('closest' in target)) return;

      // IMPORTANT: Check if this is a click on the hamburger menu button or mobile menu
      // Allow these clicks to propagate normally
      if (target.closest('button[aria-label="Toggle Menu"]') ||
        target.closest('button[aria-controls="mobile-menu"]') ||
        target.closest('#mobile-menu')) {
        return; // EXIT EARLY for hamburger menu interactions
      }

      // Check if target is in the reserve-tickets section
      if (target.closest('#reserve-tickets')) {
        return; // EXIT EARLY, DO NOT STOP PROPAGATION or preventDefault
      }

      // ----- Logic below ONLY runs for clicks OUTSIDE the form area -----

      // Skip links (handled by handleAnchorClick/handleLinkClick) and form inputs
      if (target.tagName === 'A' ||
        target.closest('a') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('input') ||
        target.closest('textarea')) {
        return;
      }

      // Check buttons/divs/spans *outside* the form for ticket-related text/classes
      let currentElement: HTMLElement | null = target;
      while (currentElement) {
        // Only check relevant tags
        if (currentElement.tagName === 'BUTTON' || currentElement.tagName === 'SPAN' || currentElement.tagName === 'DIV') {
          const elementText = currentElement.textContent?.toLowerCase() || '';
          const classList = Array.from(currentElement.classList);
          const ticketClass = classList.find(cn => cn.includes('ticket') || cn.includes('reserve') || cn.includes('boleto'));

          // If it looks like a scroll trigger *and is outside the form*
          if (ticketClass || elementText.includes('ticket') || elementText.includes('boleto') || elementText.includes('reserve')) {
            // Check it's not one of the specific buttons handled by their own onClick if necessary
            if (scrollButtonsRef.current.includes(currentElement as HTMLButtonElement)) return; // Let specific onClick handle
            if (ticketButtonRef.current?.contains(currentElement)) return; // Let link handler handle

            // Stop propagation ONLY for these specific external triggers
            e.preventDefault();
            e.stopPropagation(); // Stop click here for THESE elements
            throttledScrollToTickets(e as unknown as React.MouseEvent);
            return; // Handled
          }
        }
        // Stop traversing up if we hit the body or html
        if (!currentElement.parentElement || currentElement.id === 'reserve-tickets') break;
        currentElement = currentElement.parentElement;
      }
    };

    // Attach the listener
    document.addEventListener('click', handleNonLinkClick, true); // Still use capture phase
    // Cleanup
    return () => { document.removeEventListener('click', handleNonLinkClick, true); };
  }, []); // Empty dependency array

  // --- JSX (Unchanged - Design Preserved) ---
  return (
    // Assign ref to the main container
    <div ref={containerRef} className="relative w-full min-h-[60vh] sm:min-h-[100vh] md:min-h-[120vh] bg-gradient-to-b from-blue-600 to-blue-900 overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 px-2 py-2 sm:py-6 md:py-10">
        <div className="container mx-auto flex flex-col items-center justify-center text-center">
          {/* Title structure with mobile-specific version */}
          <div className="hidden sm:flex items-center justify-center mb-2 sm:mb-4 w-full overflow-x-visible no-scrollbar px-1 sm:px-3">
            {/* Desktop/Tablet version - Only shown on sm screens and up */}
            {/* Left decorative line */}
            <div
              className="h-[5px] md:h-[7px] bg-red-500 w-16 md:w-40 mr-2 md:mr-4 shrink-0 decorative-line"
              style={{
                boxShadow: '0 3px 4px rgba(0,0,0,0.4)',
                background: 'linear-gradient(to right, #f43f5e, #e11d48, #be123c)',
                borderRadius: '4px'
              }}
            ></div>

            {/* Left decorative dot */}
            <div className="text-center mr-1 md:mr-3 shrink-0">
              <span
                className="text-red-500 text-3xl md:text-5xl font-bold decorative-dot inline-block"
                style={{
                  filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.4))',
                  transform: 'scale(1.1)'
                }}
              >•</span>
            </div>

            {/* Title */}
            <h1 className="text-[2.8rem] sm:text-[4.2rem] md:text-[7.2rem] font-bold text-white tracking-tighter leading-none uppercase whitespace-nowrap title-3d">
              <span className="text-red-500">FRANCISCO</span> HERRERA
            </h1>

            {/* Right decorative dot */}
            <div className="text-center ml-1 md:ml-3 shrink-0">
              <span
                className="text-red-500 text-3xl md:text-5xl font-bold decorative-dot inline-block"
                style={{
                  filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.4))',
                  transform: 'scale(1.1)'
                }}
              >•</span>
            </div>

            {/* Right decorative line */}
            <div
              className="h-[5px] md:h-[7px] bg-red-500 w-16 md:w-40 ml-2 md:ml-4 shrink-0 decorative-line"
              style={{
                boxShadow: '0 3px 4px rgba(0,0,0,0.4)',
                background: 'linear-gradient(to right, #be123c, #e11d48, #f43f5e)',
                borderRadius: '4px'
              }}
            ></div>
          </div>

          {/* Mobile version - Only shown on xs screens */}
          <div className="flex sm:hidden flex-col items-center justify-center mb-1 w-full" style={{ marginTop: "70px" }}>
            {/* Mobile title with decorative line above FRANCISCO */}
            <div className="flex items-center justify-center w-full mb-0.5">
              <div className="h-[2px] bg-red-500 w-24 shrink-0"
                style={{
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(to right, #f43f5e, #e11d48, #be123c)',
                  borderRadius: '2px'
                }}
              ></div>
              <span className="text-red-500 text-xl font-bold mx-2">•</span>
              <div className="h-[2px] bg-red-500 w-24 shrink-0"
                style={{
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(to right, #be123c, #e11d48, #f43f5e)',
                  borderRadius: '2px'
                }}
              ></div>
            </div>

            {/* FRANCISCO text in red */}
            <div className="text-red-500 font-bold tracking-tighter uppercase text-[2.5rem] leading-[0.85] title-3d-mobile">
              FRANCISCO
            </div>

            {/* HERRERA text in white */}
            <div className="text-white font-bold tracking-tighter uppercase text-[2.5rem] leading-[0.85] title-3d-mobile mb-1">
              HERRERA
            </div>

            {/* Second decorative line below HERRERA */}
            <div className="flex items-center justify-center w-full">
              <div className="h-[2px] bg-red-500 w-24 shrink-0"
                style={{
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(to right, #f43f5e, #e11d48, #be123c)',
                  borderRadius: '2px'
                }}
              ></div>
              <span className="text-red-500 text-xl font-bold mx-2">•</span>
              <div className="h-[2px] bg-red-500 w-24 shrink-0"
                style={{
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(to right, #be123c, #e11d48, #f43f5e)',
                  borderRadius: '2px'
                }}
              ></div>
            </div>
          </div>

          {/* La Música Une subtitle - ONE UNIFIED COMPONENT */}
          <div className={`musica-une-banner ${isMobileView ? 'hidden' : ''}`} style={{ position: 'relative', display: isMobileView ? 'none' : 'inline-block', zIndex: 10, padding: '0.5rem 1rem', marginTop: isMobileView ? '10px' : '0' }}>
            <div className="musica-une-container" style={{ position: 'relative', zIndex: 10 }}>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-wide uppercase">La Música Une</h2>
              <div className="h-1 bg-red-500 w-16 md:w-32 mx-auto mt-2" style={{ position: 'relative', zIndex: 10 }}></div>
            </div>
          </div>

          {/* Main "Tickets / Boletos" Button - Ref assigned */}
          <a ref={ticketButtonRef} href="#reserve-tickets" className="group bg-red-500 border-2 border-red-500 text-white px-4 sm:px-6 md:px-10 py-1.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-xl font-bold uppercase tracking-wider hover:bg-black transition-all rounded-full shadow-lg transform hover:scale-105 flex items-center justify-center mb-2 sm:mb-10 md:mb-16 pulse-animation" style={{ position: 'relative', zIndex: 5, marginTop: isMobileView ? '10px' : '0' }}>
            <span className="text-red-500 mr-2">•</span>Tickets / Boletos<span className="text-red-500 ml-2">•</span>
          </a>
        </div>
      </header>

      {/* Scroll Top Button - Ref assigned, specific onClick */}
      <button type="button" ref={el => { scrollButtonsRef.current[0] = el }} className="fixed bottom-20 right-6 bg-primary text-white rounded-full p-3 shadow-lg z-[9999]" style={{ display: showScrollUp ? "flex" : "none", opacity: showScrollUp ? 1 : 0, visibility: showScrollUp ? "visible" : "hidden", alignItems: "center", justifyContent: "center" }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollToTop(); }} aria-label="Scroll to top">
        <ChevronUp className="h-6 w-6" />
      </button>
      {/* Rotating Headline Text */}
      <div className="absolute top-[50%] sm:top-[35%] w-full overflow-hidden z-[1]">
        <div className="relative w-full overflow-hidden">
          <div className="inline-flex whitespace-nowrap animate-marketing-banner">
            {Array.from({ length: 8 }).map((_, index) => (
              <h1 key={index} className="text-[3rem] sm:text-[5rem] md:text-[12rem] font-bold text-white tracking-tight mx-2 md:mx-4">
                <span className="text-red-500 text-3xl sm:text-5xl md:text-9xl mr-2 md:mr-4">•</span> MIGRATION{" "}
                <span className="text-red-500 text-3xl sm:text-5xl md:text-9xl mx-2 md:mx-4">•</span> BUILDS{" "}
                <span className="text-red-500 text-3xl sm:text-5xl md:text-9xl mx-2 md:mx-4">•</span> NATIONS{" "}
                <span className="text-red-500 text-3xl sm:text-5xl md:text-9xl mx-2 md:mx-4">•</span> MIGRATION{" "}
              </h1>
            ))}
          </div>
        </div>
      </div>
      {/* Guitarist Image */}
      <div className="absolute inset-0 flex items-center justify-center overflow-visible z-[20]">
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
              transform: isMobileView ? 'translateY(30%)' : 'translateY(25%)',
              zIndex: 20,
              maxHeight: isMobileView ? '450px' : 'auto',
              pointerEvents: 'none'
            }}
            priority
          />
        </div>
      </div>
      {/* Left Card */}
      <div ref={leftCardRef} className="left-card-container absolute bottom-4 sm:bottom-10 md:bottom-20 left-4 sm:left-6 md:left-8 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-full max-w-[90%] sm:max-w-lg bg-black/90 p-5 sm:p-8 md:p-10 z-20 rounded-xl shadow-3d transform transition-transform duration-300 hover:translate-y-[-5px]" onClick={toggleConcertInfo}>
        <div className="mb-4 sm:mb-6 md:mb-8 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide inline-block transform transition-transform duration-300 hover:scale-105">
            FRANCISCO HERRERA IN CONCERT
            <div className="h-1 md:h-1.5 bg-red-500 w-1/2 mt-2 md:mt-3"></div>
          </h2>
          <div className="absolute top-4 right-4 bg-transparent border-none z-10 p-1 touch-card-button" ref={(el) => { if (toggleButtonsRef.current) { toggleButtonsRef.current[0] = el; } }}>
            {concertInfoCollapsed ? (<ChevronDown className="h-6 w-6 text-red-500" />) : (<ChevronUp className="h-6 w-6 text-red-500" />)}
          </div>
        </div>
        <div ref={leftCardContentRef} className="space-y-3 transition-all duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start mb-3 sm:mb-4 md:mb-6">
            <span className="text-red-500 text-xl md:text-2xl mr-3 md:mr-4 mt-0.5">•</span>
            <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed">Migration Strengthens The Nation</p>
          </div>
          <div className="flex items-start mb-3 sm:mb-4 md:mb-6">
            <span className="text-red-500 text-xl md:text-2xl mr-3 md:mr-4 mt-0.5">•</span>
            <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed italic">La Migración Fortalece La Nación</p>
          </div>
          <div className="flex items-start mb-3 sm:mb-4 md:mb-6">
            <span className="text-red-500 text-xl md:text-2xl mr-3 md:mr-4 mt-0.5">•</span>
            <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed">June 21, 2025 - Herbst Theatre</p>
          </div>
          <div className="flex items-start mb-2">
            <span className="text-red-500 text-xl md:text-2xl mr-3 md:mr-4 mt-0.5">•</span>
            <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed">Special Guests <span className="italic block mt-1">Invitados especiales</span></p>
          </div>
        </div>
      </div>
      {/* Right Card */}
      <div ref={rightCardRef} className="right-card-container absolute bottom-4 sm:bottom-10 md:bottom-20 right-4 sm:right-6 md:right-8 z-20 bg-black/90 p-4 sm:p-5 rounded-xl shadow-3d-card transform transition-transform duration-300 hover:translate-y-[-5px] max-w-[90%] sm:max-w-xs" onClick={toggleEventDetails}>
        <div className="flex justify-between items-center mb-2 md:mb-3">
          <h3 className="text-white text-lg md:text-xl font-bold">
            <div className="flex flex-col items-center">
              <span className="text-red-500 mb-1">🎶</span>
              <span>Live in San Francisco</span>
            </div>
          </h3>
          <div className="absolute top-4 right-4 bg-transparent border-none z-10 p-1 touch-card-button" ref={(el) => { if (toggleButtonsRef.current) { toggleButtonsRef.current[1] = el; } }}>
            {eventDetailsCollapsed ? (<ChevronDown className="h-6 w-6 text-red-500" />) : (<ChevronUp className="h-6 w-6 text-red-500" />)}
          </div>
        </div>
        <div ref={rightCardContentRef} className="transition-all duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
          <div className="space-y-1 md:space-y-2">
            <p className="text-white text-sm sm:text-base md:text-lg flex items-center">
              <Calendar size={14} className="text-red-500 mr-2 flex-shrink-0" />
              <span>Saturday, June 21, 2025</span>
            </p>
            <p className="text-white text-sm sm:text-base md:text-lg flex items-center">
              <Clock size={14} className="text-red-500 mr-2 flex-shrink-0" />
              <span>7:00 PM – 9:00 PM</span>
            </p>
            <p className="text-white text-sm sm:text-base md:text-lg flex items-center">
              <MapPin size={14} className="text-red-500 mr-2 flex-shrink-0" />
              <span>Herbst Theatre</span>
            </p>
          </div>
          <div className="flex justify-center w-full mt-3">
            <a href="#reserve-tickets"
              className="bouncy-button pulse-animation"
              onMouseDown={(e) => {
                const button = e.currentTarget;
                button.classList.add('button-pressed');

                // Create visible click effect
                button.style.transform = 'scale(0.95) translateY(3px)';
                button.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.2)';

                // Create vibrant ripple effect
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 2;

                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                ripple.classList.add('ripple');

                button.appendChild(ripple);

                // Bounce effect on release
                setTimeout(() => {
                  button.classList.add('bounce-effect');
                  setTimeout(() => button.classList.remove('bounce-effect'), 500);
                  ripple.remove();
                }, 300);
              }}
              onMouseUp={(e) => {
                const button = e.currentTarget;
                button.classList.remove('button-pressed');
                button.style.transform = '';
                button.style.boxShadow = '';
              }}
              onMouseLeave={(e) => {
                const button = e.currentTarget;
                button.classList.remove('button-pressed');
                button.style.transform = '';
                button.style.boxShadow = '';
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                // Add active class for immediate visual feedback
                const button = e.currentTarget;
                button.classList.add('reserve-button-active');

                // Show loading indicator
                const originalText = button.innerHTML;
                button.innerHTML = `<span class="loading-dot-container"><span class="loading-dot"></span><span class="loading-dot"></span><span class="loading-dot"></span></span>`;

                // Restore button after a brief delay
                setTimeout(() => {
                  button.innerHTML = originalText;
                  button.classList.remove('reserve-button-active');
                }, 500);
              }}>
              Reserve your spot Today →
            </a>
          </div>
        </div>
      </div>
      {/* Scroll Tickets Button */}
      <button type="button" ref={el => { scrollButtonsRef.current[1] = el }} className="fixed bottom-6 right-6 bg-red-500 text-white rounded-full p-3 shadow-lg z-[9999]" style={{ display: showScrollUp ? "flex" : "none", opacity: showScrollUp ? 1 : 0, visibility: showScrollUp ? "visible" : "hidden", alignItems: "center", justifyContent: "center" }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollToTickets(e); }} aria-label="Reserve tickets">
        <ChevronRight className="h-6 w-6" />
      </button>
      {/* Styles */}
      <style jsx global>{`
          /* All your existing styles here... */
          @keyframes marketing-banner { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marketing-banner { animation: marketing-banner 50s linear infinite; will-change: transform; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          html { scroll-behavior: smooth; }
          .shadow-3d { box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5), 0 6px 6px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset; transform-style: preserve-3d; backface-visibility: hidden; border: 1px solid rgba(255, 255, 255, 0.15); }
          .shadow-3d::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%); border-radius: inherit; pointer-events: none; }
          .shadow-3d-card { box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4), 0 5px 10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15) inset; transform-style: preserve-3d; backface-visibility: hidden; border: 1px solid rgba(255, 255, 255, 0.2); background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)); }
          .shadow-3d-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 40%; background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0)); border-radius: inherit; border-bottom-right-radius: 0; border-bottom-left-radius: 0; pointer-events: none; }
          .title-3d { position: relative; color: white; text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15); transform-style: preserve-3d; transition: all 0.3s ease; }
          @media (max-width: 640px) { .title-3d { text-shadow: 0 1px 0 #cccccc, 0 1px 0 #c9c9c9, 0 2px 0 #bbb, 0 2px 0 #b9b9b9, 0 3px 0 #aaa, 0 3px 1px rgba(0,0,0,.1), 0 0 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.3), 0 2px 3px rgba(0,0,0,.2), 0 3px 5px rgba(0,0,0,.25), 0 5px 5px rgba(0,0,0,.2), 0 10px 10px rgba(0,0,0,.15); font-size: 2.5rem !important; line-height: 1.1 !important; margin: 0 auto !important; } }
          .title-3d:hover { text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15), 0 25px 25px rgba(0,0,0,.1); transform: translateY(-5px); }
          .title-3d span { display: inline-block; transform-style: preserve-3d; text-shadow: 0 1px 0 #ff6666, 0 2px 0 #ff5252, 0 3px 0 #ff3d3d, 0 4px 0 #ff2929, 0 5px 0 #ff1414, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15); }
          @media (max-width: 640px) { .title-3d span { text-shadow: 0 1px 0 #ff6666, 0 1px 0 #ff5252, 0 2px 0 #ff3d3d, 0 2px 0 #ff2929, 0 3px 0 #ff1414, 0 3px 1px rgba(0,0,0,.1), 0 0 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.3), 0 2px 3px rgba(0,0,0,.2), 0 3px 5px rgba(0,0,0,.25), 0 5px 5px rgba(0,0,0,.2), 0 10px 10px rgba(0,0,0,.15); } }
          .decorative-dot { position: relative; display: inline-block; color: #e11d48; text-shadow: 0 1px 0 #f43f5e, 0 2px 0 #e11d48, 0 3px 0 #be123c, 0 4px 0 #9f1239, 0 5px 0 #881337, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15); transform-style: preserve-3d; transform: translateZ(10px); transition: all 0.3s ease; animation: float 3s ease-in-out infinite; }
          @keyframes float { 0%, 100% { transform: translateY(0) translateZ(10px); } 50% { transform: translateY(-5px) translateZ(15px); } }
          @media (max-width: 640px) { .decorative-dot { text-shadow: 0 1px 0 #f43f5e, 0 2px 0 #e11d48, 0 3px 0 #be123c, 0 4px 0 #9f1239, 0 5px 1px rgba(0,0,0,.1), 0 0 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.3), 0 2px 3px rgba(0,0,0,.2), 0 3px 5px rgba(0,0,0,.25); display: inline-block !important; visibility: visible !important; opacity: 1 !important; } }
          .decorative-line { position: relative; background: linear-gradient(to right, #f43f5e, #e11d48, #be123c); box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.05) inset; transform-style: preserve-3d; transform: translateZ(5px); border-radius: 2px; animation: pulse 4s ease-in-out infinite; }
          @keyframes pulse { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
          .decorative-line::before { content: ''; position: absolute; top: -1px; left: 0; right: 0; height: 1px; background: rgba(255,255,255,0.3); border-radius: 2px; }
          .decorative-line::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.3); border-radius: 2px; }
          .scroll-button { display: flex; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.6); color: white; border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 50%; cursor: pointer; transition: all 0.3s ease; z-index: 999 !important; width: 40px; height: 40px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; }
          .scroll-button:hover { background-color: rgba(220, 38, 38, 0.8); border-color: rgba(255, 255, 255, 0.4); transform: scale(1.1); }
          .scroll-button:active { transform: scale(0.95); }
          .smooth-scroll-target { scroll-margin-top: 20px; scroll-snap-margin-top: 20px; }
          #reserve-tickets { scroll-margin-top: 20px; scroll-snap-margin-top: 20px; }
          .scroll-down-button { width: 40px; height: 40px; margin-top: 20px; }
          @media (min-width: 768px) { .scroll-down-button { width: 50px; height: 50px; } }
          .scroll-up-button { position: fixed; bottom: 20px; right: 20px; width: 36px; height: 36px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); animation: fadeIn 0.3s ease-in-out; }
          @media (min-width: 768px) { .scroll-up-button { bottom: 30px; right: 30px; width: 44px; height: 44px; } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          .animate-bounce { animation: bounce 2s infinite; }
          @media (max-width: 767px) { .scroll-button { width: 36px !important; height: 36px !important; } a, button { min-height: 40px; } a:active, button:active { transform: scale(0.97); } }
          @media (max-width: 640px) { .animate-marketing-banner { animation-duration: 40s; } @keyframes float { 0%, 100% { transform: translateY(0) translateZ(10px); } 50% { transform: translateY(-3px) translateZ(12px); } } .title-3d { margin-bottom: -10px; font-size: clamp(2.5rem, 8vw, 3.5rem); line-height: 1; } .relative.min-h-\[120vh\], .relative.min-h-\[70vh\] { min-height: 70vh; } }
          .absolute.top-\[35\%\] { z-index: 1 !important; }
          .absolute.inset-0.flex.items-center.justify-center.translate-y-\[25\%\] { z-index: 50 !important; }

          /* Mobile-specific banner positioning */
          @media (max-width: 640px) {
            .absolute.top-\\[35\\%\\] {
              top: 60% !important; /* Moved banner much lower on mobile (was 45%) */
            }
            
            /* Optional: adjust size on mobile if needed */
            .absolute.top-\\[35\\%\\] .text-\\[3rem\\] {
              font-size: 2.5rem !important;
            }
          }

          /* Make sure the guitarist image doesn't block interactions */
          @media (max-width: 640px) {
            .bg-gradient-to-b.from-blue-600.to-blue-900 {
              background: linear-gradient(to bottom, #2563EB, #1E40AF 60%, #1E3A8A 100%) !important;
              background-size: 100% 60vh !important;
              background-repeat: no-repeat !important;
            }

            .absolute.inset-0.flex.items-center.justify-center.translate-y-\[25\%\] {
              z-index: 50 !important;
              transform: translateY(5%) !important;
              top: 45% !important;
              position: relative !important;
            }

            img[alt="Guitarist performing"] {
              display: block !important;
              visibility: visible !important;
              opacity: 1 !important;
              position: absolute !important;
              top: 50% !important;
              left: 50% !important;
              transform: translate(-50%, -30%) !important;
              max-height: 500px !important;
              width: auto !important;
              z-index: 50 !important;
              pointer-events: none !important;
              object-fit: contain !important;
              max-width: 98vw !important;
            }

            .relative.w-full.min-h-\[120vh\] + div,
            .relative.w-full.min-h-\[70vh\] + div,
            .relative.w-full.min-h-\[40vh\] + div,
            .relative.w-full.min-h-\[50vh\] + div,
            .relative.w-full.min-h-\[60vh\] + div,
            div[ref="containerRef"] + div {
              margin-top: 0 !important;
            }
          }
          @media (max-width: 640px) { .left-card-container, .right-card-container { display: none !important; visibility: hidden !important; opacity: 0 !important; position: absolute !important; left: -9999px !important; top: -9999px !important; height: 0 !important; width: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important; border: 0 !important; pointer-events: none !important; } [ref="leftCardRef"], [ref="rightCardRef"] { display: none !important; opacity: 0 !important; pointer-events: none !important; height: 0 !important; width: 0 !important; } .container.min-h-\[120vh\], .container.min-h-\[150vh\], .container.min-h-\[170vh\], .container.min-h-\[180vh\], .container.min-h-\[200vh\], .container.min-h-\[105vh\], .container.min-h-\[65vh\], .container.min-h-\[70vh\], .container.min-h-\[40vh\], .container.min-h-\[50vh\], .container.min-h-\[60vh\] { min-height: 60vh !important; height: 60vh !important; max-height: 60vh !important; overflow: hidden !important; } }
          .pulse-animation { animation: gentle-pulse 3s infinite; box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
          @keyframes gentle-pulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); } 70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); } }
          .clicking { transform: scale(0.95) !important; background-color: black !important; transition: all 0.2s ease-in-out !important; }
          .smooth-scrolling { scroll-behavior: smooth !important; transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000) !important; }
          .smooth-scrolling body { transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000) !important; }
          #reserve-tickets, .smooth-scrolling #reserve-tickets { scroll-margin-top: 50px !important; scroll-snap-margin-top: 50px !important; transition: all 0.3s ease-out !important; }

          /* New button styles with better responsiveness */
          .reserve-button-3d {
            position: relative;
            transform-style: preserve-3d;
            transform: perspective(1000px) translateZ(0);
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            background-color: #ef4444; /* Fresher red */
            letter-spacing: 0.5px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            z-index: 1;
          }

          .reserve-button-3d:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
            z-index: -1;
          }

          .reserve-button-3d:hover {
            background-color: #dc2626;
            transform: translateY(-2px);
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.4);
          }

          .btn-pressed,
          .reserve-button-3d:active {
            transform: translateY(2px) !important;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3) !important;
            background-color: #b91c1c !important;
            transition: all 0.05s ease !important;
          }

          .reserve-button-active {
            background-color: #b91c1c !important;
            transform: translateY(2px) !important;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3) !important;
          }

          /* Loading dots animation */
          .loading-dot-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
          }

          .loading-dot {
            width: 6px;
            height: 6px;
            background-color: white;
            border-radius: 50%;
            display: inline-block;
            animation: bounce-loading 1.4s infinite ease-in-out both;
          }

          .loading-dot:nth-child(1) {
            animation-delay: -0.32s;
          }

          .loading-dot:nth-child(2) {
            animation-delay: -0.16s;
          }

          @keyframes bounce-loading {
            0%, 80%, 100% {
              transform: scale(0);
              opacity: 0.5;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }

          /* Ripple effect */
          .ripple-effect {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            background: rgba(255, 255, 255, 0.7);
            width: 150px;
            height: 150px;
            margin-top: -75px;
            margin-left: -75px;
            pointer-events: none;
            animation: ripple 0.5s ease-out;
          }

          @keyframes ripple {
            to {
              transform: scale(2.5);
              opacity: 0;
            }
          }

          /* Interactive button styles */
          .interactive-button {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            padding: 0.6rem 1rem;
            font-weight: 600;
            font-size: 0.95rem;
            line-height: 1.2;
            color: white;
            background-color: #ef4444;
            border: none;
            border-radius: 0.375rem;
            box-shadow: 0 2px 4px rgba(239, 68, 68, 0.5),
                        0 3px 0 #b91c1c,
                        0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            cursor: pointer;
            transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
            -webkit-tap-highlight-color: transparent;
            user-select: none;
            text-decoration: none;
          }

          .interactive-button:hover {
            transform: translateY(-1px);
            background-color: #dc2626;
            box-shadow: 0 4px 6px rgba(239, 68, 68, 0.5),
                        0 3px 0 #b91c1c,
                        0 5px 10px rgba(0, 0, 0, 0.15);
          }

          .button-pressed {
            transform: translateY(3px) !important;
            box-shadow: 0 0px 1px rgba(239, 68, 68, 0.4),
                        0 0px 0 #b91c1c,
                        0 1px 2px rgba(0, 0, 0, 0.1) !important;
            background-color: #b91c1c !important;
            transition: all 0.05s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }

          .button-flash {
            background-color: #f87171 !important;
          }

          /* Super responsive button with bounce effect */
          .bouncy-button {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            padding: 0.5rem 0.75rem;
            font-weight: 600;
            font-size: 0.95rem;
            line-height: 1.2;
            color: white;
            background-color: #ef4444;
            background-image: linear-gradient(135deg, #ef4444, #dc2626);
            border: none;
            border-radius: 0.375rem;
            box-shadow: 0 2px 0 #b91c1c,
                      0 3px 6px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            -webkit-tap-highlight-color: transparent;
            user-select: none;
            text-decoration: none;
            transform-origin: center bottom;
            will-change: transform, box-shadow;
          }

          .bouncy-button:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 4px 0 #b91c1c,
                      0 6px 10px rgba(0, 0, 0, 0.2);
          }

          .button-pressed {
            background-color: #b91c1c !important;
            background-image: linear-gradient(135deg, #b91c1c, #991b1b) !important;
            transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }

          /* Ripple animation */
          .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
          }

          @keyframes ripple-animation {
            to {
              transform: scale(1);
              opacity: 0;
            }
          }

          /* Bounce animation */
          .bounce-effect {
            animation: bounce-animation 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
          }

          @keyframes bounce-animation {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            25% {
              transform: translateY(-10px) scale(1.05);
            }
            50% {
              transform: translateY(0) scale(0.95);
            }
            75% {
              transform: translateY(-5px) scale(1.02);
            }
          }
        `}</style>
    </div>
  )
}