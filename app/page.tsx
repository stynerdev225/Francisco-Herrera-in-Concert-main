"use client"

import HeroSection from "@/components/hero-section"
import RotatingBanner from "@/rotating-banner"
import dynamic from 'next/dynamic'
import SpecialGuests from '@/components/special-guests'
import Sponsors from '@/components/sponsors'
import BuyTicketsSection from "@/components/buy-tickets-section"

// Use dynamic import with no SSR for components that access language context
const MarketingSection = dynamic(() => import('@/components/marketing-section'), { ssr: false })

export default function Home() {
  return (
    <main className="flex flex-col w-full move-together">
      <HeroSection />
      <RotatingBanner />
      <BuyTicketsSection />
      <MarketingSection />
      <SpecialGuests />
      <Sponsors />
    </main>
  )
}
