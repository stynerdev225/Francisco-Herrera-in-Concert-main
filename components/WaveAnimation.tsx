"use client";

import React from 'react';

interface WaveAnimationProps {
    className?: string;
    color?: string;
    height?: number;
    width?: number;
    count?: number;
}

export default function WaveAnimation({
    className = '',
    color = 'currentColor',
    height = 40,
    width = 200,
    count = 5
}: WaveAnimationProps) {
    return (
        <div
            className={`wave-container ${className}`}
            style={{
                height: `${height}px`,
                width: `${width}px`,
                display: 'flex',
                alignItems: 'flex-end'
            }}
        >
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="wave-element"
                    style={{
                        backgroundColor: color,
                        animationDelay: `${index * 0.1}s`,
                        height: `${Math.random() * height * 0.6 + height * 0.2}px`
                    }}
                />
            ))}
        </div>
    );
} 