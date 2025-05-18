"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { Play, Pause, Info, Download, ExternalLink, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import MusicHeader from "./music-header"
import confetti from 'canvas-confetti'

// Define types for song data
interface Song {
    id: number
    title: string
    duration: string
    price: string | null
    freeDownload: boolean
    hasInfo: boolean
    hasLyrics: boolean
    previewUrl: string
}

interface Album {
    id: string
    title: string
    artist: string
    cover: string
    price: string
    description: {
        en: string
        es: string
    }
    songs: Song[]
}

// Album data
const albums: Album[] = [
    {
        id: "honor-migrante",
        title: "HONOR MIGRANTE",
        artist: "Francisco J Herrera",
        cover: "/images/francisco-concert-poster.png",
        price: "$10.00",
        description: {
            en: "Life, Joys, Struggle, Triumphs, Dignity of Migrant People in Song. Enjoy it, share it with friends and family.",
            es: "La vida, los gozos, luchas, triunfos, Dignidad del pueblo migrante en Canción. Disfrutala, compartela con amigos y familia."
        },
        songs: [
            {
                id: 1,
                title: "Nuevo Sol",
                duration: "2:24",
                price: null,
                freeDownload: true,
                hasInfo: true,
                hasLyrics: false,
                previewUrl: "https://franciscoherreramusic.com/tracks/direct/1216082597/225321.mp3"
            },
            {
                id: 2,
                title: "Saber ante la Migra",
                duration: "3:33",
                price: null,
                freeDownload: true,
                hasInfo: true,
                hasLyrics: false,
                previewUrl: "https://franciscoherreramusic.com/tracks/direct/4021522454/233042.mp3"
            },
            {
                id: 3,
                title: "Pueblo Pueblo",
                duration: "3:21",
                price: "$0.99",
                freeDownload: false,
                hasInfo: true,
                hasLyrics: false,
                previewUrl: "https://franciscoherreramusic.com/track/218318/pueblo-pueblo"
            },
            {
                id: 4,
                title: "Palomita de la Ciudad",
                duration: "3:15",
                price: "$0.99",
                freeDownload: false,
                hasInfo: false,
                hasLyrics: true,
                previewUrl: "https://franciscoherreramusic.com/track/1513480/palomita-de-la-ciudad"
            },
            {
                id: 5,
                title: "Yo Te Amaré",
                duration: "3:41",
                price: "$0.99",
                freeDownload: false,
                hasInfo: false,
                hasLyrics: true,
                previewUrl: "https://franciscoherreramusic.com/track/1513484/yo-te-amare"
            },
            {
                id: 6,
                title: "Pelotita Blanca",
                duration: "3:32",
                price: "$0.99",
                freeDownload: false,
                hasInfo: false,
                hasLyrics: false,
                previewUrl: "https://franciscoherreramusic.com/track/1513486/pelotita-blanca"
            },
            {
                id: 7,
                title: "Carrito de Fruta",
                duration: "2:51",
                price: "$0.99",
                freeDownload: false,
                hasInfo: true,
                hasLyrics: false,
                previewUrl: "https://franciscoherreramusic.com/track/1513494/carrito-de-fruta"
            },
            {
                id: 8,
                title: "Mujeres de la Maquila",
                duration: "4:19",
                price: "$0.99",
                freeDownload: false,
                hasInfo: false,
                hasLyrics: false,
                previewUrl: "https://franciscoherreramusic.com/track/1513487/mujeres-de-la-maquila"
            },
            {
                id: 9,
                title: "Trabajo en el Hotel",
                duration: "3:22",
                price: "$0.99",
                freeDownload: false,
                hasInfo: false,
                hasLyrics: false,
                previewUrl: "https://franciscoherreramusic.com/track/1513488/trabajo-en-el-hotel"
            },
            {
                id: 10,
                title: "Amor Sin Papeles",
                duration: "3:46",
                price: "$0.99",
                freeDownload: false,
                hasInfo: true,
                hasLyrics: false,
                previewUrl: "https://franciscoherreramusic.com/track/694325/amor-sin-papeles"
            },
            {
                id: 11,
                title: "Si La Migra Viene",
                duration: "3:25",
                price: "$0.99",
                freeDownload: false,
                hasInfo: false,
                hasLyrics: false,
                previewUrl: "https://franciscoherreramusic.com/track/1513489/si-la-migra-viene"
            },
            {
                id: 12,
                title: "Se Vende Todo",
                duration: "6:48",
                price: "$0.99",
                freeDownload: false,
                hasInfo: false,
                hasLyrics: false,
                previewUrl: "https://franciscoherreramusic.com/track/1513490/se-vende-todo"
            }
        ]
    }
]

// Add styles for the rotating banner if not already present
const styles = `
@keyframes tickets-banner {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

.animate-tickets-banner {
    animation: tickets-banner 40s linear infinite;
}
`;

// Append styles to the document
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}

export default function MusicSection() {
    const { t, language } = useLanguage()
    const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
    const [expandedAlbum, setExpandedAlbum] = useState<string>("honor-migrante") // Default expanded album
    const [audioError, setAudioError] = useState<string | null>(null)
    const audioRefs = React.useRef<{ [key: number]: HTMLAudioElement | null }>({})
    const confettiTriggeredRef = useRef(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Audio URLs - Using local MP4 files
    const [songUrls, setSongUrls] = useState<{ [key: number]: string }>({
        1: "/music/snippets/nuevo-sol.mp4",
        2: "/music/snippets/saber-ante-la-migra.mp4"
    });

    // Function to handle play button click
    const handlePlay = (songId: number) => {
        try {
            // If clicking the currently playing song, pause it
            if (currentlyPlaying === songId) {
                if (audioRefs.current[songId]) {
                    audioRefs.current[songId]?.pause();
                }
                setCurrentlyPlaying(null);
                return;
            }

            // If another song is playing, pause it first
            if (currentlyPlaying !== null && audioRefs.current[currentlyPlaying]) {
                audioRefs.current[currentlyPlaying]?.pause();
            }

            // Play the new song
            const audioElement = audioRefs.current[songId];
            if (audioElement) {
                // Make sure the audio element is loaded before playing
                audioElement.load();

                const playPromise = audioElement.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setCurrentlyPlaying(songId);
                            setAudioError(null);
                            triggerConfetti(); // Trigger confetti effect
                        })
                        .catch(error => {
                            console.error("Error playing audio:", error);
                            setAudioError(`Could not play "${albums[0].songs.find(s => s.id === songId)?.title}". Try clicking again.`);
                        });
                }
            }
        } catch (error) {
            console.error("Play error:", error);
            setAudioError("An error occurred while playing the audio.");
        }
    };

    // Handle clicking on songs that redirect to external sites
    const handleSongClick = (song: Song) => {
        // Only allow direct playing of the free songs
        if (song.id === 1 || song.id === 2) {
            handlePlay(song.id);
        } else {
            // For other songs, redirect to the provided URL
            window.open(song.previewUrl, "_blank");
            triggerConfetti(); // Trigger confetti on any song interaction
        }
    }

    // Handle audio ending
    const handleAudioEnded = (songId: number) => {
        if (currentlyPlaying === songId) {
            setCurrentlyPlaying(null);
        }
    };

    // Handle audio errors
    const handleAudioError = (songId: number, e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
        console.error(`Audio error for song ${songId}:`, e);
        const targetSong = albums[0].songs.find(s => s.id === songId);
        setAudioError(`Could not load audio for "${targetSong?.title}". Please try again.`);

        if (currentlyPlaying === songId) {
            setCurrentlyPlaying(null);
        }
    };

    // Mock function for buying a song
    const handleBuySong = (song: Song) => {
        window.open(song.previewUrl, "_blank");
        triggerConfetti(); // Trigger confetti on any interaction
    }

    // Mock function for buying an album
    const handleBuyAlbum = (album: Album) => {
        alert(`Redirecting to purchase album ${album.title} for ${album.price}`)
        // In production, redirect to actual store or payment gateway
        window.open("https://franciscoherreras-cota.bandcamp.com/", "_blank")
        triggerConfetti(); // Trigger confetti on album purchase
    }

    // Improved confetti effect with better mobile support
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
                useWorker: true
            });

            // Initial burst
            myConfetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6, x: 0.5 },
                colors: ['#ff0000', '#ffffff', '#ef4444', '#dc2626'],
                disableForReducedMotion: false,
                scalar: 1.5 // Make particles larger
            });

            // Continue with bursts for 3 seconds
            let burstCount = 0;
            const burstInterval = setInterval(() => {
                burstCount++;
                if (burstCount > 6) {
                    clearInterval(burstInterval);
                    // Clean up the canvas after animation completes
                    setTimeout(() => {
                        document.body.removeChild(canvas);
                    }, 3000);
                    return;
                }

                // Random confetti bursts
                myConfetti({
                    particleCount: Math.floor(Math.random() * 20) + 10,
                    angle: Math.random() * 360,
                    spread: 80,
                    origin: {
                        x: 0.2 + Math.random() * 0.6,
                        y: 0.2 + Math.random() * 0.4
                    },
                    colors: ['#ff0000', '#ffffff', '#ef4444', '#dc2626'],
                    shapes: ['circle', 'square'],
                    scalar: 1.5
                });
            }, 400);

            confettiTriggeredRef.current = true;

            // Reset the flag after some time so it can be triggered again later
            setTimeout(() => {
                confettiTriggeredRef.current = false;
            }, 7000);
        } catch (error) {
            console.error("Failed to create confetti effect:", error);
        }
    }, []);

    // Add effect to trigger confetti on page load for mobile devices
    useEffect(() => {
        // Trigger confetti with delay to ensure it's visible on mobile
        const confettiTimer = setTimeout(() => {
            if (typeof window !== 'undefined') {
                triggerConfetti();
            }
        }, 800);

        // Also add intersection observer as backup trigger method
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !confettiTriggeredRef.current) {
                    triggerConfetti();
                }
            });
        }, {
            threshold: 0.2 // Lower threshold to trigger earlier
        });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            clearTimeout(confettiTimer);
            if (sectionRef.current) {
                observer.disconnect();
            }
        };
    }, [triggerConfetti]);

    // Add useEffect to force scroll to top when component mounts
    useEffect(() => {
        // Force immediate scroll to top when music section loads
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0; // For Safari

        // Use multiple approaches with timeouts for reliability
        for (let i = 1; i <= 10; i++) {
            setTimeout(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }, i * 50);
        }
    }, []);

    return (
        <div ref={sectionRef} className="relative w-full bg-gradient-to-r from-purple-700 via-blue-600 to-purple-700 overflow-y-auto flex flex-col min-h-screen">
            {/* Very top rotating banner */}
            <div className="absolute top-[3%] left-0 right-0 flex items-center overflow-hidden pointer-events-none">
                <h2 className="text-[1.8rem] sm:text-[3rem] md:text-[5.5rem] lg:text-[8rem] font-bold text-white/10 whitespace-nowrap animate-tickets-banner" style={{ animationDuration: "25s" }}>
                    ★ LA MIGRACIÓN FORTALEZA LA NACIÓN ★ MIGRATION STRENGTHENS THE NATION ★
                </h2>
            </div>

            {/* Rotating banner below the top - similar to tickets page */}
            <div className="absolute top-[10%] left-0 right-0 flex items-center overflow-hidden pointer-events-none">
                <h2 className="text-[2rem] sm:text-[3.5rem] md:text-[6.5rem] lg:text-[9rem] font-bold text-white/10 whitespace-nowrap animate-tickets-banner" style={{ animationDuration: "35s" }}>
                    ★ HONOR MIGRANTE ★ FRANCISCO HERRERA ★ HONOR MIGRANTE ★ FRANCISCO HERRERA ★
                </h2>
            </div>

            {/* Middle rotating banner with music message */}
            <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
                <h1 className="text-[3rem] sm:text-[5rem] md:text-[10rem] lg:text-[15rem] font-bold text-white/10 whitespace-nowrap animate-tickets-banner">
                    MUSIC • HONOR • MIGRANTE • FRANCISCO • HERRERA •
                </h1>
            </div>

            {/* Additional banner positioned much higher */}
            <div className="absolute top-[18%] left-0 right-0 flex items-center overflow-hidden pointer-events-none">
                <h2 className="text-[2.2rem] sm:text-[3.8rem] md:text-[7rem] lg:text-[10rem] font-bold text-white/10 whitespace-nowrap animate-tickets-banner" style={{ animationDuration: "28s", animationDirection: "reverse" }}>
                    ★ VOICES OF MIGRANTS ★ SONGS OF THE PEOPLE ★ VOICES OF MIGRANTS ★
                </h2>
            </div>

            {/* Bottom rotating banner */}
            <div className="absolute top-[70%] left-0 right-0 flex items-center overflow-hidden pointer-events-none">
                <h2 className="text-[2rem] sm:text-[3.5rem] md:text-[6.5rem] lg:text-[9rem] font-bold text-white/10 whitespace-nowrap animate-tickets-banner" style={{ animationDuration: "30s" }}>
                    ★ DOWNLOAD NOW ★ AVAILABLE TODAY ★ DOWNLOAD NOW ★ AVAILABLE TODAY ★
                </h2>
            </div>

            {/* Use the new header component that matches the image */}
            <MusicHeader />

            {/* Main Content */}
            <div className="flex-grow container mx-auto px-3 sm:px-6 py-4 sm:py-8">
                {/* Album Display */}
                {albums.map((album) => (
                    <div key={album.id} className="bg-black/80 rounded-lg border border-white/10 shadow-lg mx-auto max-w-[95%] sm:max-w-[90%] xl:max-w-[80%] 2xl:max-w-[70%] mb-10 overflow-hidden">
                        {/* Album Header */}
                        <div className="p-4 sm:p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Album Cover */}
                                <div className="relative aspect-square max-w-xs mx-auto md:mx-0 border-2 border-red-500/20 rounded-lg shadow-xl">
                                    <Image
                                        src={album.cover}
                                        alt={album.title}
                                        width={400}
                                        height={400}
                                        className="rounded-lg"
                                        priority
                                    />
                                </div>

                                {/* Album Info */}
                                <div className="col-span-2 text-white">
                                    <h2 className="text-3xl font-black tracking-tight mb-2">{album.title}</h2>
                                    <h3 className="text-xl text-red-400 font-bold mb-4">{album.artist}</h3>

                                    <div className="flex flex-wrap gap-3 mb-6">
                                        <Button
                                            onClick={() => handleBuyAlbum(album)}
                                            className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-md px-4 py-2 transition-all duration-300 ease-in-out shadow-[0_4px_0_rgb(127,29,29)] hover:shadow-[0_2px_0_rgb(127,29,29)] transform hover:-translate-y-1 active:shadow-none active:translate-y-1 flex items-center gap-2 hover:animate-pulse"
                                        >
                                            <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                                <Download size={18} className="text-red-200" />
                                            </span>
                                            <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                                {language === 'en' ? `Download: ${album.price}` : `Descargar: ${album.price}`}
                                            </span>
                                        </Button>

                                        <Button
                                            className="bg-transparent hover:bg-white/20 text-white border border-white/30 font-bold rounded-md px-4 py-2 transition-all duration-300 ease-in-out shadow-[0_3px_0_rgba(255,255,255,0.2)] hover:shadow-[0_1px_0_rgba(255,255,255,0.15)] transform hover:-translate-y-1 active:shadow-none active:translate-y-1 flex items-center gap-2 hover:animate-pulse"
                                        >
                                            <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                                <Share2 size={18} className="text-blue-200" />
                                            </span>
                                            <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                                {language === 'en' ? 'Share' : 'Compartir'}
                                            </span>
                                        </Button>

                                        <Button
                                            className="bg-transparent hover:bg-white/20 text-white border border-white/30 font-bold rounded-md px-4 py-2 transition-all duration-300 ease-in-out shadow-[0_3px_0_rgba(255,255,255,0.2)] hover:shadow-[0_1px_0_rgba(255,255,255,0.15)] transform hover:-translate-y-1 active:shadow-none active:translate-y-1 flex items-center gap-2 hover:animate-pulse"
                                        >
                                            <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                                <Heart size={18} className="text-red-400" />
                                            </span>
                                            <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                                {language === 'en' ? 'Favorite' : 'Favorito'}
                                            </span>
                                        </Button>
                                    </div>

                                    <p className="text-gray-300 leading-relaxed mb-4">
                                        {language === 'en' ? album.description.en : album.description.es}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                        <div>
                                            <span className="font-bold">12</span> {language === 'en' ? 'Songs' : 'Canciones'}
                                        </div>
                                        <div>
                                            <span className="font-bold">45</span> {language === 'en' ? 'Minutes' : 'Minutos'}
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-red-500">♫</span> {language === 'en' ? 'Released 2023' : 'Lanzado 2023'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>

                        {/* Song List */}
                        <div className="bg-black/60 rounded-xl overflow-hidden transform perspective-1000 relative shadow-2xl shadow-red-900/30 border border-red-500/30 hover:border-red-500/50 transition-all duration-500 group hover:translate-y-[-3px] hover:shadow-red-900/40 backdrop-blur-sm w-full max-w-[95%] sm:max-w-[95%] md:max-w-7xl mx-auto">
                            {/* 3D Effect Elements */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-purple-900/10 opacity-50"></div>
                            <div className="absolute -inset-1 bg-red-500/5 blur-lg opacity-30 group-hover:opacity-40 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
                            <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>
                            <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-red-500/30 to-transparent"></div>

                            {/* Pseudo 3D lighting effect */}
                            <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none"></div>

                            {/* Glow corners */}
                            <div className="absolute top-0 left-0 w-10 h-10 bg-red-500/20 blur-md rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60 pointer-events-none"></div>
                            <div className="absolute bottom-0 right-0 w-10 h-10 bg-red-500/20 blur-md rounded-full translate-x-1/2 translate-y-1/2 opacity-60 pointer-events-none"></div>

                            {/* Header row */}
                            <div className="grid grid-cols-[2fr_1fr_1fr] items-center px-6 py-5 bg-gradient-to-r from-black/80 via-red-950/30 to-black/80 border-b border-red-500/40 sm:grid relative z-10 shadow-md">
                                <div>
                                    <span className="font-black text-xl uppercase text-white tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                        {language === 'en' ? 'SONGS' : 'CANCIONES'}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <span className="font-black text-xl uppercase text-white tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                        PRICE
                                    </span>
                                </div>
                                <div className="text-center">
                                    <span className="font-black text-xl uppercase text-white tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                        {language === 'en' ? 'PLAY' : 'REPRODUCIR'}
                                    </span>
                                </div>
                            </div>

                            {/* Songs list */}
                            <div className="space-y-1 p-2 relative z-10">
                                {/* Error message display if audio fails to play */}
                                {audioError && (
                                    <div className="col-span-3 bg-red-900/40 border border-red-500/60 rounded-md p-3 my-2 text-white text-sm">
                                        <p>{audioError}</p>
                                        <p className="mt-1 text-xs">
                                            Note: Some mobile browsers require user interaction before audio can play.
                                            Try tapping the play button again.
                                        </p>
                                    </div>
                                )}

                                {album.songs.map((song, index) => (
                                    <div
                                        key={song.id}
                                        className={`group grid grid-cols-[2fr_1fr_1fr] items-center px-6 py-3 rounded-md ${currentlyPlaying === song.id
                                            ? 'bg-red-800/30 border border-red-500/40 shadow-lg shadow-red-900/20'
                                            : index % 2 === 0
                                                ? 'bg-black/40 border border-transparent hover:bg-black/60 hover:border-red-900/30 hover:shadow-md hover:shadow-red-900/10'
                                                : 'border border-transparent hover:bg-black/60 hover:border-red-900/30 hover:shadow-md hover:shadow-red-900/10'
                                            } transition-all duration-200`}
                                    >
                                        {/* Song info - Left column (2fr) */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 flex items-center justify-center relative">
                                                <span className="text-red-400 opacity-90 font-bold">{song.id}.</span>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-base sm:text-lg tracking-tighter flex items-center drop-shadow-sm">
                                                    {song.title}
                                                </h4>
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-gray-400 text-sm">{song.duration}</span>
                                                    {song.hasInfo && (
                                                        <span className="text-blue-400 text-xs border border-blue-400/30 px-1.5 py-0.5 rounded bg-blue-500/10">
                                                            {language === 'en' ? 'Info' : 'Info'}
                                                        </span>
                                                    )}
                                                    {song.hasLyrics && (
                                                        <span className="text-green-400 text-xs border border-green-400/30 px-1.5 py-0.5 rounded bg-green-500/10">
                                                            {language === 'en' ? 'Lyrics' : 'Letra'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price - Middle column (1fr) */}
                                        <div className="flex justify-center">
                                            {song.freeDownload ? (
                                                <span className="bg-gradient-to-r from-green-500 to-green-400 text-white text-xs sm:text-sm font-bold rounded-md px-3 py-1 inline-flex items-center justify-center shadow-[0_2px_0_rgba(22,101,52,0.7)]">
                                                    <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{language === 'en' ? 'Free' : 'Gratis'}</span>
                                                </span>
                                            ) : (
                                                <span className="bg-gradient-to-r from-red-500 to-red-400 text-white text-xs sm:text-sm font-bold rounded-md px-3 py-1 inline-flex items-center justify-center shadow-[0_2px_0_rgb(127,29,29)]">
                                                    <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{song.price}</span>
                                                </span>
                                            )}
                                        </div>

                                        {/* Play button - Right column (1fr) */}
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => handleSongClick(song)}
                                                className={`flex items-center justify-center rounded-full w-10 h-10 transition-all duration-200 ${currentlyPlaying === song.id
                                                    ? 'bg-red-600 text-white animate-pulse shadow-md shadow-red-900/50'
                                                    : 'bg-red-600/80 hover:bg-red-600 text-white hover:shadow-md hover:shadow-red-900/30'
                                                    }`}
                                            >
                                                {currentlyPlaying === song.id ? (
                                                    <Pause size={20} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                                                ) : (
                                                    <Play size={20} className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                                                )}
                                            </button>
                                            {/* Only add audio elements for playable songs */}
                                            {(song.id === 1 || song.id === 2) && (
                                                <audio
                                                    ref={(el) => { audioRefs.current[song.id] = el; }}
                                                    src={songUrls[song.id]}
                                                    onEnded={() => handleAudioEnded(song.id)}
                                                    onError={(e) => handleAudioError(song.id, e)}
                                                    preload="none"
                                                    playsInline
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Additional Albums */}
                <div className="text-center text-white my-6">
                    <h3 className="text-2xl font-bold mb-4">
                        {language === 'en' ? 'More Albums Coming Soon' : 'Más Álbumes Próximamente'}
                    </h3>
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-0.5 w-12 bg-red-500 hidden sm:block"></div>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            {language === 'en'
                                ? 'Stay tuned for more music releases and updates. Visit the official Bandcamp page for the complete catalog.'
                                : 'Estén atentos a más lanzamientos y actualizaciones musicales. Visite la página oficial de Bandcamp para ver el catálogo completo.'}
                        </p>
                        <div className="h-0.5 w-12 bg-red-500 hidden sm:block"></div>
                    </div>
                    <div className="mt-6">
                        <a
                            href="https://franciscoherreramusic.com/honor-migrante"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1DA0C3] to-[#1a8fb0] text-white font-bold rounded-md px-6 py-3 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-[0_5px_0_rgba(26,129,159,0.7)] hover:shadow-[0_3px_0_rgba(26,129,159,0.7)] active:shadow-none active:translate-y-1 relative hover:animate-pulse"
                        >
                            <span className="relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] flex items-center">
                                <span className="text-[#1DA0C3] mr-2 font-bold bg-black/50 rounded-full h-6 w-6 flex items-center justify-center transform transition-transform shadow-lg shadow-[#1DA0C3]/40 border border-[#1DA0C3]/70 relative before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-[#29B6D9] before:to-[#1a8fb0] before:opacity-50 before:blur-sm">♫</span>
                                {language === 'en' ? 'Visit Honor Migrante Album' : 'Visitar Álbum Honor Migrante'}
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Background Text - Desktop only */}
            <div className="absolute inset-0 items-center overflow-hidden pointer-events-none hidden sm:block">
                <h1 className="text-[8rem] md:text-[15rem] font-bold text-white/10 whitespace-nowrap animate-marquee">
                    MUSIC • FRANCISCO • MUSIC • FRANCISCO •
                </h1>
            </div>

            {/* Styles */}
            <style jsx global>{`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                
                .animate-marquee {
                  animation: marquee 30s linear infinite;
                }
                
                @keyframes custom-pulse {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.7; transform: scale(1.05); }
                }
                
                .custom-pulse {
                  animation: custom-pulse 2s ease-in-out infinite;
                }
                
                @keyframes pulse-glow {
                  0%, 100% { 
                    text-shadow: 0 0 4px rgba(239, 68, 68, 0.7), 0 0 8px rgba(239, 68, 68, 0.5);
                    transform: scale(1); 
                  }
                  50% { 
                    text-shadow: 0 0 10px rgba(239, 68, 68, 0.9), 0 0 20px rgba(239, 68, 68, 0.7); 
                    transform: scale(1.1);
                  }
                }
                
                .pulse-animation {
                  animation: pulse-glow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}