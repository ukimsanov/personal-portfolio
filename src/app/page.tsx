import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <Header />
        <Hero />
        <Projects />
        <Skills />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}