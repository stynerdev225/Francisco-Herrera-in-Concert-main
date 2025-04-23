"use client"

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

// Define the guest type
interface Guest {
    name: string;
    instrument: {
        en: string;
        es: string;
    };
    bio?: {
        en: string;
        es: string;
    };
    image?: string; // Optional image path
}

// Guest data with bio information
const guests: Guest[] = [
    {
        name: "Dr. Loco",
        instrument: {
            en: "Saxophone",
            es: "Saxofón"
        },
        bio: {
            en: "Dr. Loco is a master saxophonist with a unique style blending Latin Jazz, Tex-Mex, and traditional Mexican sounds. He has performed with Francisco Herrera for over a decade.",
            es: "Dr. Loco es un maestro del saxofón con un estilo único que mezcla Jazz Latino, Tex-Mex y sonidos tradicionales mexicanos. Ha actuado con Francisco Herrera durante más de una década."
        },
        image: "https://images.unsplash.com/photo-1623123776919-e5208e9b0b47?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Camilo Landau",
        instrument: {
            en: "Guitar",
            es: "Guitarra"
        },
        bio: {
            en: "Camilo Landau brings his virtuoso guitar skills to the concert, combining flamenco techniques with modern Latin styles. His collaborations with Francisco have produced some of their most memorable performances.",
            es: "Camilo Landau aporta sus virtuosas habilidades con la guitarra al concierto, combinando técnicas de flamenco con estilos latinos modernos. Sus colaboraciones con Francisco han producido algunas de sus actuaciones más memorables."
        },
        image: "https://images.unsplash.com/photo-1601084836737-bf6275e20b00?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Liliana Herrera",
        instrument: {
            en: "Vocals",
            es: "Voces"
        },
        bio: {
            en: "Liliana Herrera's powerful vocals bring depth and emotion to every performance. With a range that spans multiple octaves, she combines traditional folk singing with contemporary styles.",
            es: "Las poderosas voces de Liliana Herrera aportan profundidad y emoción a cada actuación. Con un rango que abarca múltiples octavas, combina el canto folclórico tradicional con estilos contemporáneos."
        },
        image: "https://images.unsplash.com/photo-1669181339677-0f646762be03?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Rafael Herrera",
        instrument: {
            en: "Drums",
            es: "Batería"
        },
        bio: {
            en: "Rafael Herrera's rhythmic precision on drums provides the heartbeat of the concert. With expertise in Latin, jazz, and rock percussion, he creates the perfect foundation for Francisco's music.",
            es: "La precisión rítmica de Rafael Herrera en la batería proporciona el latido del concierto. Con experiencia en percusión latina, jazz y rock, crea la base perfecta para la música de Francisco."
        },
        image: "https://images.unsplash.com/photo-1548895342-cbe56c360e2a?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Ayla Dávila",
        instrument: {
            en: "Bass",
            es: "Bajo"
        },
        bio: {
            en: "Ayla Dávila's bass playing combines groove and melody, adding depth to the ensemble. Her innovative approach to the instrument has influenced many in the Bay Area music scene.",
            es: "El bajo de Ayla Dávila combina ritmo y melodía, añadiendo profundidad al conjunto. Su enfoque innovador del instrumento ha influido en muchos en la escena musical del Área de la Bahía."
        },
        image: "https://images.unsplash.com/photo-1642946795468-3ca1a1e0068d?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Chris Trinidad",
        instrument: {
            en: "Keyboards",
            es: "Teclados"
        },
        bio: {
            en: "Chris Trinidad brings harmonic richness through his keyboard artistry. His background in classical and jazz piano allows him to create textured soundscapes that enhance Francisco's compositions.",
            es: "Chris Trinidad aporta riqueza armónica a través de su arte con los teclados. Su formación en piano clásico y jazz le permite crear paisajes sonoros texturizados que realzan las composiciones de Francisco."
        },
        image: "https://images.unsplash.com/photo-1720962158802-f80b1e855e03?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Pedro Gómez",
        instrument: {
            en: "Percussion",
            es: "Percusión"
        },
        bio: {
            en: "Pedro Gómez's percussion adds authentic Latin flavor to the performance. Specializing in congas, timbales, and traditional hand percussion, he brings the rhythms of Latin America to life.",
            es: "La percusión de Pedro Gómez añade un auténtico sabor latino a la actuación. Especializado en congas, timbales y percusión tradicional, da vida a los ritmos de América Latina."
        },
        image: "https://images.unsplash.com/photo-1628690131818-da160d91367e?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "María Volonté",
        instrument: {
            en: "Vocals & Guitar",
            es: "Voces y Guitarra"
        },
        bio: {
            en: "María Volonté brings her acclaimed vocal and guitar talents as a special guest. Her fusion of tango, jazz and Latin American roots creates a unique soundscape that perfectly complements Francisco's musical vision.",
            es: "María Volonté aporta su aclamado talento vocal y de guitarra como invitada especial. Su fusión de tango, jazz y raíces latinoamericanas crea un paisaje sonoro único que complementa perfectamente la visión musical de Francisco."
        },
        image: "https://images.unsplash.com/photo-1654124803203-8ef9f155d60e?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Música Latina",
        instrument: {
            en: "Traditional Instruments",
            es: "Instrumentos Tradicionales"
        },
        bio: {
            en: "The concert will showcase a variety of traditional Latin American instruments that form the backbone of our cultural heritage. These include the charango, cuatro, bongos, and other folk instruments that create our unique sound.",
            es: "El concierto exhibirá una variedad de instrumentos tradicionales latinoamericanos que forman la columna vertebral de nuestra herencia cultural. Estos incluyen el charango, cuatro, bongos y otros instrumentos folclóricos que crean nuestro sonido único."
        },
        image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop"
    }
];

export default function SpecialGuests() {
    const { t, language } = useLanguage();
    const [featuredGuestIndex, setFeaturedGuestIndex] = useState(0);
    const [currentWeek, setCurrentWeek] = useState(1);

    // We'll just use a fixed week number (always week 1) instead of calculating based on date
    useEffect(() => {
        // Always start with guest 0 (first guest) and week 1
        setFeaturedGuestIndex(0);
        setCurrentWeek(1);

        // Optional: Add manual controls for testing different weeks
        if (typeof window !== 'undefined') {
            // Check if there's a URL parameter for week
            const params = new URLSearchParams(window.location.search);
            const weekParam = params.get('week');
            if (weekParam) {
                const week = parseInt(weekParam);
                if (!isNaN(week) && week >= 1 && week <= guests.length) {
                    setCurrentWeek(week);
                    setFeaturedGuestIndex(week - 1);
                }
            }
        }
    }, []);

    // Add pulsating animation with useEffect
    useEffect(() => {
        if (typeof document !== 'undefined') {
            // Create style element for custom animation
            const styleEl = document.createElement('style');
            styleEl.innerHTML = `
                @keyframes customPulsate {
                    0% { transform: scale(1); text-shadow: 0 0 5px rgba(255, 255, 255, 0.7); box-shadow: 0 0 10px rgba(239, 68, 68, 0.5); border-radius: 1rem; }
                    50% { transform: scale(1.05); text-shadow: 0 0 15px rgba(255, 255, 255, 1); box-shadow: 0 0 20px rgba(239, 68, 68, 0.7), 0 0 30px rgba(239, 68, 68, 0.4); border-radius: 1.5rem; }
                    100% { transform: scale(1); text-shadow: 0 0 5px rgba(255, 255, 255, 0.7); box-shadow: 0 0 10px rgba(239, 68, 68, 0.5); border-radius: 1rem; }
                }
                
                .custom-pulse {
                    animation: customPulsate 2s infinite ease-in-out;
                }
                
                @keyframes bgPulsate {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                .custom-pulse-bg {
                    background-size: 200% 200%;
                    animation: bgPulsate 3s ease infinite, customPulsate 2s infinite ease-in-out;
                }
            `;
            document.head.appendChild(styleEl);

            // Cleanup
            return () => {
                document.head.removeChild(styleEl);
            };
        }
    }, []);

    // Get the featured guest
    const featuredGuest = guests[featuredGuestIndex];

    // Get the remaining guests (excluding the featured one)
    const remainingGuests = guests.filter((_, index) => index !== featuredGuestIndex);

    return (
        <div className="bg-gradient-to-r from-black via-red-900/10 to-black py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        <span className="text-red-500 mr-2">•</span>
                        {t("special.guests.title")}
                        <span className="text-red-500 ml-2">•</span>
                    </h2>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                        {t("special.guests.subtitle")}
                    </p>
                    <div className="h-1 bg-red-500 w-32 mx-auto mt-6"></div>
                </div>

                {/* Weekly Featured Guest Highlight */}
                <div className="mb-12">
                    <div className="text-center mb-6">
                        <h3 className="inline-block bg-gradient-to-r from-purple-900 via-red-900 to-purple-900 px-8 py-4 rounded-2xl border-2 border-red-500 text-2xl font-black text-white custom-pulse-bg shadow-xl">
                            <span className="relative">
                                {t("special.guests.featured")} • {t("special.guests.week")} {currentWeek}
                            </span>
                        </h3>
                    </div>

                    <div className="bg-gradient-to-br from-black/80 to-red-900/20 rounded-xl overflow-hidden border-2 border-red-500/30 shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                            {/* Featured Guest Image - Made exactly square */}
                            <div className="relative aspect-square w-full">
                                {featuredGuest.image ? (
                                    <Image
                                        src={featuredGuest.image}
                                        alt={featuredGuest.name}
                                        fill
                                        className="object-cover"
                                        unoptimized={true}
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 to-black flex items-center justify-center">
                                        <span className="text-8xl text-red-500">♫</span>
                                    </div>
                                )}
                                {/* Image overlay with guest name for mobile */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 md:hidden">
                                    <h3 className="text-2xl font-black text-white">{featuredGuest.name}</h3>
                                    <p className="text-red-400">{featuredGuest.instrument[language]}</p>
                                </div>
                            </div>

                            {/* Featured Guest Info - Better balanced layout */}
                            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-black/40">
                                {/* Desktop-only name and instrument */}
                                <div className="hidden md:block">
                                    <h3 className="text-4xl font-black text-white mb-2">{featuredGuest.name}</h3>
                                    <p className="text-2xl text-red-400 mb-6">{featuredGuest.instrument[language]}</p>
                                    <div className="h-1 bg-red-500/50 w-24 mb-6"></div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        {featuredGuest.bio?.[language]}
                                    </p>
                                    <p className="text-white/80 italic text-lg">
                                        {t("special.guests.joining")} Francisco Herrera {t("special.guests.forConcert")}
                                    </p>
                                </div>

                                {/* Week navigation controls */}
                                <div className="mt-8 flex justify-between">
                                    <button
                                        onClick={() => {
                                            const newIndex = (featuredGuestIndex - 1 + guests.length) % guests.length;
                                            setFeaturedGuestIndex(newIndex);
                                            setCurrentWeek(newIndex + 1);
                                        }}
                                        className="text-red-400 hover:text-red-300 transition-colors text-sm flex items-center"
                                    >
                                        ← {t("special.guests.previous")}
                                    </button>
                                    <button
                                        onClick={() => {
                                            const newIndex = (featuredGuestIndex + 1) % guests.length;
                                            setFeaturedGuestIndex(newIndex);
                                            setCurrentWeek(newIndex + 1);
                                        }}
                                        className="text-red-400 hover:text-red-300 transition-colors text-sm flex items-center"
                                    >
                                        {t("special.guests.next")} →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Guest Thumbnails */}
                <div>
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white">
                            {t("special.guests.others")}
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {remainingGuests.map((guest, index) => (
                            <div
                                key={index}
                                className={`bg-black/60 border ${guest.name === "Música Latina" ? "border-white" : "border-white/10"} rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-lg ${guest.name === "Música Latina" ? "hover:border-white/90" : "hover:border-red-500/30"} cursor-pointer`}
                                onClick={() => {
                                    const guestIndex = guests.findIndex(g => g.name === guest.name);
                                    if (guestIndex !== -1) {
                                        setFeaturedGuestIndex(guestIndex);
                                        setCurrentWeek(guestIndex + 1);
                                    }
                                }}
                            >
                                <div className="relative aspect-square w-full">
                                    {guest.image ? (
                                        <>
                                            <Image
                                                src={guest.image}
                                                alt={guest.name}
                                                fill
                                                className={`object-cover ${guest.name === "Música Latina" ? "opacity-30 blur-[1px]" : "opacity-70"} hover:opacity-100 transition-opacity rounded-lg`}
                                                unoptimized={true}
                                            />

                                            {/* Special overlay for Música Latina card */}
                                            {guest.name === "Música Latina" && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 z-10 rounded-lg bg-gradient-to-br from-purple-900/50 via-red-900/60 to-black/70">
                                                    <h3 className="bg-black px-4 py-2 rounded-md text-lg sm:text-xl font-black text-red-400 text-center mb-3 border border-white/20 shadow-lg underline decoration-2 underline-offset-4 transform hover:scale-105 transition-all duration-300 hover:shadow-red-500/30 hover:shadow-lg" style={{ textShadow: '2px 2px 0 #000, 0 2px 5px rgba(0,0,0,0.9), 0 4px 8px rgba(0,0,0,0.5)' }}>
                                                        MÚSICA LATINA
                                                    </h3>
                                                    <p className="text-white text-xs sm:text-sm font-bold text-center drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                                                        {guest.instrument[language]}
                                                    </p>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                                            <span className="text-3xl text-red-500/70">♫</span>
                                        </div>
                                    )}
                                </div>

                                {/* Show card text info only for non-música latina cards */}
                                {guest.name !== "Música Latina" && (
                                    <div className="p-3 text-center">
                                        <h3 className="text-sm font-bold text-white">{guest.name}</h3>
                                        <p className="text-xs text-red-400/80">{guest.instrument[language]}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 