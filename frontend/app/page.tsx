"use client";
 
import { useScroll, useTransform, motion } from "framer-motion";
import { Italiana } from 'next/font/google';
import { useRef } from "react";
import ImageSequenceScroll from "./components/LandingShirt";
 
const it = Italiana({ weight: ['400'] });
 
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
 
  const fontSize = useTransform(scrollYProgress, [0, 0.1], ["clamp(277px, 20vw, 400px)", "54px"]);
  const top = useTransform(scrollYProgress, [0, 0.1], ["100%", "0%"]);
  const translateY = useTransform(scrollYProgress, [0, 0.1], ["-100%", "0%"]);
  const paddingY = useTransform(scrollYProgress, [0, 0.1], ["0px", "16px"]);
  const color = useTransform(scrollYProgress, [0, 0.1], ["#ffffff", "#ffffff"]);
  
  // Shirt opacity - fades out at the very end of Div4
  const shirtOpacity = useTransform(scrollYProgress, [0.6, 0.7], [1, 0]);
  
  // Shirt Y position - stays fixed until end of Div4, then scrolls away
  const shirtY = useTransform(scrollYProgress, [0, 0.7, 0.75], ["0%", "0%", "-100%"]);

  return (
    <div ref={containerRef} className="relative bg-white">
      {/* THREADVALE text - fixed overlay */}
      <motion.div
        className={`fixed left-0 right-0 flex items-center justify-center z-50 ${it.className}`}
        style={{
          top,
          translateY,
          paddingTop: paddingY,
          paddingBottom: paddingY,
          fontSize,
          color,
          textShadow: "0 0 20px rgba(0,0,0,0.5)",
          pointerEvents: 'none',
        }}
      >
        THREADVALE
      </motion.div>

      {/* Shirt section - exactly 4 viewports */}
      <div className="relative" style={{ height: '400vh' }}>
        {/* Shirt animation - sticky within this container */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-screen"
          style={{
            y: shirtY,
            opacity: shirtOpacity,
            position: 'sticky',
            top: 0,
          }}
        >
          <ImageSequenceScroll/>
        </motion.div>
        
        {/* First viewport - Div1 with shirt (no overlay) */}
        <div className="h-screen w-full relative z-10">
          {/* Empty - shirt shows through */}
        </div>
        
        {/* Second viewport - Div2 with semi-transparent overlay */}
        <div className="h-screen w-full flex items-center justify-center relative z-20">
          <div className="bg-amber-400/70 w-full h-full flex items-center justify-center backdrop-blur-sm">
            <p className="text-2xl text-black font-bold">Div2 - Semi-transparent</p>
          </div>
        </div>

        {/* Third viewport - Div3 with more opaque overlay */}
        <div className="h-screen w-full flex items-center justify-center relative z-20">
          <div className="bg-emerald-400/80 w-full h-full flex items-center justify-center backdrop-blur-sm">
            <p className="text-2xl text-black font-bold">Div3 - More opaque</p>
          </div>
        </div>

        {/* Fourth viewport - Div4 with solid overlay (shirt fades out here) */}
        <div className="h-screen w-full flex items-center justify-center relative z-20">
          <div className="bg-rose-400 w-full h-full flex items-center justify-center">
            <p className="text-2xl text-black font-bold">Div4 - Solid, shirt fading</p>
          </div>
        </div>
      </div>

      {/* Fifth viewport and beyond - regular content, no shirt */}
      <div className="h-screen w-full flex items-center justify-center bg-white relative z-30">
        <p className="text-2xl text-gray-400">Div5 - No shirt</p>
      </div>

      <div className="h-screen w-full flex items-center justify-center bg-gray-50 relative z-30">
        <p className="text-2xl text-gray-400">Div6</p>
      </div>

      <div className="h-screen w-full flex items-center justify-center bg-white relative z-30">
        <p className="text-2xl text-gray-400">Div7</p>
      </div>

      <div className="h-screen w-full flex items-center justify-center bg-gray-50 relative z-30">
        <p className="text-2xl text-gray-400">Div8</p>
      </div>
    </div>
  );
}