// context/MusicContext.tsx
"use client"

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface MusicContextType {
    isPlaying: boolean;
    toggleMusic: () => void;
    currentSong: string;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState<string>('');
    const audioRef = useRef<HTMLAudioElement | null>(null);
    // Add a ref to track if this is the initial mount
    const initialMountRef = useRef(true);

    // Available song snippets
    const songSnippets = [
        "/music/snippets/nuevo-sol-snippet1.mp4",
        "/music/snippets/nuevo-sol-snippet2.mp4",
        "/music/snippets/saber-migra-snippet1.mp4",
        "/music/snippets/saber-migra-snippet2.mp4"
    ];

    // Function to get a random song
    const getRandomSong = () => {
        const randomIndex = Math.floor(Math.random() * songSnippets.length);
        return songSnippets[randomIndex];
    };

    // More robust initialization with forced autoplay
    useEffect(() => {
        // Only run on client
        if (typeof window === 'undefined') return;

        // Setup audio element
        if (!audioRef.current) {
            // Select a random song
            const randomSong = getRandomSong();
            setCurrentSong(randomSong);

            // Create audio element with the random song
            audioRef.current = new Audio(randomSong);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.2;
            audioRef.current.autoplay = true; // Set autoplay attribute

            // Add event listeners to sync UI state with audio state
            audioRef.current.onplay = () => setIsPlaying(true);
            audioRef.current.onpause = () => setIsPlaying(false);
            audioRef.current.onended = () => setIsPlaying(false);

            // Save user preference in localStorage
            const userPrefersMusic = localStorage.getItem('userPrefersMusic');
            // If user has explicitly set a preference, respect it
            // Otherwise, autoplay on first visit
            if (userPrefersMusic === 'false') {
                setIsPlaying(false);
                if (audioRef.current) {
                    audioRef.current.pause();
                }
            } else {
                // Try to autoplay
                startPlaying();
            }
        }

        // Cleanup function
        return () => {
            if (audioRef.current) {
                audioRef.current.onplay = null;
                audioRef.current.onpause = null;
                audioRef.current.onended = null;
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Function to start playing music
    const startPlaying = () => {
        if (!audioRef.current) return;

        // Attempt to play with lower volume first (sometimes helps)
        audioRef.current.volume = 0.1;
        audioRef.current.muted = false;

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('Music started successfully');
                    setIsPlaying(true);

                    // Gradually increase volume for better user experience
                    setTimeout(() => {
                        if (audioRef.current) audioRef.current.volume = 0.2;
                    }, 1000);
                })
                .catch(error => {
                    console.log('Autoplay blocked by browser. Setting up interaction listeners.');
                    setIsPlaying(false);

                    // If autoplay fails, set up one-time event listeners for user interaction
                    const playOnInteraction = () => {
                        if (audioRef.current) {
                            audioRef.current.play()
                                .then(() => {
                                    setIsPlaying(true);
                                    removeListeners();
                                })
                                .catch(e => console.error('Still cannot play:', e));
                        }
                    };

                    const removeListeners = () => {
                        ['mousedown', 'keydown', 'touchstart'].forEach(event => {
                            document.removeEventListener(event, playOnInteraction);
                        });
                    };

                    // Add listeners for common user interactions
                    ['mousedown', 'keydown', 'touchstart'].forEach(event => {
                        document.addEventListener(event, playOnInteraction, { once: true });
                    });
                });
        }
    };

    // Robust toggle function
    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            console.log("Pausing music");
            audioRef.current.pause();
            setIsPlaying(false);
            // Save user preference
            localStorage.setItem('userPrefersMusic', 'false');
        } else {
            console.log("Playing music");
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                        // Save user preference
                        localStorage.setItem('userPrefersMusic', 'true');
                    })
                    .catch(error => {
                        console.error('Error playing music:', error);
                        setIsPlaying(false);
                    });
            }
        }
    };

    return (
        <MusicContext.Provider value={{ isPlaying, toggleMusic, currentSong }}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
}