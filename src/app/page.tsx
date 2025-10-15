import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { DotBackground } from "@/components/ui/grid-background";

export default function Home() {
  return (
    <DotBackground className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <Header />
        <Hero />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </DotBackground>
  );
}