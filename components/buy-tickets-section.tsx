"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"
import confetti from 'canvas-confetti'

// Countdown timer component with improved styling
const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = targetDate.getTime() - new Date().getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                // Concert has started
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Initial calculation
        calculateTimeLeft();

        // Update every second
        const timer = setInterval(calculateTimeLeft, 1000);

        // Clear interval on component unmount
        return () => clearInterval(timer);
    }, [targetDate]);

    // Format the numbers with leading zeros
    const formatNumber = (num: number) => {
        return num.toString().padStart(2, '0');
    };

    return (
        <div className="py-3 px-4 mt-4 bg-gradient-to-r from-black/40 to-purple-900/30 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg">
            <p className="text-white/80 text-sm font-bold text-center mb-2 uppercase tracking-wider">
                Concert Countdown
            </p>
            <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-red-500 to-red-700 text-white font-bold text-xl sm:text-2xl py-2 px-2 rounded-lg w-12 sm:w-16 text-center shadow-md shadow-red-900/50 border border-red-400/30">
                        {formatNumber(timeLeft.days)}
                    </div>
                    <span className="text-xs text-white/70 mt-1 font-medium">DAYS</span>
                </div>
                <span className="text-red-400 font-bold text-xl -mt-4">:</span>
                <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-red-500 to-red-700 text-white font-bold text-xl sm:text-2xl py-2 px-2 rounded-lg w-12 sm:w-16 text-center shadow-md shadow-red-900/50 border border-red-400/30">
                        {formatNumber(timeLeft.hours)}
                    </div>
                    <span className="text-xs text-white/70 mt-1 font-medium">HRS</span>
                </div>
                <span className="text-red-400 font-bold text-xl -mt-4">:</span>
                <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-red-500 to-red-700 text-white font-bold text-xl sm:text-2xl py-2 px-2 rounded-lg w-12 sm:w-16 text-center shadow-md shadow-red-900/50 border border-red-400/30">
                        {formatNumber(timeLeft.minutes)}
                    </div>
                    <span className="text-xs text-white/70 mt-1 font-medium">MIN</span>
                </div>
                <span className="text-red-400 font-bold text-xl -mt-4">:</span>
                <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-red-500 to-red-700 text-white font-bold text-xl sm:text-2xl py-2 px-2 rounded-lg w-12 sm:w-16 text-center shadow-md shadow-red-900/50 border border-red-400/30 animate-pulse">
                        {formatNumber(timeLeft.seconds)}
                    </div>
                    <span className="text-xs text-white/70 mt-1 font-medium">SEC</span>
                </div>
            </div>
        </div>
    );
};

// Dynamic ticket counter component with more urgency for upcoming concert
const TicketCounter = ({ sold, total, isPremium = false }: { sold: number, total: number, isPremium?: boolean }) => {
    const { t } = useLanguage();
    const [isClient, setIsClient] = useState(false);
    const [displayCount, setDisplayCount] = useState(sold);
    const [countdown, setCountdown] = useState(total - sold);

    // Concert is less than 2 months away - increase urgency!
    const highUrgency = true;

    // Only start the animation after hydration is complete
    useEffect(() => {
        setIsClient(true);
        // Start with a number closer to the actual sold tickets to create urgency
        const initialOffset = isPremium ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 5) + 2;
        const initialDisplayCount = sold - initialOffset;
        setDisplayCount(initialDisplayCount);
        setCountdown(total - initialDisplayCount);
    }, [sold, total, isPremium]);

    // Effect to simulate tickets being sold in real-time (only runs on client)
    useEffect(() => {
        if (!isClient) return;

        // Faster ticket sales for approaching concert date
        // Premium tickets sell faster (every 3-8 seconds)
        // Standard tickets sell faster too (every 8-15 seconds)
        const interval = setInterval(() => {
            setDisplayCount(prevCount => {
                // Don't exceed the actual sold count
                if (prevCount >= sold) return sold;
                const newCount = prevCount + 1;
                // Update countdown when display count changes
                setCountdown(total - newCount);
                return newCount;
            });
        }, isPremium ? Math.random() * 5000 + 3000 : Math.random() * 7000 + 8000);

        return () => clearInterval(interval);
    }, [sold, isPremium, isClient, total]);

    const percentSold = Math.floor((displayCount / total) * 100);
    const ticketsRemaining = total - displayCount;
    const isLow = isPremium ? ticketsRemaining < 40 : ticketsRemaining < 150;
    const isCritical = isPremium ? ticketsRemaining < 20 : ticketsRemaining < 70;

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="text-xs text-white/50">
                    {isPremium ?
                        <span className="text-red-400 font-medium">{t('tickets.selling') || 'Selling fast!'}</span> :
                        t('tickets.remaining') || 'Limited tickets remaining'}
                </div>
                <div className="text-xs font-medium">
                    <span className={`${isPremium ? 'text-red-400' : 'text-white'} tabular-nums transition-all duration-300`}>
                        {isClient ? displayCount : sold}
                    </span>
                    <span className="text-white/50"> / {total} <span className="text-white/50">seats sold</span></span>
                </div>
            </div>

            {/* Ticket progress bar */}
            <div className="w-full bg-white/10 h-1.5 mt-2 mb-3 rounded-full overflow-hidden">
                <div
                    className={`bg-gradient-to-r ${isCritical ? 'from-red-500 to-red-600 animate-pulse' : 'from-green-500 to-green-600'} h-full rounded-full ${isPremium && isClient ? 'animate-pulse' : ''}`}
                    style={{ width: `${((isClient ? displayCount : sold) / total) * 100}%` }}
                ></div>
            </div>

            {/* Ticket countdown display */}
            <div className={`flex justify-center items-center mt-2 ${isLow ? 'animate-pulse' : ''}`}>
                <div className={`bg-gradient-to-r from-red-600 to-red-700 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-red-500/40 shadow-lg`}>
                    <span className="text-white text-xs font-bold mr-1">ONLY</span>
                    <span className="text-white text-lg font-bold tabular-nums">
                        {isClient ? countdown : (total - sold)}
                    </span>
                    <span className="text-white text-xs font-bold ml-1">TICKETS LEFT</span>
                </div>
            </div>

            {/* Limited time message - only show when tickets are running low */}
            {isLow && (
                <p className={`text-center text-xs mt-2 ${isCritical ? 'text-red-400' : 'text-white/70'}`}>
                    {isPremium ?
                        "Premium tickets almost gone!" :
                        "These tickets are selling faster than expected!"}
                </p>
            )}
        </>
    );
};

export default function BuyTicketsSection() {
    const { t, language } = useLanguage();
    const [isAnimated, setIsAnimated] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const confettiTriggeredRef = useRef(false);

    // Set the concert date (June 21, 2025 at 7:00 PM)
    const concertDate = new Date('2025-06-21T19:00:00');

    // Force scroll to top when component mounts
    useEffect(() => {
        // Force immediate scroll to top when tickets page loads
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0; // For Safari

        // Use multiple approaches with timeouts for extreme reliability
        for (let i = 1; i <= 15; i++) {
            setTimeout(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }, i * 50);
        }
    }, []);

    // FIXED CONFETTI FOR ALL DEVICES INCLUDING MOBILE
    const triggerConfetti = useCallback(() => {
        if (confettiTriggeredRef.current) return;

        try {
            // Create a dedicated canvas element for confetti
            const canvas = document.createElement('canvas');
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            canvas.style.zIndex = '9999';
            canvas.style.pointerEvents = 'none';
            document.body.appendChild(canvas);

            // Create confetti instance on our dedicated canvas
            const myConfetti = confetti.create(canvas, {
                resize: true,
                useWorker: false
            });

            // Fire initial burst
            myConfetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.5, x: 0.5 },
                colors: ['#ff0000', '#ffffff', '#ef4444', '#dc2626', '#f43f5e'],
                disableForReducedMotion: false,
                scalar: 1.5, // Make particles larger
                gravity: 0.8 // Less gravity so they stay visible longer
            });

            // Continue with bursts for 3 seconds
            let burstCount = 0;
            const burstInterval = setInterval(() => {
                burstCount++;
                if (burstCount > 10) {
                    clearInterval(burstInterval);
                    // Clean up the canvas after animation completes
                    setTimeout(() => {
                        document.body.removeChild(canvas);
                    }, 5000);
                    return;
                }

                myConfetti({
                    particleCount: 50,
                    angle: Math.random() * 360,
                    spread: 80,
                    origin: {
                        x: 0.2 + Math.random() * 0.6,
                        y: 0.2 + Math.random() * 0.4
                    },
                    colors: ['#ff0000', '#ffffff', '#ef4444', '#dc2626', '#f43f5e'],
                    disableForReducedMotion: false,
                    scalar: 1.5
                });
            }, 300);

            confettiTriggeredRef.current = true;
        } catch (error) {
            console.error("Failed to create confetti effect:", error);
        }
    }, []);

    useEffect(() => {
        setIsAnimated(true);

        // Force trigger confetti immediately for all devices
        setTimeout(() => {
            if (typeof window !== 'undefined' && !confettiTriggeredRef.current) {
                triggerConfetti();
            }
        }, 500);

        // Backup: trigger on section visibility
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !confettiTriggeredRef.current) {
                    triggerConfetti();
                }
            });
        }, { threshold: 0.1 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        // Cleanup function
        return () => {
            if (sectionRef.current) {
                observer.disconnect();
            }
        };
    }, [triggerConfetti]);

    return (
        <section ref={sectionRef} className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden">
            {/* Custom background with from-blue-600 to-blue-900 gradient at the top */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-blue-800 to-purple-900"></div>
            </div>

            {/* Background patterns */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-black/20 opacity-30"></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                }}></div>
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-purple-900 to-transparent"></div>
            </div>



            {/* Rotating Banner Text - Modified to be properly responsive on mobile */}
            <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
                <h1 className="text-[3rem] sm:text-[5rem] md:text-[10rem] lg:text-[15rem] font-bold text-white/10 whitespace-nowrap animate-tickets-banner">
                    MIGRATION • STRENGTHENS • NATION • FRANCISCO • HERRERA •
                </h1>
            </div>

            {/* Second rotating banner for tickets - adjusted size and position */}
            <div className="absolute top-[12%] left-0 right-0 flex items-center overflow-hidden pointer-events-none">
                <h2 className="text-[2rem] sm:text-[3.5rem] md:text-[6.5rem] lg:text-[9rem] font-bold text-white/10 whitespace-nowrap animate-tickets-banner" style={{ animationDuration: "35s" }}>
                    ★ BUY YOUR TICKETS NOW ★ LIMITED SEATS AVAILABLE ★ BUY YOUR TICKETS NOW ★ LIMITED SEATS AVAILABLE ★
                </h2>
            </div>

            {/* Third rotating banner - positioned below the middle */}
            <div className="absolute top-[70%] left-0 right-0 flex items-center overflow-hidden pointer-events-none">
                <h2 className="text-[2rem] sm:text-[3.5rem] md:text-[6.5rem] lg:text-[9rem] font-bold text-white/10 whitespace-nowrap animate-tickets-banner" style={{ animationDuration: "30s" }}>
                    ★ BUY YOUR TICKETS NOW ★ LIMITED SEATS AVAILABLE ★ BUY YOUR TICKETS NOW ★ LIMITED SEATS AVAILABLE ★
                </h2>
            </div>

            {/* Content container */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Section header with 3D effect */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-5">
                        {/* Left decorative line with increased visibility */}
                        <div
                            className="h-[6px] md:h-[8px] bg-red-500 w-16 md:w-24 mr-4 sm:mr-5 md:mr-6 shrink-0"
                            style={{
                                boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
                                background: 'linear-gradient(to right, #f43f5e, #e11d48, #be123c)',
                                borderRadius: '4px'
                            }}
                        ></div>

                        {/* Left decorative dot with 3D pulse */}
                        <div className="text-center mr-3 md:mr-5 shrink-0">
                            <span
                                className="text-red-500 text-4xl md:text-6xl font-bold decorative-dot inline-block animate-dot-pulse"
                                style={{
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))'
                                }}
                            >•</span>
                        </div>

                        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tight title-3d py-2"
                            style={{
                                transform: 'perspective(1000px)',
                                transformStyle: 'preserve-3d',
                                textShadow: '0 2px 0 #cccccc, 0 3px 0 #c9c9c9, 0 4px 0 #bbb, 0 5px 0 #b9b9b9, 0 6px 0 #aaa, 0 7px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)'
                            }}>
                            <span className="text-red-500 block" style={{
                                textShadow: '0 0 5px rgba(239, 68, 68, 0.5), 0 1px 1px rgba(0,0,0,0.8), 0 2px 2px rgba(0,0,0,0.7)'
                            }}>FRANCISCO HERRERA</span>
                            <span className="text-white mt-1 block" style={{
                                transformStyle: 'preserve-3d',
                                perspective: '1000px',
                                display: 'inline-block'
                            }}>IN&nbsp;CONCERT</span>
                        </h2>

                        {/* Right decorative dot with 3D pulse */}
                        <div className="text-center ml-3 md:ml-5 shrink-0">
                            <span
                                className="text-red-500 text-4xl md:text-6xl font-bold decorative-dot inline-block animate-dot-pulse animation-delay-600"
                                style={{
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))'
                                }}
                            >•</span>
                        </div>

                        {/* Right decorative line with increased visibility */}
                        <div
                            className="h-[6px] md:h-[8px] bg-red-500 w-16 md:w-24 ml-4 sm:ml-5 md:ml-6 shrink-0"
                            style={{
                                boxShadow: '0 4px 6px rgba(0,0,0,0.5)',
                                background: 'linear-gradient(to right, #be123c, #e11d48, #f43f5e)',
                                borderRadius: '4px'
                            }}
                        ></div>
                    </div>
                    <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto font-medium mt-5">
                        {t('tickets.subtitle') || 'La Migración Fortaleza la Nación / Migration Strengthens the Nation'}
                    </p>


                </div>

                {/* Main ticket card */}
                <div className={`max-w-5xl mx-auto bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden transform transition-all duration-700 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {/* Banner image - MODIFIED TO SHOW FULL IMAGE */}
                    <div className="relative overflow-hidden">
                        <div className="w-full aspect-[16/9] relative">
                            <Image
                                src="https://pub-28e558b74ea64a0781531927a8b49e0e.r2.dev/FranciscoHerreraConcertVenue.png"
                                alt="Francisco Herrera Concert Venue"
                                fill
                                className="object-contain"
                                priority
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 700px, 1100px"
                                unoptimized={true}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6">
                            <div className="inline-block bg-red-500 text-white text-[10px] sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold uppercase tracking-wide mb-1 sm:mb-2">
                                {t('tickets.venue.name') || 'Francisco Herrera Concert Venue'}
                            </div>
                            <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
                                {t('tickets.title') || 'Francisco Herrera'}
                            </h3>
                        </div>
                    </div>

                    {/* Event details */}
                    <div className="p-6 sm:p-8">
                        {/* Countdown Timer - Moved above the event details grid */}
                        <div className="mb-8 max-w-3xl mx-auto">
                            <CountdownTimer targetDate={concertDate} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="flex items-start">
                                <Calendar className="text-red-500 mr-3 h-5 w-5 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-medium uppercase text-sm tracking-wider mb-1">
                                        {t('tickets.date') || 'Date'}
                                    </h4>
                                    <p className="text-white/80">June 21, 2025</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Clock className="text-red-500 mr-3 h-5 w-5 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-medium uppercase text-sm tracking-wider mb-1">
                                        {t('tickets.time') || 'Time'}
                                    </h4>
                                    <p className="text-white/80">7:00 PM - 9:00 PM</p>
                                    <p className="text-white/80 text-sm">{t('tickets.doorOpen') || 'Doors Open at 6pm'}</p>
                                    <p className="text-white/80 text-sm">{t('tickets.runTime') || 'Run time: 2 Hours'}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="text-red-500 mr-3 h-5 w-5 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-medium uppercase text-sm tracking-wider mb-1">
                                        {t('tickets.venue') || 'Venue'}
                                    </h4>
                                    <p className="text-white/80">Herbst Theatre San Francisco</p>
                                    <p className="text-white/80 text-sm">{t('tickets.reserved') || 'Reserved Seating'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h4 className="text-white uppercase tracking-wide mb-4 relative">
                                <span className="text-red-500 font-bold text-lg inline-block drop-shadow-sm">
                                    {t('tickets.description') || 'Event Description'}
                                </span>
                                <div className="absolute left-0 bottom-0 h-[2px] w-10 bg-red-500"></div>
                            </h4>
                            <p className="text-white/80 mb-4">
                                Migration Strengthens the Nation is a musical journey that lifts the voices and stories of migrant and working people. Get ready for an unforgettable night where the migrant experience is sung with strength, passion, and truth.
                            </p>

                            {/* Performer information */}
                            <h4 className="text-white uppercase tracking-wide mt-6 mb-4 relative">
                                <span className="text-red-500 font-bold text-lg inline-block drop-shadow-sm">
                                    {t('tickets.featured') || 'Featured Artists'}
                                </span>
                                <div className="absolute left-0 bottom-0 h-[2px] w-10 bg-red-500"></div>
                            </h4>
                            <p className="text-white/80 mb-4">
                                Dr. Loco, Liliana Herrera, Rafael Herrera, Ayla Dávila, Camilo Landau, Chris Trinidad, Roberto Corona
                            </p>
                            <p className="text-white/80 mb-1">
                                <span className="font-medium">{t('tickets.mc') || 'MC'}:</span> Pauze
                            </p>
                            <p className="text-white/80 mb-4">
                                <span className="font-medium">{t('tickets.opening') || 'Opening act'}:</span> Tierra Suelta (Latin fusion band with Bay Area flow, led by Meche)
                            </p>

                            {/* Organization info */}
                            <h4 className="text-white uppercase tracking-wide mt-6 mb-4 relative">
                                <span className="text-red-500 font-bold text-lg inline-block drop-shadow-sm">
                                    {t('tickets.production') || 'Production'}
                                </span>
                                <div className="absolute left-0 bottom-0 h-[2px] w-10 bg-red-500"></div>
                            </h4>
                            <p className="text-white/80 mb-1">
                                <span className="font-medium">{t('tickets.producedBy') || 'Produced by'}:</span> Caminante Cultural Foundation Inc.
                            </p>
                            <p className="text-white/80">
                                <span className="font-medium">{t('tickets.producer') || 'Producer'}:</span> Greg Landau (Grammy-nominated)
                            </p>
                        </div>

                        {/* Ticket options with ticket count */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-white font-bold">
                                        {t('tickets.standard') || 'Standard Admission'}
                                    </h4>
                                    <span className="text-white font-bold">$30</span>
                                </div>
                                <p className="text-white/70 text-sm mb-4">
                                    {t('tickets.generalSeating') || 'General seating, full access to all performances'}
                                </p>
                                <TicketCounter sold={783} total={928} />
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-white font-bold">
                                        {t('tickets.premium') || 'Premium Package'}
                                    </h4>
                                    <span className="text-white font-bold">$56</span>
                                </div>
                                <p className="text-white/70 text-sm mb-4">
                                    {t('tickets.prioritySeating') || 'Priority seating, exclusive meet & greet after the show'}
                                </p>
                                <TicketCounter sold={112} total={145} isPremium={true} />
                            </div>
                        </div>

                        {/* Ticket price note */}
                        <div className="text-center mb-8">
                            <p className="text-white/70 text-sm italic">
                                {t('tickets.priceNote') || 'Ticket prices include all fees'}
                            </p>
                        </div>

                        {/* Call to action */}
                        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
                            <div className="text-white/80 text-sm max-w-sm">
                                {t('tickets.note') || 'Tickets will also be available at the door, but we recommend securing yours now as this event may sell out.'}
                            </div>
                            <a
                                href="https://www.cityboxoffice.com/eventperformances.asp?evt=3182"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="buy-tickets-button bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 sm:py-3 px-5 sm:px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center group whitespace-nowrap"
                            >
                                {t('tickets.buyNow') || 'BUY TICKETS NOW'}
                                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Add styles for breathing animation and rotating banner
const styles = `
@keyframes breathe-3d {
    0%, 100% { 
        transform: translateZ(0) rotateX(0deg) translateY(0);
        text-shadow: 0 2px 0 #cccccc, 0 3px 0 #c9c9c9, 0 4px 0 #bbb, 0 5px 0 #b9b9b9, 0 6px 0 #aaa, 0 7px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15);
    }
    50% { 
        transform: translateZ(10px) rotateX(2deg) translateY(-5px);
        text-shadow: 0 4px 0 #cccccc, 0 5px 0 #c9c9c9, 0 6px 0 #bbb, 0 7px 0 #b9b9b9, 0 8px 0 #aaa, 0 9px 2px rgba(0,0,0,.1), 0 0 10px rgba(0,0,0,.2), 0 2px 5px rgba(0,0,0,.3), 0 5px 7px rgba(0,0,0,.2), 0 7px 12px rgba(0,0,0,.25), 0 12px 15px rgba(0,0,0,.2), 0 25px 25px rgba(0,0,0,.15);
    }
}

@keyframes red-3d-pulse {
    0%, 100% { 
        transform: translateZ(0); 
        text-shadow: 0 0 5px rgba(239, 68, 68, 0.5), 0 1px 1px rgba(0,0,0,0.8), 0 2px 2px rgba(0,0,0,0.7);
    }
    50% { 
        transform: translateZ(15px); 
        text-shadow: 0 0 10px rgba(239, 68, 68, 0.7), 0 0 20px rgba(239, 68, 68, 0.4), 0 2px 2px rgba(0,0,0,0.8), 0 4px 4px rgba(0,0,0,0.7);
    }
}

@keyframes dot-pulse {
    0%, 100% { 
        transform: scale(1.3) translateZ(0); 
        text-shadow: 0 0 5px rgba(239, 68, 68, 0.5);
    }
    50% { 
        transform: scale(1.6) translateZ(5px); 
        text-shadow: 0 0 10px rgba(239, 68, 68, 0.7), 0 0 20px rgba(239, 68, 68, 0.4);
    }
}

.animate-breathe {
    animation: breathe-3d 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    transform-style: preserve-3d;
    perspective: 1000px;
}

.animate-red-3d {
    animation: red-3d-pulse 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    transform-style: preserve-3d;
    perspective: 1000px;
}

.animate-dot-pulse {
    animation: dot-pulse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    transform-style: preserve-3d;
}

.animation-delay-300 {
    animation-delay: 0.3s;
}

.animation-delay-600 {
    animation-delay: 0.6s;
}

.animation-delay-900 {
    animation-delay: 0.9s;
}
@keyframes tickets-banner {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

.animate-tickets-banner {
    animation: tickets-banner 40s linear infinite;
}

@keyframes buy-tickets-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.buy-tickets-button {
    animation: buy-tickets-pulse 2s ease-in-out infinite;
}

@keyframes tickets-banner-fast {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

.animate-tickets-banner-fast {
    animation: tickets-banner-fast 20s linear infinite;
}
`;

// Append styles to the document
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}