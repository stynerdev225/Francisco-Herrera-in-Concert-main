"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useMusic } from '@/context/MusicContext';

export default function BackgroundMusic() {
    const { isPlaying, toggleMusic, volume, setVolume, initializeAudio, songTitle } = useMusic();
    const [isVisible, setIsVisible] = useState(false);
    const [autoplayMessage, setAutoplayMessage] = useState<string | null>(null);
    const [showAutoplayMessage, setShowAutoplayMessage] = useState(false);
    const hasInitialized = useRef(false);

    // Initialize audio only once when component mounts
    useEffect(() => {
        // Only initialize audio if it hasn't been initialized yet
        if (!hasInitialized.current) {
            // Initialize audio without forcing play
            initializeAudio();
            hasInitialized.current = true;
        }

        // Show the player after a delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        // Show autoplay message briefly
        setShowAutoplayMessage(true);
        setAutoplayMessage("Starting music soon...");

        const messageTimer = setTimeout(() => {
            setShowAutoplayMessage(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
            clearTimeout(messageTimer);
        };
    }, []);

    // Handle volume change
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    // Show a notification when autoplay status changes
    useEffect(() => {
        if (isPlaying) {
            setAutoplayMessage(`Now playing: ${songTitle}`);
        } else {
            setAutoplayMessage("Music paused");
        }

        setShowAutoplayMessage(true);

        const timer = setTimeout(() => {
            setShowAutoplayMessage(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [isPlaying, songTitle]);

    // Handle too much inactivity - hide player after a while
    useEffect(() => {
        let inactivityTimer: NodeJS.Timeout;

        if (isVisible) {
            inactivityTimer = setTimeout(() => {
                if (!isPlaying) {
                    setIsVisible(false);
                }
            }, 10000); // Hide after 10 seconds of inactivity if not playing
        }

        return () => {
            if (inactivityTimer) clearTimeout(inactivityTimer);
        };
    }, [isVisible, isPlaying]);

    // Don't render anything until we're ready to show
    if (!isVisible && !isPlaying && !showAutoplayMessage) return null;

    return (
        <>
            {/* Autoplay notification */}
            {showAutoplayMessage && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium z-50 shadow-lg border border-red-500/20 animate-fade-in-up">
                    {autoplayMessage}
                </div>
            )}

            {/* Main floating player */}
            <div
                className={`fixed bottom-4 right-4 bg-black/90 text-white rounded-xl shadow-2xl z-40 transition-all duration-500 ease-in-out ${isVisible || isPlaying
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0 pointer-events-none"
                    } border border-red-500/30 backdrop-blur-sm`}
            >
                <div className="flex items-center gap-2 p-3 relative overflow-hidden group">
                    {/* Red glow effect behind the player */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-500/5 opacity-60"></div>

                    {/* Play/Pause button */}
                    <button
                        onClick={toggleMusic}
                        className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 transition-colors"
                        title={isPlaying ? `Pause ${songTitle}` : "Play Music"}
                    >
                        {isPlaying ? (
                            <div className="flex justify-center items-center w-full">
                                <div className="flex items-end h-5 space-x-0.5">
                                    <div className="w-1 bg-white h-2 sound-wave-1 rounded-full animate-sound-wave"></div>
                                    <div className="w-1 bg-white h-4 sound-wave-2 rounded-full animate-sound-wave animation-delay-100"></div>
                                    <div className="w-1 bg-white h-3 sound-wave-3 rounded-full animate-sound-wave animation-delay-200"></div>
                                    <div className="w-1 bg-white h-5 sound-wave-4 rounded-full animate-sound-wave animation-delay-300"></div>
                                    <div className="w-1 bg-white h-2 sound-wave-5 rounded-full animate-sound-wave animation-delay-400"></div>
                                </div>
                            </div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        )}
                    </button>

                    {/* Song info and volume controls - expand on hover */}
                    <div className={`overflow-hidden transition-all duration-300 ${isPlaying ? "max-w-[180px]" : "max-w-0 group-hover:max-w-[180px]"}`}>
                        <div className="pl-1 pr-2 min-w-[180px]">
                            {/* Song title */}
                            <div className="text-sm font-semibold truncate mb-1">
                                {isPlaying ? songTitle : "Music Player"}
                            </div>

                            {/* Volume slider */}
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                </svg>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-full h-1 rounded-full appearance-none bg-gray-700 outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Close button visible when not playing */}
                    {!isPlaying && (
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-0 right-0 bg-gray-800/60 p-1 rounded-bl rounded-tr-xl text-white/70 hover:text-white"
                            title="Hide Player"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes sound-wave {
                    0% { height: 3px; }
                    50% { height: 15px; }
                    100% { height: 3px; }
                }
                
                .animate-sound-wave {
                    animation: sound-wave 1.2s ease-in-out infinite;
                }
                
                .animation-delay-100 {
                    animation-delay: 0.1s;
                }
                
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                
                .animation-delay-300 {
                    animation-delay: 0.3s;
                }
                
                .animation-delay-400 {
                    animation-delay: 0.4s;
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                }
                
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translate(-50%, 20px);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }
            `}</style>
        </>
    );
}