"use client"

import HeroSection from "@/components/hero-section"
import RotatingBanner from "@/rotating-banner"
import dynamic from 'next/dynamic'
import SpecialGuests from '@/components/special-guests'
import Sponsors from '@/components/sponsors'
import BuyTicketsSection from "@/components/buy-tickets-section"
import { useEffect } from 'react'

// Use dynamic import with no SSR for components that access language context
const MarketingSection = dynamic(() => import('@/components/marketing-section'), { ssr: false })

export default function Home() {
  // Add a global fix when on homepage
  useEffect(() => {
    // Create direct ticket links that will be positioned on top of any problematic elements
    const addEmergencyTicketsLinks = () => {
      // Wait until DOM is fully loaded
      if (document.readyState !== 'complete') {
        window.addEventListener('load', addEmergencyTicketsLinks);
        return;
      }

      // Desktop navbar ticket link area
      const desktopLink = document.createElement('a');
      desktopLink.id = 'desktop-emergency-tickets';
      desktopLink.href = '/tickets';
      desktopLink.style.position = 'fixed';
      desktopLink.style.top = '0';
      desktopLink.style.right = '160px';
      desktopLink.style.width = '160px';
      desktopLink.style.height = '70px';
      desktopLink.style.zIndex = '9999';
      desktopLink.style.opacity = '0';
      desktopLink.style.cursor = 'pointer';
      desktopLink.style.display = 'block';
      desktopLink.setAttribute('aria-label', 'Emergency Buy Tickets Link');

      // Mobile menu ticket link area
      const mobileLink = document.createElement('a');
      mobileLink.id = 'mobile-emergency-tickets';
      mobileLink.href = '/tickets';
      mobileLink.style.position = 'fixed';
      mobileLink.style.top = '100px';
      mobileLink.style.right = '10px';
      mobileLink.style.width = '80px';
      mobileLink.style.height = '40px';
      mobileLink.style.zIndex = '9999';
      mobileLink.style.opacity = '0';
      mobileLink.style.cursor = 'pointer';
      mobileLink.style.display = 'block';
      mobileLink.setAttribute('aria-label', 'Emergency Buy Tickets Link Mobile');

      // Only add if not already present
      if (!document.getElementById('desktop-emergency-tickets')) {
        document.body.appendChild(desktopLink);
      }

      if (!document.getElementById('mobile-emergency-tickets')) {
        document.body.appendChild(mobileLink);
      }
    };

    // Execute immediately and also on page load
    addEmergencyTicketsLinks();

    // Cleanup when component unmounts
    return () => {
      const desktopLink = document.getElementById('desktop-emergency-tickets');
      const mobileLink = document.getElementById('mobile-emergency-tickets');
      if (desktopLink) document.body.removeChild(desktopLink);
      if (mobileLink) document.body.removeChild(mobileLink);
      window.removeEventListener('load', addEmergencyTicketsLinks);
    };
  }, []);

  return (
    <main className="flex flex-col w-full move-together relative">
      <HeroSection />
      <RotatingBanner />
      <BuyTicketsSection />
      <MarketingSection />
      <SpecialGuests />
      <Sponsors />
    </main>
  )
}
