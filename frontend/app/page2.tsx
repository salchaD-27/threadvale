"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Italiana } from 'next/font/google';
import { useRef } from "react";

const it = Italiana({ weight: ['400'] });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // THREADVALE animation
  const threadvaleFontSize = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["400px", "17px"]
  );
  
  const threadvaleY = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["0%", "-45%"]
  );

  // Section 1: About
  const aboutOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.3, 0.4],
    [0, 1, 1, 0]
  );
  
  const aboutScale = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.4],
    [0.8, 1, 0.8]
  );

  // Section 2: Work
  const workOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5, 0.6],
    [0, 1, 1, 0]
  );

  // Section 3: Contact
  const contactOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7, 0.8],
    [0, 1, 1, 0]
  );

  // Header backgrounds opacity
  const aboutHeaderBg = useTransform(
    scrollYProgress,
    [0.15, 0.25],
    [0, 1]
  );
  
  const workHeaderBg = useTransform(
    scrollYProgress,
    [0.35, 0.45],
    [0, 1]
  );
  
  const contactHeaderBg = useTransform(
    scrollYProgress,
    [0.55, 0.65],
    [0, 1]
  );

  return (
    <div ref={containerRef} className="relative bg-white">
      {/* Persistent THREADVALE header that shrinks */}
      <motion.div 
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-center pointer-events-none"
        style={{
          height: useTransform(scrollYProgress, [0, 0.15], ["100vh", "64px"]),
          backgroundColor: useTransform(
            scrollYProgress,
            [0, 0.15],
            ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"]
          ),
          backdropFilter: useTransform(
            scrollYProgress,
            [0, 0.15],
            ["blur(0px)", "blur(8px)"]
          ),
          borderBottom: useTransform(
            scrollYProgress,
            [0, 0.15],
            ["none", "1px solid rgba(0,0,0,0.1)"]
          )
        }}
      >
        <motion.div
          style={{
            fontSize: threadvaleFontSize,
            y: threadvaleY,
          }}
          className={`text-black whitespace-nowrap ${it.className}`}
        >
          THREADVALE
        </motion.div>
      </motion.div>

      {/* Spacer for initial view */}
      <div className="h-[100vh] w-full" />

      {/* Section 1 - About */}
      <section className="relative min-h-[100vh] w-full">
        {/* About Header - becomes fixed */}
        <motion.div 
          className="sticky top-0 left-0 w-full h-16 z-40 flex items-center justify-center"
          style={{
            backgroundColor: useTransform(aboutHeaderBg, (v) => `rgba(239, 246, 255, ${v})`),
            backdropFilter: "blur(8px)",
            borderBottom: useTransform(
              aboutHeaderBg,
              (v) => v > 0.5 ? "1px solid rgba(0,0,0,0.1)" : "none"
            )
          }}
        >
          <motion.span 
            className="text-sm font-medium text-gray-700"
            style={{ opacity: aboutHeaderBg }}
          >
            ABOUT
          </motion.span>
        </motion.div>

        {/* About Content */}
        <div className="h-[100vh] w-full flex items-center justify-center">
          <motion.div 
            className="max-w-2xl mx-auto px-4 text-center"
            style={{
              opacity: aboutOpacity,
              scale: aboutScale,
            }}
          >
            <h2 className="text-5xl mb-6 font-light">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Threadvale began as a simple idea: to weave together creativity and purpose. 
              What started as a small collective has grown into a sanctuary for innovative thinking.
            </p>
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-blue-50 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">0{i}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 - Work */}
      <section className="relative min-h-[100vh] w-full">
        {/* Work Header - becomes fixed */}
        <motion.div 
          className="sticky top-0 left-0 w-full h-16 z-30 flex items-center justify-center"
          style={{
            backgroundColor: useTransform(workHeaderBg, (v) => `rgba(254, 242, 242, ${v})`),
            backdropFilter: "blur(8px)",
            borderBottom: useTransform(
              workHeaderBg,
              (v) => v > 0.5 ? "1px solid rgba(0,0,0,0.1)" : "none"
            )
          }}
        >
          <motion.span 
            className="text-sm font-medium text-gray-700"
            style={{ opacity: workHeaderBg }}
          >
            WORK
          </motion.span>
        </motion.div>

        {/* Work Content */}
        <div className="h-[100vh] w-full flex items-center justify-center">
          <motion.div 
            className="max-w-4xl mx-auto px-4 text-center"
            style={{
              opacity: workOpacity,
              scale: useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0.8, 1, 0.8]),
            }}
          >
            <h2 className="text-5xl mb-6 font-light">Selected Projects</h2>
            <p className="text-lg text-gray-600 mb-12">
              A collection of our finest work, crafted with attention to every detail.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-red-50 rounded-lg flex items-center justify-center">
                  <span className="text-red-600">Project {i}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Contact */}
      <section className="relative min-h-[100vh] w-full">
        {/* Contact Header - becomes fixed */}
        <motion.div 
          className="sticky top-0 left-0 w-full h-16 z-20 flex items-center justify-center"
          style={{
            backgroundColor: useTransform(contactHeaderBg, (v) => `rgba(236, 253, 245, ${v})`),
            backdropFilter: "blur(8px)",
            borderBottom: useTransform(
              contactHeaderBg,
              (v) => v > 0.5 ? "1px solid rgba(0,0,0,0.1)" : "none"
            )
          }}
        >
          <motion.span 
            className="text-sm font-medium text-gray-700"
            style={{ opacity: contactHeaderBg }}
          >
            CONTACT
          </motion.span>
        </motion.div>

        {/* Contact Content */}
        <div className="h-[100vh] w-full flex items-center justify-center">
          <motion.div 
            className="max-w-2xl mx-auto px-4 text-center"
            style={{
              opacity: contactOpacity,
              scale: useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0.8, 1, 0.8]),
            }}
          >
            <h2 className="text-5xl mb-6 font-light">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-12">
              Ready to start a conversation? We'd love to hear from you.
            </p>
            <div className="space-y-4">
              <div className="h-14 bg-emerald-50 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600">hello@threadvale.com</span>
              </div>
              <div className="h-14 bg-emerald-50 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600">+1 (555) 123-4567</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="h-[50vh] w-full bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm mb-4 opacity-60">© 2024 THREADVALE</p>
          <p className="text-xs opacity-40">Designed with motion in mind</p>
        </div>
      </section>
    </div>
  );
}