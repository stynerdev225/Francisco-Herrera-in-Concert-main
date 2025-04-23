import Link from 'next/link'
import { useLanguage } from "@/context/LanguageContext"
import { FaMusic } from 'react-icons/fa'

export default function MusicHeader() {
    const { t, language } = useLanguage()

    return (
        <div className="sticky top-0 pt-4 sm:pt-12 md:pt-16 pb-2 sm:pb-10 md:pb-12 z-30 bg-gradient-to-r from-purple-700 via-blue-600 to-purple-700">
            <div className="container mx-auto text-center px-4">
                <div className="flex flex-col items-center justify-center">
                    {/* Main F.HERRERA title with enhanced 3D effect */}
                    <div className="relative inline-flex items-center justify-center">
                        <span className="text-red-500 text-4xl sm:text-5xl md:text-6xl font-bold mr-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">•</span>
                        <span className="relative text-red-500 text-6xl sm:text-7xl md:text-8xl font-black drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]">
                            <span className="absolute inset-0 blur-[1px] opacity-60 text-red-400">F.</span>
                            F.
                        </span>
                        <span className="relative text-white text-6xl sm:text-7xl md:text-8xl font-black tracking-tight drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] hover:translate-y-[1px] transition-transform">HERRERA</span>
                        <span className="text-red-500 text-4xl sm:text-5xl md:text-6xl font-bold ml-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">•</span>
                    </div>

                    {/* Latest Music subtitle with 3D effect */}
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide mt-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
                        {t("latest.music")}
                    </h2>

                    {/* Red line separator */}
                    <div className="h-1 bg-red-500 w-32 sm:w-48 md:w-64 mx-auto mt-4 mb-6 drop-shadow-md"></div>

                    {/* Prominent music button with pulse animation */}
                    <Link 
                        href="https://music.franciscoherreramusic.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full px-8 py-4 text-xl uppercase tracking-wide transition-all duration-300 ease-in-out pulse-animation drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)] hover:translate-y-[1px] flex items-center justify-center gap-3 transform hover:scale-105"
                    >
                        <FaMusic className="text-xl" />
                        <span>{language === "en" ? "LISTEN + PURCHASE" : "ESCUCHAR + COMPRAR"}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
} 