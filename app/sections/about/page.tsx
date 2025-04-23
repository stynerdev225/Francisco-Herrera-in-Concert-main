"use client";

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

// Add translations specific to this page
const aboutTranslations = {
    "about.title": {
        en: "About Francisco Herrera",
        es: "Sobre Francisco Herrera",
    },
    "about.subtitle": {
        en: "Musician, Activist, Community Leader",
        es: "Músico, Activista, Líder Comunitario",
    },
    "about.backButton": {
        en: "Back to Home",
        es: "Volver al Inicio",
    },
    "about.intro": {
        en: "Francisco Herrera is a renowned musician and community activist whose music bridges cultures and inspires action for social justice.",
        es: "Francisco Herrera es un reconocido músico y activista comunitario cuya música une culturas e inspira acción por la justicia social.",
    },
    "about.bio": {
        en: "For over three decades, Francisco has used his music to amplify the voices of marginalized communities, particularly focusing on immigration rights and cultural heritage preservation.",
        es: "Durante más de tres décadas, Francisco ha utilizado su música para amplificar las voces de comunidades marginadas, enfocándose especialmente en los derechos de inmigración y la preservación del patrimonio cultural.",
    },
    "about.section1.title": {
        en: "Musical Journey",
        es: "Trayectoria Musical",
    },
    "about.section1.content": {
        en: "Francisco's musical journey spans continents and traditions, blending Latin American folk, contemporary protest songs, and spiritual melodies that speak to the heart of community struggles and triumphs.",
        es: "La trayectoria musical de Francisco abarca continentes y tradiciones, combinando el folclore latinoamericano, canciones contemporáneas de protesta y melodías espirituales que hablan al corazón de las luchas y triunfos comunitarios.",
    },
    "about.section2.title": {
        en: "Community Impact",
        es: "Impacto Comunitario",
    },
    "about.section2.content": {
        en: "Through his performances and activism, Francisco has been at the forefront of movements advocating for immigrant rights, worker justice, and the celebration of cultural diversity in San Francisco and beyond.",
        es: "A través de sus actuaciones y activismo, Francisco ha estado a la vanguardia de movimientos que abogan por los derechos de los inmigrantes, la justicia laboral y la celebración de la diversidad cultural en San Francisco y más allá.",
    },
};

export default function AboutPage() {
    const { t, language, translations } = useLanguage();

    // Register the translations on component mount
    useEffect(() => {
        // We would add our translations to the context here if they weren't already included
        // This is just an example of how you could dynamically add translations
    }, []);

    return (
        <div className="flex flex-col items-center px-4 py-12">
            <div className="max-w-4xl w-full bg-black/80 rounded-lg shadow-xl p-6 sm:p-8 md:p-12 text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{t("about.title")}</h1>
                <h2 className="text-xl sm:text-2xl text-red-400 mb-8">{t("about.subtitle")}</h2>

                <div className="flex flex-col md:flex-row gap-8 mb-12">
                    <div className="md:w-1/3 aspect-square relative rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-red-800 to-purple-900 opacity-30 absolute z-10"></div>
                        <div className="text-center absolute inset-0 flex items-center justify-center z-20">
                            <p className="text-white font-bold">Image Coming Soon</p>
                        </div>
                    </div>

                    <div className="md:w-2/3">
                        <p className="text-lg mb-4">{t("about.intro")}</p>
                        <p className="text-base text-gray-300">{t("about.bio")}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-black/40 p-6 rounded-lg border border-purple-500/30">
                        <h3 className="text-xl font-bold text-red-400 mb-3">{t("about.section1.title")}</h3>
                        <p>{t("about.section1.content")}</p>
                    </div>

                    <div className="bg-black/40 p-6 rounded-lg border border-purple-500/30">
                        <h3 className="text-xl font-bold text-red-400 mb-3">{t("about.section2.title")}</h3>
                        <p>{t("about.section2.content")}</p>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-800 pt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t("about.backButton")}
                    </Link>
                </div>
            </div>
        </div>
    );
} 