"use client"

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';

// Define the sponsor type
interface Sponsor {
    name: string;
    logo: string;
    website: string;
    isPermanent: boolean;
    customStyles?: {
        container?: string;
        image?: string;
    };
}

// Sponsor data
const sponsors: Sponsor[] = [
    // {
    //     name: "Self Help Federal Credit Union",
    //     logo: "https://pub-28e558b74ea64a0781531927a8b49e0e.r2.dev/selfhelpfederalcreditunion.png",
    //     website: "https://www.self-helpfcu.org",
    //     isPermanent: true,
    //     customStyles: {
    //         container: "bg-white",
    //         image: "object-contain p-4"
    //     }
    // },
    {
        name: "Caminante Cultural Foundation",
        logo: "https://pub-28e558b74ea64a0781531927a8b49e0e.r2.dev/caminanteculturalfoundation.png",
        website: "http://caminatecultural.org",
        isPermanent: true,
        customStyles: {
            container: "bg-black",
            image: "object-contain p-0 scale-110"
        }
    }
];

export default function Sponsors() {
    const { t, language } = useLanguage();

    // Add rotating banner animation
    useEffect(() => {
        if (typeof document !== 'undefined') {
            // Create style element for custom animations
            const styleEl = document.createElement('style');
            styleEl.innerHTML = `
                @keyframes marqueeRight {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes marqueeLeft {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                
                .marquee-right {
                    animation: marqueeRight 20s linear infinite;
                }
                
                .marquee-left {
                    animation: marqueeLeft 20s linear infinite;
                }
                
                @keyframes backgroundMarquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                .bg-marquee {
                    animation: backgroundMarquee 30s linear infinite;
                }
            `;
            document.head.appendChild(styleEl);

            // Cleanup
            return () => {
                document.head.removeChild(styleEl);
            };
        }
    }, []);

    return (
        <div className="bg-gradient-to-r from-black via-gray-900 to-black py-16 relative overflow-hidden">
            {/* Rotating Top Banner */}
            <div className="absolute top-0 left-0 right-0 overflow-hidden h-12 bg-gradient-to-r from-red-700/60 via-red-600/50 to-red-700/60">
                <div className="whitespace-nowrap marquee-right font-black text-2xl text-white/40 drop-shadow-sm">
                    •THANK YOU TO OUR SPONSORS• •GRACIAS A NUESTROS PATROCINADORES• •THANK YOU TO OUR SPONSORS• •GRACIAS A NUESTROS PATROCINADORES•
                </div>
            </div>

            {/* Rotating Bottom Banner */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-12 bg-gradient-to-r from-red-700/60 via-red-600/50 to-red-700/60">
                <div className="whitespace-nowrap marquee-left font-black text-2xl text-white/40 drop-shadow-sm">
                    •WEEKLY SPONSORS• •PATROCINADORES SEMANALES• •WEEKLY SPONSORS• •PATROCINADORES SEMANALES•
                </div>
            </div>

            {/* Background Text - similar to marketing section */}
            <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
                <h1 className="text-[8rem] md:text-[15rem] font-bold text-white/5 whitespace-nowrap bg-marquee">
                    SPONSORS • GRACIAS • SPONSORS • GRACIAS •
                </h1>
            </div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        <span className="text-red-500 mr-2">•</span>
                        {t("sponsors.title")}
                        <span className="text-red-500 ml-2">•</span>
                    </h2>
                    <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                        {t("sponsors.subtitle")}
                    </p>
                    <div className="h-1 bg-red-500 w-32 mx-auto mt-6"></div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    {sponsors.map((sponsor, index) => (
                        <Link
                            key={index}
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 border-2 border-white/20 hover:border-red-500/30 rounded-xl p-6 transition-all duration-300 hover:bg-white/15 transform hover:scale-105 group"
                        >
                            <div className="relative h-44 w-60 md:w-72">
                                <div className={`h-full w-full rounded-lg flex items-center justify-center p-4 ${sponsor.customStyles?.container || "bg-white"}`}>
                                    {sponsor.logo ? (
                                        <Image
                                            src={sponsor.logo}
                                            alt={sponsor.name}
                                            fill
                                            className={sponsor.customStyles?.image || "object-contain p-4"}
                                            unoptimized={true}
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="text-4xl text-red-500 mb-2">♫</span>
                                            <span className="text-xl text-white text-center font-bold">{sponsor.name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-red-300 transition-colors">{sponsor.name}</h3>
                                {sponsor.isPermanent && (
                                    <p className="text-green-400 text-sm">
                                        {t("sponsors.permanent")}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
} 