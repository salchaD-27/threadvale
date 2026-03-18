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
    offset: ["start start", "end start"]
  });
 
  const fontSize = useTransform(scrollYProgress, [0, 0.3], ["clamp(277px, 20vw, 400px)", "54px"]);
  const top = useTransform(scrollYProgress, [0, 0.3], ["100%", "0%"]);
  const translateY = useTransform(scrollYProgress, [0, 0.3], ["-100%", "0%"]);
  const paddingY = useTransform(scrollYProgress, [0, 0.3], ["0px", "16px"]);
  const height = useTransform(scrollYProgress, [0, 0.3], ["100vh", "70px"]);
  const backgroundColor = useTransform(scrollYProgress, [0, 0.3], ["rgba(0,0,0,1)", "rgba(0,0,0,1)"]);
  const color = useTransform(scrollYProgress, [0, 0.3], ["#ffffff", "#ffffff"]);
//   const color = useTransform(scrollYProgress, [0, 0.3], ["#000000", "#000000"]);
 
  return (
    <div ref={containerRef} className="relative">
      <div className="h-[150vh] w-[100vw] bg-black">
        <ImageSequenceScroll/>
        <motion.div
          className={`fixed left-0 right-0 flex items-center justify-center z-50 ${it.className}`}
          style={{
            top,
            translateY,
            paddingTop: paddingY,
            paddingBottom: paddingY,
            fontSize,
            color,
            // backgroundColor,
            // height,
          }}
        >
          THREADVALE
        </motion.div>
      </div>
 
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <p className="text-2xl text-gray-400">Div2</p>
      </div>
 
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <p className="text-2xl text-gray-400">Div3</p>
      </div>

    </div>
  );
}