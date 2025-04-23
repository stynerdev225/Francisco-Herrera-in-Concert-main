import MusicSection from "@/components/music-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Francisco Herrera - Music",
    description: "Browse and purchase music by Francisco Herrera. Life, Joys, Struggle, Triumphs, Dignity of Migrant People in Song.",
}

export default function MusicPage() {
    return <MusicSection />
} 