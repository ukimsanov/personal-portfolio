"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import { Highlighter } from "@/components/ui/highlighter";
import { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";

const Contact = () => {
  const shouldReduceMotion = useReducedMotion();
  const [calLoaded, setCalLoaded] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        console.log('[Cal.com Debug] Initializing Cal.com embed...');
        
        // Initialize both namespaces
        const cal15 = await getCalApi({ namespace: "15min" });
        const cal30 = await getCalApi({ namespace: "30min" });
        
        console.log('[Cal.com Debug] Cal API loaded successfully');
        
        // Configure UI for both
        cal15("ui", {
          theme: "auto",
          styles: { branding: { brandColor: "#3b82f6" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        
        cal30("ui", {
          theme: "auto",
          styles: { branding: { brandColor: "#3b82f6" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        
        console.log('[Cal.com Debug] UI configured for both calendars');
        setCalLoaded(true);
      } catch (error) {
        console.error('[Cal.com Debug] Error initializing Cal.com:', error);
      }
    })();
  }, []);

  const handleCalClick = async (duration: '15min' | '30min') => {
    try {
      console.log(`[Cal.com Debug] Opening ${duration} modal...`);
      console.log('[Cal.com Debug] User agent:', navigator.userAgent);
      console.log('[Cal.com Debug] Window dimensions:', {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio
      });
      
      const cal = await getCalApi({ namespace: duration });
      
      console.log(`[Cal.com Debug] Opening modal for ${duration}...`);
      
      // Simply open the modal - UI config is already set in useEffect
      cal("modal", {
        calLink: `ukimsanov/${duration}`,
        config: {
          layout: "month_view",
        }
      });
      
      console.log('[Cal.com Debug] Modal opened successfully');
      
      // Check if modal element was created
      setTimeout(() => {
        const modalElements = document.querySelectorAll('cal-modal-box');
        console.log('[Cal.com Debug] Modal elements found:', modalElements.length);
        modalElements.forEach((el, idx) => {
          console.log(`[Cal.com Debug] Modal ${idx}:`, {
            state: el.getAttribute('state'),
            uid: el.getAttribute('uid'),
            display: window.getComputedStyle(el).display,
            visibility: window.getComputedStyle(el).visibility,
            zIndex: window.getComputedStyle(el).zIndex,
            position: window.getComputedStyle(el).position,
            opacity: window.getComputedStyle(el).opacity,
          });
        });
      }, 500);
      
    } catch (error) {
      console.error('[Cal.com Debug] Error opening modal:', error);
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 20 : 50
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 sm:py-20 w-full flex flex-col items-center"
    >
      <motion.h2
        initial={{
          opacity: 0,
          y: shouldReduceMotion ? 10 : 30
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.5,
          delay: shouldReduceMotion ? 0.05 : 0.1,
          ease: [0.25, 0.1, 0.25, 1] as const
        }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-8 text-center"
      >
        Get In Touch
      </motion.h2>

      <motion.p
        initial={{
          opacity: 0,
          y: shouldReduceMotion ? 10 : 20
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.5,
          delay: shouldReduceMotion ? 0.1 : 0.2,
          ease: [0.25, 0.1, 0.25, 1] as const
        }}
        viewport={{ once: true }}
        className="mb-10 sm:mb-12 leading-relaxed max-w-2xl text-center text-muted-foreground relative"
        style={{ position: 'relative', isolation: 'isolate' }}
      >
        I&apos;m always interested in <Highlighter action="underline" color="#06b6d4" strokeWidth={1.5} animationDuration={1200} delay={1000} isView={true}>new opportunities</Highlighter> and <Highlighter action="underline" color="#818cf8" strokeWidth={1.5} animationDuration={1000} delay={1600} isView={true}>exciting projects</Highlighter>.
        Whether you want to send a message or <Highlighter action="underline" color="#fb7185" strokeWidth={1.5} animationDuration={1200} delay={2200} isView={true}>schedule a call</Highlighter>,
        feel free to reach out!
      </motion.p>

      <motion.div
        initial={{
          opacity: 0,
          y: shouldReduceMotion ? 10 : 30
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.5,
          delay: shouldReduceMotion ? 0.15 : 0.3,
          ease: [0.25, 0.1, 0.25, 1] as const
        }}
        viewport={{ once: true }}
        className="w-full max-w-2xl mx-auto"
      >
        <Tabs defaultValue="message" className="w-full">
          <TabsList className="w-full mb-2">
            <TabsTrigger value="message" className="flex-1">Send Message</TabsTrigger>
            <TabsTrigger value="call" className="flex-1">Book a Call</TabsTrigger>
          </TabsList>

          <TabsContent value="message">
            <ContactForm />
          </TabsContent>

          <TabsContent value="call">
            <Card className="w-full">
              <div className="px-4 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-4 space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Choose a time slot that works for you
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleCalClick('15min')}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-left w-full"
                  >
                    <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div>
                      <div className="text-sm font-medium">15 Minutes</div>
                      <div className="text-xs text-muted-foreground">Quick chat</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCalClick('30min')}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-left w-full"
                  >
                    <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div>
                      <div className="text-sm font-medium">30 Minutes</div>
                      <div className="text-xs text-muted-foreground">In-depth discussion</div>
                    </div>
                  </button>
                </div>
                
                {calLoaded && (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    ✓ Calendar loaded
                  </p>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
