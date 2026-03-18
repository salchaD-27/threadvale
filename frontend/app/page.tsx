"use client";
 
import { useScroll, useTransform, motion } from "framer-motion";
import { Italiana } from 'next/font/google';
import { useRef } from "react";
 
const it = Italiana({ weight: ['400'] });
 
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
 
  const fontSize = useTransform(scrollYProgress, [0, 0.3], ["clamp(277px, 20vw, 400px)", "54px"]);
  const top = useTransform(scrollYProgress, [0, 0.3], ["50%", "0%"]);
  const translateY = useTransform(scrollYProgress, [0, 0.3], ["-50%", "0%"]);
  const paddingY = useTransform(scrollYProgress, [0, 0.3], ["0px", "16px"]);
  const height = useTransform(scrollYProgress, [0, 0.3], ["100vh", "70px"]); // Added this line
  const backgroundColor = useTransform(scrollYProgress, [0, 0.3], ["rgba(0,0,0,1)", "rgba(0,0,0,1)"]);
  const color = useTransform(scrollYProgress, [0, 0.3], ["#ffffff", "#ffffff"]);
 
  return (
    <div ref={containerRef} className="relative">
 
      {/* Tall scroll region — gives scroll distance for the animation to run */}
      <div className="h-[150vh] w-[100vw] flex items-center justify-center bg-black">
        <motion.div
          className={`fixed left-0 right-0 flex items-center justify-center z-50 ${it.className}`}
          style={{
            top,
            translateY,
            paddingTop: paddingY,
            paddingBottom: paddingY,
            fontSize,
            color,
            backgroundColor
          }}
        >
          THREADVALE
        </motion.div>
      </div>
 
      {/* Content sections — sit naturally below the scroll region */}
      <section className="h-screen w-full flex items-center justify-center bg-white">
        <p className="text-2xl text-gray-400">Section 1</p>
      </section>
 
      <section className="h-screen w-full flex items-center justify-center bg-gray-50">
        <p className="text-2xl text-gray-400">Section 2</p>
      </section>
 
      <section className="h-screen w-full flex items-center justify-center bg-white">
        <p className="text-2xl text-gray-400">Section 3</p>
      </section>
 
    </div>
  );
}