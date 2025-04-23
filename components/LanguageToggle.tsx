"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface LanguageToggleProps {
    className?: string;
    variant?: "default" | "minimal" | "pill";
}

export default function LanguageToggle({
    className = "",
    variant = "default",
}: LanguageToggleProps) {
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "es" : "en");
    };

    // Different style variants
    const getButtonClasses = () => {
        const baseClasses = "transition-all";

        switch (variant) {
            case "minimal":
                return `${baseClasses} text-white/80 hover:text-white underline text-sm ${className}`;

            case "pill":
                return `${baseClasses} bg-white/10 hover:bg-white/20 text-white rounded-full px-4 py-1 text-sm font-medium ${className}`;

            case "default":
            default:
                return `${baseClasses} bg-white/10 hover:bg-white/20 text-white rounded-md px-3 py-1.5 text-sm font-medium ${className}`;
        }
    };

    return (
        <button
            onClick={toggleLanguage}
            className={getButtonClasses()}
            aria-label={`Switch to ${language === "en" ? "Spanish" : "English"}`}
        >
            <span className="flex items-center">
                {/* Language icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mr-1.5"
                >
                    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                    <path d="M3.6 9h16.8" />
                    <path d="M3.6 15h16.8" />
                    <path d="M12 3a15 15 0 0 1 0 18" />
                    <path d="M12 3a15 15 0 0 0 0 18" />
                </svg>

                {/* Show the language we would switch to */}
                {t("language.switch")}
            </span>
        </button>
    );
} 