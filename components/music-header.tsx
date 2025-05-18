import Link from 'next/link'
import { useLanguage } from "@/context/LanguageContext"
import { FaMusic } from 'react-icons/fa'
import { useEffect } from 'react'

// Define animation styles
const animationStyles = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes glow {
  0%, 100% { filter: drop-shadow(0 0 3px rgba(239, 68, 68, 0.7)); }
  50% { filter: drop-shadow(0 0 10px rgba(239, 68, 68, 1)); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
}

@keyframes slide-up {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes width {
  0% { width: 0; opacity: 0; }
  100% { width: 100%; opacity: 1; }
}

@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 0.6s ease-out forwards;
}

.animate-width {
  animation: width 1s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-700 {
  animation-delay: 0.7s;
}
`;

export default function MusicHeader() {
    // Add animation styles to document head
    useEffect(() => {
        const styleEl = document.createElement('style');
        styleEl.textContent = animationStyles;
        document.head.appendChild(styleEl);

        return () => {
            document.head.removeChild(styleEl);
        };
    }, []);
    const { t, language } = useLanguage()

    return (
        <div className="sticky top-0 pt-16 sm:pt-12 md:pt-16 pb-2 sm:pb-10 md:pb-12 z-30 bg-gradient-to-r from-purple-700 via-blue-600 to-purple-700">
            <div className="container mx-auto text-center px-4">
                <div className="flex flex-col items-center justify-center">
                    {/* Main F.HERRERA title with animated 3D effect */}
                    <div className="relative inline-flex items-center justify-center flex-wrap mt-4 sm:mt-0">
                        <span className="text-red-500 text-3xl sm:text-4xl md:text-6xl font-bold mr-1 sm:mr-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] animate-pulse">•</span>
                        <span className="relative text-red-500 text-4xl sm:text-6xl md:text-8xl font-black drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] animate-bounce-slow">
                            <span className="absolute inset-0 blur-[1px] opacity-60 text-red-400 animate-glow">F.</span>
                            F.
                        </span>
                        <span className="relative text-white text-4xl sm:text-6xl md:text-8xl font-black tracking-tight drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] hover:translate-y-[1px] transition-transform animate-float">HERRERA</span>
                        <span className="text-red-500 text-3xl sm:text-4xl md:text-6xl font-bold ml-1 sm:ml-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] animate-pulse animation-delay-700">•</span>
                    </div>

                    {/* Latest Music subtitle with 3D effect and animation */}
                    <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-wide mt-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] animate-slide-up animation-delay-300">
                        {t("latest.music")}
                    </h2>

                    {/* Red line separator with animation */}
                    <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 w-32 sm:w-48 md:w-64 mx-auto mt-4 mb-6 drop-shadow-md animate-width animation-delay-500"></div>

                    {/* Prominent music button with enhanced pulse and glow animations */}
                    <Link
                        href="https://music.franciscoherreramusic.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold rounded-full px-8 py-4 text-xl uppercase tracking-wide transition-all duration-300 ease-in-out pulse-animation drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)] hover:translate-y-[1px] flex items-center justify-center gap-3 transform hover:scale-105 animate-fade-in animation-delay-700 relative"
                    >
                        <span className="absolute inset-0 rounded-full bg-red-500 blur-md opacity-40 animate-pulse-slow"></span>
                        <FaMusic className="text-xl relative z-10 animate-spin-slow" />
                        <span className="relative z-10">{language === "en" ? "LISTEN + PURCHASE" : "ESCUCHAR + COMPRAR"}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}