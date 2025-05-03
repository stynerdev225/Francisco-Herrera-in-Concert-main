// context/MusicContext.tsx
"use client"

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface MusicContextType {
    isPlaying: boolean;
    toggleMusic: () => void;
    currentSong: string;
    initializeAudio: () => void;
    volume: number;
    setVolume: (volume: number) => void;
    songTitle: string;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Storage keys for localStorage
const MUSIC_PREF_VOLUME = 'franciscoherrera_music_volume';
const MUSIC_PREF_AUTOPLAY = 'franciscoherrera_music_autoplay';
const MUSIC_CURRENT_SONG = 'franciscoherrera_current_song';
const MUSIC_LAST_POSITION = 'franciscoherrera_last_position';

// Global flag to track initialization across renders
let globalInitialized = false;

export function MusicProvider({ children }: { children: React.ReactNode }) {
    // Initialize with user preferences from localStorage if available
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState<string>('');
    const [songTitle, setSongTitle] = useState<string>('Music');
    const [volume, setVolumeState] = useState<number>(() => {
        if (typeof window !== 'undefined') {
            const savedVolume = localStorage.getItem(MUSIC_PREF_VOLUME);
            return savedVolume ? parseFloat(savedVolume) : 0.5;
        }
        return 0.5;
    });
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const initialized = useRef(globalInitialized);
    const eventListenersAttached = useRef(false);
    const userHasInteracted = useRef(false);
    const autoplayAttempted = useRef(false);
    const shouldAutoPlay = useRef(true); // Default to true for autoplay
    const autoplayRetryCount = useRef(0);
    const visibilityChangeListenerAdded = useRef(false);

    // Available song snippets - updated paths to match the actual file locations in public/music/snippets
    const songSnippets = [
        "/music/snippets/nuevo-sol-snippet1.mp4",
        "/music/snippets/nuevo-sol-snippet2.mp4",
        "/music/snippets/saber-migra-snippet1.mp4",
        "/music/snippets/saber-migra-snippet2.mp4"
    ];

    // Get song title from the filename
    const getSongTitle = (songPath: string) => {
        if (!songPath) return 'Music';

        if (songPath.includes('nuevo-sol-snippet1')) {
            return 'Nuevo Sol (Part 1)';
        } else if (songPath.includes('nuevo-sol-snippet2')) {
            return 'Nuevo Sol (Part 2)';
        } else if (songPath.includes('saber-migra-snippet1')) {
            return 'Saber Migra (Part 1)';
        } else if (songPath.includes('saber-migra-snippet2')) {
            return 'Saber Migra (Part 2)';
        } else if (songPath.includes('background-music.mp3')) {
            return 'Background Music';
        }

        return 'Music';
    };

    // Function to save current song state
    const saveCurrentSongState = (songPath: string) => {
        if (typeof window === 'undefined' || !songPath) return;

        const currentIndex = songSnippets.findIndex(song => song === songPath);
        if (currentIndex >= 0) {
            localStorage.setItem(MUSIC_CURRENT_SONG, songPath);
            localStorage.setItem(MUSIC_LAST_POSITION, currentIndex.toString());
        }
    };

    // Function to load previous song position
    const loadPreviousSongPosition = (): number => {
        if (typeof window === 'undefined') return 0;

        const savedSong = localStorage.getItem(MUSIC_CURRENT_SONG);
        const savedPosition = localStorage.getItem(MUSIC_LAST_POSITION);

        // If we have a saved position, use that
        if (savedPosition) {
            const position = parseInt(savedPosition);
            if (!isNaN(position) && position >= 0 && position < songSnippets.length) {
                return position;
            }
        }

        // If we have a saved song but no position, find the song
        if (savedSong) {
            const position = songSnippets.findIndex(song => song === savedSong);
            if (position >= 0) {
                return position;
            }
        }

        // Default to a random song
        return Math.floor(Math.random() * songSnippets.length);
    };

    // Function to play next song with improved error handling
    const playNextSong = (audioElement: HTMLAudioElement) => {
        try {
            const currentIndex = songSnippets.findIndex(song => song === currentSong);
            const nextIndex = (currentIndex + 1) % songSnippets.length;
            const nextSong = songSnippets[nextIndex];

            console.log(`Playing next song (${nextIndex}):`, nextSong);
            setCurrentSong(nextSong);
            setSongTitle(getSongTitle(nextSong));
            saveCurrentSongState(nextSong);

            audioElement.src = nextSong;
            audioElement.load();

            // Check if the tab is visible before trying to play
            if (!document.hidden) {
                audioElement.play().catch(e => {
                    console.error("Failed to play next song:", e);
                    setIsPlaying(false);
                });
            }
        } catch (error) {
            console.error("Error in playNextSong:", error);
            setIsPlaying(false);
        }
    };

    // Function to properly attach event listeners
    const attachEventListeners = (audio: HTMLAudioElement) => {
        if (eventListenersAttached.current) return;

        const handlePlay = () => {
            console.log("Play event fired");
            setIsPlaying(true);
            // Save preference to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem(MUSIC_PREF_AUTOPLAY, 'true');
            }
        };

        const handlePause = () => {
            console.log("Pause event fired");
            setIsPlaying(false);
            // Save preference to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem(MUSIC_PREF_AUTOPLAY, 'false');
            }
        };

        const handleEnded = () => {
            console.log("Song ended, playing next");
            playNextSong(audio);
        };

        // Store event handler references for cleanup
        audio.onplay = handlePlay;
        audio.onpause = handlePause;
        audio.onended = handleEnded;

        // Handle page visibility changes
        if (!visibilityChangeListenerAdded.current && typeof document !== 'undefined') {
            const handleVisibilityChange = () => {
                if (document.hidden) {
                    // Page is hidden, pause music if playing
                    if (audio && isPlaying) {
                        audio.pause();
                    }
                } else {
                    // Page is visible again, resume if it was playing
                    if (audio && shouldAutoPlay.current && userHasInteracted.current) {
                        audio.play().catch(e => {
                            console.error("Failed to resume on visibility change:", e);
                        });
                    }
                }
            };

            document.addEventListener('visibilitychange', handleVisibilityChange);
            visibilityChangeListenerAdded.current = true;
        }

        eventListenersAttached.current = true;
        console.log("Event listeners attached");
    };

    // Function to set volume and update the audio element
    const setVolume = (newVolume: number) => {
        if (newVolume < 0) newVolume = 0;
        if (newVolume > 1) newVolume = 1;

        setVolumeState(newVolume);

        // Update audio element volume if it exists
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }

        // Save to localStorage for persistence
        if (typeof window !== 'undefined') {
            localStorage.setItem(MUSIC_PREF_VOLUME, newVolume.toString());
        }
    };

    // Create audio element and set up initial state
    const createAudioElement = () => {
        if (audioRef.current) return audioRef.current;

        try {
            const audio = new Audio();

            // Get the starting song position based on previous sessions
            const songIndex = loadPreviousSongPosition();
            const initialSong = songSnippets[songIndex];

            console.log("Initializing with song path:", initialSong);

            // Set audio properties
            audio.src = initialSong;
            audio.preload = "auto";
            audio.volume = volume;
            audio.muted = false; // Ensure not muted
            audio.loop = false;  // Don't loop, we'll handle rotation

            // Allow cross-origin to help with some browsers
            audio.crossOrigin = "anonymous";

            // Add event listeners for better debugging
            audio.oncanplaythrough = () => {
                console.log("Audio can play through without buffering");
            };

            // Add error handling for loading issues
            audio.onerror = (e) => {
                console.error("Audio loading error:", e);
                console.error("Error code:", audio.error?.code);
                console.error("Error message:", audio.error?.message);

                // Try with a different song if this one fails
                const fallbackIndex = (songIndex + 1) % songSnippets.length;
                try {
                    audio.src = songSnippets[fallbackIndex];
                    audio.load();
                    console.log("Trying alternate song after error:", songSnippets[fallbackIndex]);
                    setCurrentSong(songSnippets[fallbackIndex]);
                    setSongTitle(getSongTitle(songSnippets[fallbackIndex]));
                    saveCurrentSongState(songSnippets[fallbackIndex]);
                } catch (fallbackError) {
                    console.error("Fallback song also failed:", fallbackError);
                }
            };

            // Attach event listeners
            attachEventListeners(audio);

            // Store reference and state
            audioRef.current = audio;
            setCurrentSong(initialSong);
            setSongTitle(getSongTitle(initialSong));
            saveCurrentSongState(initialSong);

            return audio;
        } catch (error) {
            console.error("Error creating audio element:", error);
            return null;
        }
    };

    // Function to initialize audio with more robust handling of browser restrictions
    const initializeAudio = () => {
        // Check global initialization before doing anything
        if (globalInitialized && audioRef.current) {
            console.log("Audio already globally initialized");
            return audioRef.current;
        }

        // Only log initialization once
        if (!initialized.current) {
            console.log("Initializing audio player");
        }

        // If already initialized in this component instance, return the ref
        if (initialized.current && audioRef.current) {
            return audioRef.current;
        }

        // Create audio element if it doesn't exist yet
        const audio = createAudioElement();
        if (audio) {
            initialized.current = true;
            globalInitialized = true;
            console.log("Audio initialized successfully");
            return audio;
        }

        return null;
    };

    // More aggressive autoplay strategy
    const attemptAutoplay = async () => {
        if (autoplayAttempted.current || !shouldAutoPlay.current || typeof document === 'undefined') return;

        // Mark as attempted to avoid multiple attempts
        autoplayAttempted.current = true;

        // Initialize the audio if not already done
        const audio = initializeAudio();
        if (!audio) return;

        console.log("Attempting aggressive autoplay strategies...");

        // Try a series of strategies in sequence
        try {
            // Simple play attempt
            audio.muted = false;
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                await playPromise;
                console.log("Autoplay successful");
                setIsPlaying(true);
                return;
            }
        } catch (err) {
            console.log("Autoplay failed:", err);
        }
    };

    // Effect to try autoplay on component mount
    useEffect(() => {
        // Don't try to autoplay if not in browser
        if (typeof window === 'undefined') return;

        // Check if user previously enabled autoplay
        const autoplayPref = localStorage.getItem(MUSIC_PREF_AUTOPLAY);
        if (autoplayPref === 'false') {
            shouldAutoPlay.current = false;
            return;
        }

        // Schedule autoplay attempt after a short delay
        const autoplayTimer = setTimeout(() => {
            attemptAutoplay();
        }, 1000);

        return () => clearTimeout(autoplayTimer);
    }, []);

    // Effect for user interaction tracking - simplified to remove duplicate event listeners
    useEffect(() => {
        if (typeof window === 'undefined' || userHasInteracted.current) return;

        // Centralized handler for user interaction
        const handleUserInteraction = (e: Event) => {
            if (userHasInteracted.current) return; // Prevent duplicate handling

            console.log("User interaction detected", e.type);
            userHasInteracted.current = true;

            // Try autoplaying on first interaction if we should
            if (shouldAutoPlay.current && !isPlaying) {
                const audio = initializeAudio();
                if (audio) {
                    console.log("Attempting to play after user interaction");
                    audio.muted = false; // Ensure not muted
                    audio.volume = volume;

                    // Simple play attempt without iOS workaround
                    const playPromise = audio.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                console.log("Successfully autoplayed after user interaction");
                                setIsPlaying(true);
                            })
                            .catch(err => {
                                console.error("Failed to autoplay after user interaction:", err);
                                // No special workaround needed - just let the user manually start playback
                            });
                    }
                }
            }

            // Remove event listeners after successful interaction
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('touchend', handleUserInteraction, { capture: true });
            window.removeEventListener('touchstart', handleUserInteraction);
            window.removeEventListener('keydown', handleUserInteraction);
            window.removeEventListener('scroll', handleUserInteraction);
        };

        // Add event listeners for various types of user interactions
        window.addEventListener('click', handleUserInteraction);
        // For mobile, touchend is often more reliable than touchstart
        window.addEventListener('touchend', handleUserInteraction, { capture: true });
        window.addEventListener('touchstart', handleUserInteraction);
        window.addEventListener('keydown', handleUserInteraction);
        window.addEventListener('scroll', handleUserInteraction);

        return () => {
            // Clean up event listeners
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('touchend', handleUserInteraction, { capture: true });
            window.removeEventListener('touchstart', handleUserInteraction);
            window.removeEventListener('keydown', handleUserInteraction);
            window.removeEventListener('scroll', handleUserInteraction);
        };
    }, [isPlaying, volume]);

    // Toggle music function simplified without workarounds
    const toggleMusic = () => {
        console.log("Toggle music called, current state:", isPlaying);

        // Mark that user has interacted with the music player
        userHasInteracted.current = true;

        // If not initialized yet, initialize first
        if (!initialized.current || !audioRef.current) {
            console.log("Audio not initialized yet, initializing now");
            const audio = initializeAudio();

            if (!audio) {
                console.error("Failed to initialize audio");
                return;
            }

            // Try to play
            audio.muted = false; // Ensure not muted
            audio.volume = volume;

            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log("Playback started successfully");
                        setIsPlaying(true);
                        shouldAutoPlay.current = true;
                        localStorage.setItem(MUSIC_PREF_AUTOPLAY, 'true');
                    })
                    .catch(error => {
                        console.error("Play failed:", error);
                        // Let user manually trigger playback
                    });
            }

            return;
        }

        try {
            if (isPlaying) {
                console.log("Pausing music");
                audioRef.current.pause();
                shouldAutoPlay.current = false;
                localStorage.setItem(MUSIC_PREF_AUTOPLAY, 'false');
                // setIsPlaying will be updated by the event listener
            } else {
                console.log("Playing music");
                const playPromise = audioRef.current.play();

                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log("Playback started successfully");
                            shouldAutoPlay.current = true;
                            localStorage.setItem(MUSIC_PREF_AUTOPLAY, 'true');
                            // setIsPlaying will be updated by the event listener
                        })
                        .catch(error => {
                            console.error("Play failed:", error);
                            // Let user manually trigger playback
                        });
                }
            }
        } catch (error) {
            console.error("Error toggling music:", error);
        }
    };

    // Check if service workers are supported for better background playback
    useEffect(() => {
        if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator && !audioRef.current) {
            console.log("Service Worker supported, this could help with background playback");
        }
    }, []);

    // Improved cleanup when component unmounts
    useEffect(() => {
        // This effect is for cleanup only
        return () => {
            if (audioRef.current) {
                const audio = audioRef.current;
                audio.pause();

                // Remove all event listeners
                audio.onplay = null;
                audio.onpause = null;
                audio.onended = null;
                audio.onerror = null;
                audio.oncanplaythrough = null;

                // Only clear the local ref, keep the global flag for persistence
                audioRef.current = null;
                initialized.current = false;
                eventListenersAttached.current = false;
                console.log("Audio cleaned up");
            }

            // Remove visibility change listener if it was added
            if (typeof document !== 'undefined' && visibilityChangeListenerAdded.current) {
                document.removeEventListener('visibilitychange', () => { });
                visibilityChangeListenerAdded.current = false;
            }
        };
    }, []);

    return (
        <MusicContext.Provider value={{
            isPlaying,
            toggleMusic,
            currentSong,
            initializeAudio,
            volume,
            setVolume,
            songTitle
        }}>
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