// app/layout.tsx

import * as React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import BackgroundMusic from "@/components/BackgroundMusic"
import { LanguageProvider } from "@/context/LanguageContext"
import { MusicProvider } from "@/context/MusicContext"
import Footer from "@/components/footer"
import dynamic from "next/dynamic"
import HeroSection from "@/components/hero-section"

const Navigation = dynamic(() => import("@/components/Navigation"), { ssr: false })

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Francisco Herrera in Concert",
  description: "Migration Strengthens The Nation - La Migración Fortalece La Nación",
  generator: "v0.dev",
  openGraph: {
    title: "Francisco Herrera in Concert",
    description: "Migration Strengthens The Nation - La Migración Fortalece La Nación",
    images: [
      {
        url: "https://pub-28e558b74ea64a0781531927a8b49e0e.r2.dev/concer-websitethuimbnail.png",
        width: 1200,
        height: 630,
        alt: "Francisco Herrera Concert Thumbnail",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Francisco Herrera in Concert",
    description: "Migration Strengthens The Nation - La Migración Fortalece La Nación",
    images: [
      "https://pub-28e558b74ea64a0781531927a8b49e0e.r2.dev/concer-websitethuimbnail.png",
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <LanguageProvider>
          <MusicProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
              <Navigation />
              {children}
              <Footer />
              <BackgroundMusic snippetDuration={45} volumeLevel={0.15} />
            </ThemeProvider>
          </MusicProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
