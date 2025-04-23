"use client"

import React, { useEffect } from 'react'
import { useMusic } from '@/context/MusicContext'

interface BackgroundMusicProps {
    enabled?: boolean;
    volumeLevel?: number; // 0 to 1
    snippetDuration?: number; // in seconds
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
    enabled = true,
    volumeLevel = 0.2,
    snippetDuration = 30 // 30 seconds default for each snippet
}) => {
    // Use shared music context
    const { isPlaying, toggleMusic, currentSong } = useMusic();

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
        }

        return 'Music';
    };

    // Song title to display
    const songTitle = getSongTitle(currentSong);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-black/60 text-white p-2 rounded-full shadow-lg backdrop-blur-sm">
            {/* Song title (only visible when playing) */}
            {isPlaying && (
                <div className="px-3 py-1 text-xs font-medium opacity-80">
                    {songTitle}
                </div>
            )}

            <button
                onClick={toggleMusic}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 transition-colors overflow-hidden relative"
                aria-label={isPlaying ? "Pause background music" : "Play background music"}
                title={isPlaying ? `Pause ${songTitle}` : `Play ${songTitle}`}
            >
                {isPlaying ? (
                    <div className="flex justify-center items-center w-full">
                        {/* Audio wave animation when playing */}
                        <div className="flex items-end h-5 space-x-0.5">
                            <div className="w-1 bg-white sound-wave-1 h-1 rounded-full"></div>
                            <div className="w-1 bg-white sound-wave-2 h-3 rounded-full"></div>
                            <div className="w-1 bg-white sound-wave-3 h-5 rounded-full"></div>
                            <div className="w-1 bg-white sound-wave-4 h-2 rounded-full"></div>
                            <div className="w-1 bg-white sound-wave-5 h-4 rounded-full"></div>
                        </div>
                    </div>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                )}
            </button>
        </div>
    );
};

export default BackgroundMusic;