'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log('Menu clicked!', isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <motion.button
      onClick={toggleMenu}
      className="px-[10px] py-[4px] flex items-center justify-center cursor-pointer relative z-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-[47px] h-[24px] flex items-center justify-center gap-[2px]">
        {/* Top line */}
        <motion.div
          className="absolute w-[47px] h-[1.17px] bg-white"
          style={{ originX: 0.5, originY: 0.5 }}
          animate={{
            rotate: isOpen ? 45 : 0,
            top: isOpen ? '11px' : '2px',
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Bottom line */}
        <motion.div
          className="absolute w-[47px] h-[1.17px] bg-white"
          style={{ originX: 0.5, originY: 0.5 }}
          animate={{
            rotate: isOpen ? -45 : 0,
            top: isOpen ? '11px' : '20px',
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.button>
  );
}