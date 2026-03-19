"use client";
 
import { useScroll, useTransform, motion } from "framer-motion";
import { Italiana } from 'next/font/google';
import { useRef } from "react";
import ImageSequenceScroll from "./components/LandingShirt";
import MenuToggle from "./components/MenuToggle";
 
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
  
  // Control visibility of side headers
  const sideHeadersOpacity = useTransform(scrollYProgress, [0.1, 0.15], [0, 1]);
  
  // Shirt opacity and position
  const shirtOpacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);
  const shirtY = useTransform(scrollYProgress, [0, 0.9, 0.95], ["0%", "0%", "-100%"]);

  // Content box animations
  const div1Progress = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const div2Progress = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const div3Progress = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  
  // Blur overlay - appears in the 4th viewport and stays
  const blurProgress = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  // Individual box progress
  const box1Progress = div1Progress;
  const box2Progress = useTransform(scrollYProgress, [0.12, 0.2], [0, 1]);
  const box3Progress = div2Progress;
  const box4Progress = useTransform(scrollYProgress, [0.22, 0.3], [0, 1]);
  const box5Progress = div3Progress;
  const box6Progress = useTransform(scrollYProgress, [0.32, 0.4], [0, 1]);

  const handleCollectionClick = () => {
    console.log('Collection clicked!');
    // Add your navigation logic here
  };

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
          pointerEvents: 'auto',
        }}
      >
        <div className="h-full w-full flex items-center justify-center">
          {/* Left header */}
          <motion.div 
            id='header-divL' 
            className="h-full w-1/4 flex items-center justify-center tracking-widest"
            style={{ opacity: sideHeadersOpacity }}
          >
            <MenuToggle/>
          </motion.div>
          
          {/* Center header */}
          <div id='header-divC' className="h-full w-2/4 flex items-center justify-center">
            THREADVALE
          </div>
          
          {/* Right header */}
          <motion.div 
            id='header-divR' 
            className="h-full w-1/4 flex items-center justify-center tracking-widest"
            style={{ opacity: sideHeadersOpacity }}
          >
            <div className="h-auto w-auto px-[10px] py-[10px] flex items-center justify-center font-medium text-[17px]">
              <motion.img src='icons/account.png' 
                className="h-[27px] w-auto object-contain cursor-pointer"
                whileHover={{ scale: 1.1, opacity: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Shirt section - 4 viewports + blur overlay */}
      <div className="relative" style={{ height: '500vh' }}>
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
          
          {/* Box 1 - Top Left */}
          <motion.div 
            className="absolute top-[15%] left-[10%] max-w-xs z-10"
            style={{
              opacity: box1Progress,
              x: useTransform(box1Progress, [0, 1], [-20, 0]),
            }}
          >
            <h3 className="text-white/60 text-[17px] tracking-[0.2em] mb-3">MATERIAL & HAPTICS</h3>
            <p className="text-white/90 text-[14px] leading-relaxed">
              Sumptuous Pima cotton • Unprecedented softness • Breathable micro-architecture • Weightless against the skin • Temperature-regulating • Immaculately pre-shrunk
            </p>
          </motion.div>

          {/* Box 2 - Bottom Right */}
          <motion.div 
            className="absolute bottom-[15%] right-[10%] max-w-xs z-10"
            style={{
              opacity: box2Progress,
              x: useTransform(box2Progress, [0, 1], [20, 0]),
            }}
          >
            <h3 className="text-white/60 text-[17px] tracking-[0.2em] mb-3">ARTISANSHIP & CONSTRUCTION</h3>
            <p className="text-white/90 text-[14px] leading-relaxed">
              Meticulously reinforced seams • Hand-inspected finishing • Japanese ring-spun fabrication • Taped shoulder articulation • Heirloom-grade durability • Precision-engineered comfort
            </p>
          </motion.div>

          {/* Box 3 - Top Right */}
          <motion.div 
            className="absolute top-[15%] right-[10%] max-w-xs z-10"
            style={{
              opacity: box3Progress,
              x: useTransform(box3Progress, [0, 1], [20, 0]),
            }}
          >
            <h3 className="text-white/60 text-[17px] tracking-[0.2em] mb-3">SILHOUETTE & PRESENCE</h3>
            <p className="text-white/90 text-[14px] leading-relaxed">
              Architectural yet effortless • Timeless proportions • Impeccable drape • Discerningly versatile • Transcends seasons • The foundation of considered dressing
            </p>
          </motion.div>

          {/* Box 4 - Bottom Left */}
          <motion.div 
            className="absolute bottom-[15%] left-[10%] max-w-xs z-10"
            style={{
              opacity: box4Progress,
              x: useTransform(box4Progress, [0, 1], [-20, 0]),
            }}
          >
            <h3 className="text-white/60 text-[17px] tracking-[0.2em] mb-3">PHILOSOPHY & ETHOS</h3>
            <p className="text-white/90 text-[14px] leading-relaxed">
              Consciously cultivated • Artisanal integrity • Slow-made philosophy • Heritage craftsmanship • Minimalist sophistication • Quiet luxury
            </p>
          </motion.div>

          {/* Box 5 - Center Left */}
          <motion.div 
            className="absolute top-[40%] left-[10%] max-w-xs z-10"
            style={{
              opacity: box5Progress,
              x: useTransform(box5Progress, [0, 1], [-20, 0]),
            }}
          >
            <h3 className="text-white/60 text-[17px] tracking-[0.2em] mb-3">SENSORIAL EXPERIENCE</h3>
            <p className="text-white/90 text-[14px] leading-relaxed">
              Buttery hand-feel • Second-skin sublimity • Unencumbered movement • Barely-there existence • Tactile indulgence • Sensory refinement
            </p>
          </motion.div>

          {/* Box 6 - Center Right */}
          <motion.div 
            className="absolute top-[40%] right-[10%] max-w-xs z-10"
            style={{
              opacity: box6Progress,
              x: useTransform(box6Progress, [0, 1], [20, 0]),
            }}
          >
            <h3 className="text-white/60 text-[17px] tracking-[0.2em] mb-3">LONGEVITY & CHARACTER</h3>
            <p className="text-white/90 text-[14px] leading-relaxed">
              Designed to age gracefully • Patina of permanence • Defies obsolescence • Acquires character • Generational quality • Beyond ephemeral trends
            </p>
          </motion.div>

          {/* Floating Poetic Descriptors */}
          <motion.div className="absolute top-[70%] left-[20%] z-10" style={{ opacity: box5Progress }}>
            <p className="text-white/30 text-xs italic tracking-wide">"Luxuriously weightless"</p>
          </motion.div>
          <motion.div className="absolute top-[20%] left-[40%] z-10" style={{ opacity: box3Progress }}>
            <p className="text-white/20 text-xs italic tracking-wide">"Effortlessly elevated"</p>
          </motion.div>
          <motion.div className="absolute top-[60%] right-[25%] z-10" style={{ opacity: box6Progress }}>
            <p className="text-white/25 text-xs italic tracking-wide">"Tactile poetry"</p>
          </motion.div>
          <motion.div className="absolute top-[30%] left-[60%] z-10" style={{ opacity: box4Progress }}>
            <p className="text-white/20 text-xs italic tracking-wide">"Subtle sophistication"</p>
          </motion.div>
          <motion.div className="absolute bottom-[30%] left-[30%] z-10" style={{ opacity: box2Progress }}>
            <p className="text-white/25 text-xs italic tracking-wide">"Enduring elegance"</p>
          </motion.div>
          <motion.div className="absolute top-[45%] left-[45%] z-10" style={{ opacity: box1Progress }}>
            <p className="text-white/15 text-xs italic tracking-wide">"Unspoken luxury"</p>
          </motion.div>
        </motion.div>

        {/* BACKDROP BLUR OVERLAY - Completely separate from the sticky container */}
        <motion.div 
          className="sticky top-0 left-0 w-full h-screen pointer-events-auto z-40"
          style={{ 
            opacity: blurProgress,
          }}
        >
          <div className="absolute inset-0 backdrop-blur-xl bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative text-center">
              <div className="w-12 h-px bg-white/54 mx-auto mb-8" />
              <h2 className="text-white text-[54px] tracking-[0.2em]">SHOP THE</h2>
              <h2 className={`text-white text-[127px] font-extralight mb-6 tracking-[0.2em] ${it.className}`}>COLLECTION</h2>
              <button 
                onClick={handleCollectionClick}
                className="cursor-pointer inline-block"
              >
                <motion.img 
                  src='icons/collection.png' 
                  className="h-[27px] w-auto object-contain"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
              </button>
              <div className="w-12 h-px bg-white/54 mx-auto mt-8" />
            </div>
          </div>
        </motion.div>
        
        {/* Viewports */}
        <div className="h-screen w-full relative z-0" /> {/* Div1 */}
        <div className="h-screen w-full relative z-0" /> {/* Div2 */}
        <div className="h-screen w-full relative z-0" /> {/* Div3 */}
        <div className="h-screen w-full relative z-0" /> {/* Div4 - Blur becomes visible */}
        <div className="h-screen w-full relative z-0" /> {/* Div5 - Blur fully visible */}
      </div>

      {/* Regular content after shirt section */}
      <div className="h-screen w-full flex items-center justify-center bg-white relative z-30">
        <p className="text-2xl text-gray-400">Div6 - No shirt</p>
      </div>
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 relative z-30">
        <p className="text-2xl text-gray-400">Div7</p>
      </div>
      <div className="h-screen w-full flex items-center justify-center bg-white relative z-30">
        <p className="text-2xl text-gray-400">Div8</p>
      </div>
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 relative z-30">
        <p className="text-2xl text-gray-400">Div9</p>
      </div>
    </div>
  );
}