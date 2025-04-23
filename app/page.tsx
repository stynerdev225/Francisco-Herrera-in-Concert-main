"use client"

import HeroSection from "@/components/hero-section"
import RotatingBanner from "@/rotating-banner"
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import SpecialGuests from '@/components/special-guests'
import Sponsors from '@/components/sponsors'

// Use dynamic import with no SSR for components that access language context
const MarketingSection = dynamic(() => import('@/components/marketing-section'), { ssr: false })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <RotatingBanner />
      <MarketingSection />
      <SpecialGuests />
      <Sponsors />
    </main>
  )
}
