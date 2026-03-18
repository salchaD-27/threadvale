'use client'
import React, { useRef, useEffect, useState, useCallback } from 'react';

const ImageSequenceScroll: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const rafId = useRef<number | null>(null); // Fixed: provide null as initial value
  const currentFrameRef = useRef<number>(0);
  const totalFrames = 150; // Match your extracted frame count

  useEffect(() => {
    // Preload all frames
    const loadFrames = async () => {
      const framePromises: Promise<HTMLImageElement>[] = [];
      
      for (let i = 1; i <= totalFrames; i++) {
        framePromises.push(new Promise((resolve) => {
          const img = new Image();
          img.decoding = 'async';
          img.src = `/frames/frame_${String(i).padStart(4, '0')}.jpg`;
          img.onload = () => resolve(img);
        }));
      }

      const loadedFrames = await Promise.all(framePromises);
      setFrames(loadedFrames);
      setLoaded(true);
    };

    loadFrames();
  }, []);

  const updateFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !frames[frameIndex]) return;

    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true 
    });
    if (!ctx) return;

    // Only draw if frame changed
    if (frameIndex !== currentFrameRef.current) {
      ctx.drawImage(frames[frameIndex], 0, 0, canvas.width, canvas.height);
      currentFrameRef.current = frameIndex;
    }
  }, [frames]);

  useEffect(() => {
    if (!loaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw first frame
    updateFrame(0);

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      
      rafId.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
        
        // Calculate frame index
        const frameIndex = Math.floor(progress * (totalFrames - 1));
        
        updateFrame(frameIndex);
        rafId.current = null; // Changed from undefined to null
      });
    };

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateFrame(currentFrameRef.current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [loaded, updateFrame]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'contain',
        pointerEvents: 'none',
        backgroundColor: 'black',
        imageRendering: 'auto',
      }}
    />
  );
};

export default ImageSequenceScroll;