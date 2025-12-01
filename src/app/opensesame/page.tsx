import type { Metadata } from 'next';
import { HeroSection } from './components/HeroSection';
import { BuilderSection } from './components/BuilderSection';
import { VisionSection } from './components/VisionSection';
import { AIFutureSection } from './components/AIFutureSection';
import { CTASection } from './components/CTASection';
import { ScrollProgress } from './components/ScrollProgress';

export const metadata: Metadata = {
  title: 'OpenSesame Application | Ular Kimsanov',
  description: 'A creative project submission showcasing how AI, education, and curiosity intersect in my journey as a software engineer.',
  openGraph: {
    title: 'OpenSesame Application - Ular Kimsanov',
    description: 'Building bridges between learning and technology',
    type: 'website',
    url: 'https://ularkimsanov.com/opensesame',
    siteName: 'Ular Kimsanov Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenSesame Application | Ular Kimsanov',
    description: 'A creative project showcasing AI, education, and curiosity',
  },
};

export default function OpenSesamePage() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Hero Section */}
      <HeroSection />

      {/* Builder Section - Who I am and what I bring */}
      <BuilderSection />

      {/* Vision Section - The pattern and multiplier effect */}
      <VisionSection />

      {/* AI Future Section - Why AI in learning excites me */}
      <AIFutureSection />

      {/* CTA Section - Let's build together */}
      <CTASection />
    </main>
  );
}
