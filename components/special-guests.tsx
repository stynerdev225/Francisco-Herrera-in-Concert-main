"use client"

import React, { useEffect, useState, useRef } from 'react';
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
            en: "San Antonio, Texas native and San Francisco, California resident, Jose Bernardo Cuellar, Ph.D. is SFSU Professor Emeritus, and leader of Dr. Loco's Rockin' Jalapeño Band. His more recent awards and honors include: The Hrdy Curatorial Fellowship at Harvard University's Peabody Museum of Archaeology & Ethnology (2012), The San Francisco Mayor's Latino Heritage Arts Award (2014), the Loyal Order of Outstanding and Accomplished Texas Musicians Induction (2016), and University of California at Riverside's Radio Aztlan Lifetime-Achievement Award (2019).",
            es: "Originario de San Antonio, Texas y residente de San Francisco, California, José Bernardo Cuéllar, Ph.D. es Profesor Emérito de SFSU y líder de Dr. Loco's Rockin' Jalapeño Band. Entre sus reconocimientos recientes se encuentran: La Beca Curatorial Hrdy del Museo Peabody de Arqueología y Etnología de la Universidad de Harvard (2012), El Premio a las Artes del Patrimonio Latino del Alcalde de San Francisco (2014), la Inducción a la Orden Leal de Músicos Texanos Sobresalientes y Consumados (2016), y el Premio de Radio Aztlán a la Trayectoria de la Universidad de California en Riverside (2019)."
        },
        image: "https://pub-28e558b74ea64a0781531927a8b49e0e.r2.dev/Drloco.JPG"
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
            en: "Liliana Herrera is a beloved singer-songwriter, composer, and storyteller whose voice carries the spirit of resilience and deep cultural memory. For over three decades, she has graced stages with songs that honor our histories. From her acclaimed work Golondrina to leading San Francisco's first Culture & Language Justice Symposium, Liliana brings heart, artistry, and vision to everything she touches.",
            es: "Liliana Herrera es una querida cantautora, compositora y narradora cuya voz encarna el espíritu de la resiliencia y la memoria cultural profunda. Durante más de tres décadas, ha iluminado escenarios con canciones que honran nuestras historias. Desde su aclamada obra Golondrina hasta la organización del primer Simposio sobre Cultura y Justicia Lingüística en San Francisco, Liliana aporta corazón y visión a todo lo que toca."
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
            en: "Filipino-Canadian and San Francisco Bay Area-based musician, teacher, and learner Chris Trinidad has fallen into the place where everything is music. Originally from Vancouver, British Columbia, Canada, his relationship with music grew through exploring various instruments beginning with the voice, then the piano, followed by the bass guitar, and finally the drum set with little detours in the world of percussion and forays with the guitar. Chris's formal education includes undergraduate training in Jazz Studies and Secondary Education, graduate study in the fields of Philosophy and Sociology of Music Education and Theological and Liturgical Studies, and doctoral work in Educational and Interdisciplinary Leadership. His compositions take inspiration from jazz musicians such as Ralph Towner, Pat Metheny, Bill Evans, Jack DeJohnette, Brad Turner, Chris Gestrin, and Chris Tarry as well as disparate genres including Cuban Timba, Original Pilipino Music, British Progressive Rock, and Gregorian Chant. All of these seemingly disparate disciplines, inspirations, and interests help to inform the music that he makes. He has discerned that the core purpose of his music is to explore the intersections of his identity and upbringing, while combining these into musical conversations with his current experiences and curiosities. He currently divides his time between creating music, developing high school students into compassionate human beings, and working on defeating his addiction to improvising excessively in the saddest of all keys ... D minor.",
            es: "Músico, profesor y aprendiz filipino-canadiense radicado en el Área de la Bahía de San Francisco, Chris Trinidad ha encontrado su lugar donde todo es música. Originario de Vancouver, Columbia Británica, Canadá, su relación con la música creció explorando varios instrumentos comenzando con la voz, luego el piano, seguido del bajo, y finalmente la batería, con pequeñas incursiones en el mundo de la percusión y la guitarra. La educación formal de Chris incluye formación en Estudios de Jazz y Educación Secundaria, estudios de posgrado en Filosofía y Sociología de la Educación Musical y Estudios Teológicos y Litúrgicos, y trabajo doctoral en Liderazgo Educativo e Interdisciplinario. Sus composiciones se inspiran en músicos de jazz como Ralph Towner, Pat Metheny, Bill Evans, Jack DeJohnette, Brad Turner, Chris Gestrin y Chris Tarry, así como en géneros dispares como la Timba Cubana, la Música Original Filipina, el Rock Progresivo Británico y el Canto Gregoriano. Todas estas disciplinas, inspiraciones e intereses aparentemente dispares ayudan a dar forma a la música que crea. Ha discernido que el propósito central de su música es explorar las intersecciones de su identidad y crianza, combinándolas en conversaciones musicales con sus experiencias y curiosidades actuales. Actualmente divide su tiempo entre crear música, desarrollar a estudiantes de secundaria como seres humanos compasivos, y trabajar en superar su adicción a improvisar excesivamente en la más triste de todas las tonalidades... Re menor."
        },
        image: "https://pub-28e558b74ea64a0781531927a8b49e0e.r2.dev/ChrisTrinidad.jpeg"
    },
    {
        name: "Pedro Gómez",
        instrument: {
            en: "Percussion",
            es: "Percusión"
        },
        bio: {
            en: "Pedro Gomez was introduced to the drum at age 13 during a neighborhood rumba circle in San Francisco's Mission district. His connection to music has always come from a place of community, rooted in the African/Indigenous diaspora. Studying from masters like, Jorge Alabe, Gamo da Paz, Giovanni Hidalgo, John Santos, Malonga Casquelourd, Bongo Sidibe, Lalo Izquierdo, Baba Duru to name a few, has given Pedro a wealth of knowlegede in music of the Afro Diaspora. As a musician Pedro has recorded and played with artist such as Jaguar Wright, Eric Roberson, Al B Sure, Bayonics, Bebe Zahara, and Olodum. He uses thoses experiences to help him currently as a musical director in various projects. With over 25 years of teaching experience in the U.S. and abroad Pedro is always striving to learn and grow. His drive as an artist and educator stems from the belief that musical expression is a form of healing and power. Pedro Gomez is committed to working hard and passing on traditions that uplift, bring joy and a sense of worth to young people and their communities.",
            es: "Pedro Gómez fue introducido al tambor a los 13 años durante un círculo de rumba en el barrio de la Misión en San Francisco. Su conexión con la música siempre ha surgido de la comunidad, arraigada en la diáspora africana e indígena. Estudiar con maestros como Jorge Alabe, Gamo da Paz, Giovanni Hidalgo, John Santos, Malonga Casquelourd, Bongo Sidibe, Lalo Izquierdo y Baba Duru, entre otros, le ha dado a Pedro un amplio conocimiento en música de la diáspora afro. Como músico, Pedro ha grabado y tocado con artistas como Jaguar Wright, Eric Roberson, Al B Sure, Bayonics, Bebe Zahara y Olodum. Utiliza estas experiencias para su labor actual como director musical en varios proyectos. Con más de 25 años de experiencia docente en EE.UU. y en el extranjero, Pedro siempre busca aprender y crecer. Su impulso como artista y educador proviene de la creencia de que la expresión musical es una forma de sanación y poder. Pedro Gómez está comprometido a trabajar duro y transmitir tradiciones que eleven, traigan alegría y un sentido de valor a los jóvenes y sus comunidades."
        },
        image: "https://pub-28e558b74ea64a0781531927a8b49e0e.r2.dev/Pedro-bio.jpeg"
    },
    {
        name: "Roberto Corona",
        instrument: {
            en: "Cajón",
            es: "Cajón"
        },
        bio: {
            en: "Roberto Corona brings his masterful Cajón playing to the concert. His rhythmic expertise and deep understanding of Afro-Peruvian techniques create a powerful percussive foundation that perfectly complements Francisco's musical vision.",
            es: "Roberto Corona aporta su magistral interpretación del Cajón al concierto. Su experiencia rítmica y profundo conocimiento de las técnicas afroperuanas crean una poderosa base percusiva que complementa perfectamente la visión musical de Francisco."
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

// GuestCard component for better UI organization
const GuestCard = ({
    guest,
    onClick,
    language,
    lilianaLang,
    setLilianaLang,
    chrisLang,
    setChrisLang
}: {
    guest: Guest,
    onClick: () => void,
    language: string,
    lilianaLang: 'en' | 'es',
    setLilianaLang: (lang: 'en' | 'es') => void,
    chrisLang: 'en' | 'es',
    setChrisLang: (lang: 'en' | 'es') => void
}) => {
    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent default behavior and stop propagation
        e.preventDefault();
        e.stopPropagation();

        // Just call the onClick handler provided by parent component
        onClick();
    };

    return (
        <div
            className={`bg-black/60 border ${guest.name === "Música Latina" ? "border-white" : "border-white/10"} 
                      rounded-lg overflow-hidden transform hover:scale-105 
                      transition-all duration-300 shadow-lg 
                      ${guest.name === "Música Latina" ? "hover:border-white/90" : "hover:border-red-500/50"} 
                      cursor-pointer hover:shadow-red-500/20 hover:shadow-lg active:scale-95 active:bg-red-900/20 relative`}
            onClick={handleCardClick}
            onMouseDown={handleCardClick}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            {/* Clickable overlay - appears on hover */}
            <div className="absolute inset-0 bg-red-900/60 backdrop-blur-sm z-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                onClick={handleCardClick}>
                <div className="text-white text-center font-bold">
                    <div className="text-sm mb-1">CLICK TO VIEW</div>
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="relative aspect-square w-full">
                {guest.image ? (
                    <>
                        <div className="absolute inset-0 z-10 cursor-pointer" onClick={handleCardClick}></div>
                        <div className="relative w-full h-full overflow-hidden rounded-lg">
                            <Image
                                src={guest.image}
                                alt={guest.name}
                                fill
                                className={`${guest.name === "Música Latina" ? "opacity-30 blur-[1px]" : "opacity-70"} 
                                      hover:opacity-100 transition-opacity rounded-lg 
                                      ${guest.name === "Pedro Gómez" ? "object-contain" : "object-cover"}`}
                                unoptimized={true}
                                style={guest.name === "Pedro Gómez" ? { objectPosition: 'center 25%' } : {}}
                            />
                        </div>

                        {/* Special overlay for Música Latina card */}
                        {guest.name === "Música Latina" && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-2 z-10 rounded-lg bg-gradient-to-br from-purple-900/50 via-red-900/60 to-black/70">
                                <h3 className="bg-black px-4 py-2 rounded-md text-lg sm:text-xl font-black text-red-400 text-center mb-3 border border-white/20 shadow-lg underline decoration-2 underline-offset-4 transform hover:scale-105 transition-all duration-300 hover:shadow-red-500/30 hover:shadow-lg" style={{ textShadow: '2px 2px 0 #000, 0 2px 5px rgba(0,0,0,0.9), 0 4px 8px rgba(0,0,0,0.5)' }}>
                                    MÚSICA LATINA
                                </h3>
                                <p className="text-white text-xs sm:text-sm font-bold text-center drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                                    {guest.instrument[language as keyof typeof guest.instrument]}
                                </p>

                                {/* Click indicator */}
                                <div className="mt-3 bg-red-500/50 px-3 py-1 rounded-full text-white text-xs animate-pulse">
                                    Click for details
                                </div>
                            </div>
                        )}

                        {/* Language toggle for Liliana Herrera's card */}
                        {guest.name === "Liliana Herrera" && (
                            <div className="absolute top-2 right-2 z-50">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLilianaLang(lilianaLang === 'en' ? 'es' : 'en');
                                    }}
                                    className="bg-black/70 hover:bg-red-900/70 text-white rounded-md px-2 py-1 text-xs shadow-lg border border-white/20 transition-all duration-200"
                                    title={lilianaLang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
                                >
                                    {lilianaLang === 'en' ? 'Español' : 'English'}
                                </button>
                            </div>
                        )}

                        {/* Language toggle for Chris Trinidad's card */}
                        {guest.name === "Chris Trinidad" && (
                            <div className="absolute top-2 right-2 z-50">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setChrisLang(chrisLang === 'en' ? 'es' : 'en');
                                    }}
                                    className="bg-black/70 hover:bg-red-900/70 text-white rounded-md px-2 py-1 text-xs shadow-lg border border-white/20 transition-all duration-200"
                                    title={chrisLang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
                                >
                                    {chrisLang === 'en' ? 'Español' : 'English'}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                        <span className="text-3xl text-red-500/70">♫</span>
                    </div>
                )}
            </div>

            {/* Show card text info with special handling for Liliana */}
            {guest.name !== "Música Latina" && (
                <div className="p-3 text-center">
                    <h3 className="text-sm font-bold text-white">{guest.name}</h3>
                    {guest.name === "Liliana Herrera" ? (
                        <div className="flex flex-col items-center">
                            <p className="text-xs text-red-400/80">
                                {guest.instrument[lilianaLang]}
                            </p>
                        </div>
                    ) : guest.name === "Chris Trinidad" ? (
                        <div className="flex flex-col items-center">
                            <p className="text-xs text-red-400/80">
                                {guest.instrument[chrisLang]}
                            </p>
                        </div>
                    ) : (
                        <p className="text-xs text-red-400/80">{guest.instrument[language as keyof typeof guest.instrument]}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default function SpecialGuests() {
    const { t, language } = useLanguage();
    const [featuredGuestIndex, setFeaturedGuestIndex] = useState(0);
    const [currentWeek, setCurrentWeek] = useState(1);
    const [lilianaLang, setLilianaLang] = useState<'en' | 'es'>('en');
    const [chrisLang, setChrisLang] = useState<'en' | 'es'>('en'); // Add toggle state for Chris's card
    const sectionRef = useRef<HTMLDivElement>(null); // Add ref for scrolling
    const titleRef = useRef<HTMLHeadingElement>(null); // New ref for the section title
    const [clickIndicator, setClickIndicator] = useState('');
    const [imagesPreloaded, setImagesPreloaded] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [lastFeaturedGuest, setLastFeaturedGuest] = useState<Guest | null>(null);

    // Calculate the current featured guest
    const featuredGuest = guests[featuredGuestIndex];
    // Calculate remaining guests (all guests except the featured one)
    const remainingGuests = guests.filter((_, index) => index !== featuredGuestIndex);

    // Fix TypeScript errors with image preloading
    useEffect(() => {
        // Preload all guest images
        guests.forEach(guest => {
            if (guest.image) {
                // Using the HTML image element directly with proper type
                const img = document.createElement('img');
                img.src = guest.image;
                img.style.display = 'none';
                img.alt = guest.name;
                document.body.appendChild(img);

                // Remove the element after loading to prevent memory leaks
                img.onload = () => {
                    document.body.removeChild(img);
                    console.log(`Preloaded image for ${guest.name}`);
                };
            }
        });

        // Mark images as preloaded immediately
        setImagesPreloaded(true);
    }, []);

    // Add custom scrollbar and animation styles
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const styleEl = document.createElement('style');
            styleEl.innerHTML = `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(220, 38, 38, 0.5);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(220, 38, 38, 0.8);
                }
                
                /* Fix for card and animation smoothness */
                .transition-all, .transform, .hover\\:scale-105, .active\\:scale-95 {
                    backface-visibility: hidden !important;
                    transform: translateZ(0) !important;
                    -webkit-font-smoothing: subpixel-antialiased !important;
                    will-change: transform !important;
                    perspective: 1000 !important;
                }
            `;
            document.head.appendChild(styleEl);
            return () => {
                document.head.removeChild(styleEl);
            };
        }
    }, []);

    // Function to handle guest change with smooth transitions
    const changeGuest = (newIndex: number) => {
        if (isTransitioning) return;
        console.log('FORCE CHANGE GUEST with index:', newIndex);

        // Start transition
        setIsTransitioning(true);
        setLastFeaturedGuest(featuredGuest);

        // Update state with a slight delay to allow for transition
        setTimeout(() => {
            setFeaturedGuestIndex(newIndex);
            setCurrentWeek(newIndex + 1);

            // End transition after the new content is loaded
            setTimeout(() => {
                setIsTransitioning(false);
                setLastFeaturedGuest(null);
            }, 300);

            // Optional: Scroll to section
            if (titleRef.current) {
                titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                console.log("Scrolled using titleRef");
            }

            // Show visual feedback
            setClickIndicator(`Changed to: ${guests[newIndex].name}`);
            setTimeout(() => setClickIndicator(''), 2000);
        }, 300);
    };

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
                    setFeaturedGuestIndex(week - 1);
                    setCurrentWeek(week);
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

    // Function to handle bio display - show bio in selected language for special guests
    const displayBio = (guest: Guest) => {
        if (guest.name === "Liliana Herrera") {
            return (
                <div className="relative">
                    <p className="text-gray-300 text-lg leading-relaxed">
                        {guest.bio?.[lilianaLang]}
                    </p>
                    <div className="mt-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setLilianaLang(lilianaLang === 'en' ? 'es' : 'en');
                            }}
                            className="bg-red-500/30 hover:bg-red-500/50 text-white px-3 py-1 rounded-md text-sm transition-all duration-200"
                        >
                            {lilianaLang === 'en' ? 'Ver en Español' : 'View in English'}
                        </button>
                    </div>
                </div>
            );
        } else if (guest.name === "Chris Trinidad") {
            return (
                <div className="relative">
                    <p className="text-gray-300 text-lg leading-relaxed">
                        {guest.bio?.[chrisLang]}
                    </p>
                    <div className="mt-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setChrisLang(chrisLang === 'en' ? 'es' : 'en');
                            }}
                            className="bg-red-500/30 hover:bg-red-500/50 text-white px-3 py-1 rounded-md text-sm transition-all duration-200"
                        >
                            {chrisLang === 'en' ? 'Ver en Español' : 'View in English'}
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <p className="text-gray-300 text-lg leading-relaxed">
                    {guest.bio?.[language]}
                </p>
            );
        }
    };

    // Function to display instrument in the selected language
    const displayInstrument = (guest: Guest) => {
        if (guest.name === "Liliana Herrera") {
            return (
                <div className="flex flex-col gap-1">
                    <p className="text-2xl text-red-400">{guest.instrument[lilianaLang]}</p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setLilianaLang(lilianaLang === 'en' ? 'es' : 'en');
                        }}
                        className="text-sm text-white/60 hover:text-white mt-1"
                    >
                        {lilianaLang === 'en' ? 'Ver en Español' : 'View in English'}
                    </button>
                </div>
            );
        } else if (guest.name === "Chris Trinidad") {
            return (
                <div className="flex flex-col gap-1">
                    <p className="text-2xl text-red-400">{guest.instrument[chrisLang]}</p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setChrisLang(chrisLang === 'en' ? 'es' : 'en');
                        }}
                        className="text-sm text-white/60 hover:text-white mt-1"
                    >
                        {chrisLang === 'en' ? 'Ver en Español' : 'View in English'}
                    </button>
                </div>
            );
        } else {
            return <p className="text-2xl text-red-400 mb-6">{guest.instrument[language]}</p>;
        }
    };

    // Add transition styles
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const styleEl = document.createElement('style');
            styleEl.innerHTML = `
                /* Existing styles */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(220, 38, 38, 0.5);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(220, 38, 38, 0.8);
                }
                
                /* Fix for card and animation smoothness */
                .transition-all, .transform, .hover\\:scale-105, .active\\:scale-95 {
                    backface-visibility: hidden !important;
                    transform: translateZ(0) !important;
                    -webkit-font-smoothing: subpixel-antialiased !important;
                    will-change: transform !important;
                    perspective: 1000 !important;
                }
                
                /* Fade transition for guest images */
                .guest-fade-enter {
                    opacity: 0;
                }
                .guest-fade-enter-active {
                    opacity: 1;
                    transition: opacity 300ms ease-in;
                }
                .guest-fade-exit {
                    opacity: 1;
                }
                .guest-fade-exit-active {
                    opacity: 0;
                    transition: opacity 300ms ease-out;
                }
                
                /* Smooth thumbnail click transition */
                .featured-guest-container {
                    position: relative;
                }
                .featured-guest-image {
                    opacity: 0;
                    animation: fadeIn 0.5s forwards;
                }
                .featured-guest-image.exiting {
                    animation: fadeOut 0.3s forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(styleEl);
            return () => {
                document.head.removeChild(styleEl);
            };
        }
    }, []);

    return (
        <div className="bg-gradient-to-r from-black via-red-900/10 to-black py-16" ref={sectionRef}>
            <div className="container mx-auto px-4">
                {/* Hidden image preloader - ensures all images are loaded instantly */}
                <div style={{ display: 'none' }}>
                    {guests.map((guest) => (
                        guest.image && <img key={`preload-${guest.name}`} src={guest.image} alt="Preload" />
                    ))}
                </div>

                {clickIndicator && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
                        {clickIndicator}
                    </div>
                )}
                <div className="text-center mb-12">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl font-black text-white uppercase mb-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                        id="special-guests-title"
                    >
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

                    <div className="bg-gradient-to-br from-black/80 to-red-900/20 rounded-xl overflow-hidden border-2 border-red-500/30 shadow-2xl relative">
                        {/* Featured badge */}
                        <div className="absolute top-0 left-0 bg-red-500 text-white py-2 px-6 z-10 rounded-br-xl shadow-lg transform rotate-0 font-bold">
                            {t("special.guests.featured")}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                            {/* Featured Guest Image - with smooth transition */}
                            <div className="relative h-[450px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-2xl border-4 border-red-500/30 bg-black/70 shadow-lg featured-guest-container">
                                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-red-900/20 z-10 rounded-xl pointer-events-none"></div>

                                {/* Last featured guest (for transition) */}
                                {isTransitioning && lastFeaturedGuest && lastFeaturedGuest.image && (
                                    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-xl z-5">
                                        <Image
                                            key={`last-featured-${lastFeaturedGuest.name}`}
                                            src={lastFeaturedGuest.image}
                                            alt={lastFeaturedGuest.name}
                                            fill
                                            className={`${lastFeaturedGuest.name === "Pedro Gómez" ? "object-contain" : "object-cover"} featured-guest-image exiting`}
                                            unoptimized={true}
                                            priority={true}
                                            loading="eager"
                                            style={{
                                                objectPosition: lastFeaturedGuest.name === "Pedro Gómez" ? 'center 25%' : 'center'
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Current featured guest */}
                                {featuredGuest.image ? (
                                    <div className="relative w-full h-full overflow-hidden rounded-xl">
                                        <Image
                                            key={`featured-image-${featuredGuest.name}`}
                                            src={featuredGuest.image}
                                            alt={featuredGuest.name}
                                            fill
                                            className={`${featuredGuest.name === "Pedro Gómez" ? "object-contain" : "object-cover"} featured-guest-image`}
                                            unoptimized={true}
                                            priority={true}
                                            loading="eager"
                                            style={{
                                                objectPosition: featuredGuest.name === "Pedro Gómez" ? 'center 25%' : 'center'
                                            }}
                                        />
                                    </div>
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
                            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-black/40 h-[450px] md:h-[500px] lg:h-[550px] overflow-y-auto">
                                {/* Desktop-only name and instrument */}
                                <div className="hidden md:block">
                                    <h3 className="text-4xl font-black text-white mb-2">{featuredGuest.name}</h3>
                                    {displayInstrument(featuredGuest)}
                                    <div className="h-1 bg-red-500/50 w-24 mb-6"></div>
                                </div>

                                <div className="space-y-4">
                                    <div className="h-[200px] md:h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                                        {displayBio(featuredGuest)}
                                    </div>
                                    <p className="text-white/80 italic text-lg">
                                        {t("special.guests.joining")} Francisco Herrera {t("special.guests.forConcert")}
                                    </p>
                                </div>

                                {/* Enhanced week navigation controls */}
                                <div className="mt-8 flex justify-between">
                                    <button
                                        onClick={() => {
                                            const newIndex = (featuredGuestIndex - 1 + guests.length) % guests.length;
                                            console.log("PREVIOUS button clicked - changing to index:", newIndex);
                                            changeGuest(newIndex);
                                        }}
                                        onMouseDown={() => {
                                            const newIndex = (featuredGuestIndex - 1 + guests.length) % guests.length;
                                            console.log("PREVIOUS button mouse down - changing to index:", newIndex);
                                            changeGuest(newIndex);
                                        }}
                                        className="bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-white transition-colors px-4 py-2 rounded-lg flex items-center space-x-2 border border-red-500/30 hover:border-red-500/60 group relative"
                                        aria-label={t("special.guests.previous")}
                                    >
                                        <span className="transform transition-transform group-hover:-translate-x-1">←</span>
                                        <span>{t("special.guests.previous")}</span>

                                        {/* Preview indicator - shows on hover */}
                                        <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 rounded p-1 shadow-lg">
                                            <div className="text-xs text-white">{guests[(featuredGuestIndex - 1 + guests.length) % guests.length].name}</div>
                                        </div>
                                    </button>

                                    <div className="flex items-center text-white/30">
                                        <span className="text-xs">
                                            {currentWeek} / {guests.length}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => {
                                            const newIndex = (featuredGuestIndex + 1) % guests.length;
                                            console.log("NEXT button clicked - changing to index:", newIndex);
                                            changeGuest(newIndex);
                                        }}
                                        onMouseDown={() => {
                                            const newIndex = (featuredGuestIndex + 1) % guests.length;
                                            console.log("NEXT button mouse down - changing to index:", newIndex);
                                            changeGuest(newIndex);
                                        }}
                                        className="bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-white transition-colors px-4 py-2 rounded-lg flex items-center space-x-2 border border-red-500/30 hover:border-red-500/60 group relative"
                                        aria-label={t("special.guests.next")}
                                    >
                                        <span>{t("special.guests.next")}</span>
                                        <span className="transform transition-transform group-hover:translate-x-1">→</span>

                                        {/* Preview indicator - shows on hover */}
                                        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 rounded p-1 shadow-lg">
                                            <div className="text-xs text-white">{guests[(featuredGuestIndex + 1) % guests.length].name}</div>
                                        </div>
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
                        {remainingGuests.map((guest, index) => {
                            const guestIndex = guests.findIndex(g => g.name === guest.name);
                            return (
                                <div
                                    key={index}
                                    className={`cursor-pointer transform transition-all duration-300 ${isTransitioning ? '' : 'hover:scale-105'
                                        }`}
                                >
                                    <GuestCard
                                        guest={guest}
                                        onClick={() => {
                                            if (!isTransitioning) {
                                                console.log(`GuestCard onClick callback for ${guest.name}`);
                                                changeGuest(guestIndex);
                                            }
                                        }}
                                        language={language}
                                        lilianaLang={lilianaLang}
                                        setLilianaLang={setLilianaLang}
                                        chrisLang={chrisLang}
                                        setChrisLang={setChrisLang}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}