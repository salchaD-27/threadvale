'use client'
import React, { useRef, useEffect, useState, useCallback } from 'react';

const ImageSequenceScroll: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const rafId = useRef<number | null>(null);
  const currentFrameRef = useRef<number>(0);
  const totalFrames = 150;

  useEffect(() => {
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

    // Ensure canvas has dimensions
    if (canvas.width === 0 || canvas.height === 0) {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    }

    if (frameIndex !== currentFrameRef.current) {
      ctx.drawImage(frames[frameIndex], 0, 0, canvas.width, canvas.height);
      currentFrameRef.current = frameIndex;
    }
  }, [frames]);

  // Set canvas dimensions and draw first frame as soon as component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasDimensions = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    return () => window.removeEventListener('resize', setCanvasDimensions);
  }, []);

  // Draw frame 0 as soon as frames are loaded
  useEffect(() => {
    if (!loaded || !canvasRef.current || frames.length === 0) return;
    
    // Force a redraw of frame 0
    currentFrameRef.current = -1; // Reset to force redraw
    updateFrame(0);
  }, [loaded, frames, updateFrame]);

  useEffect(() => {
    if (!loaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    
    const updateCanvasSize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        // Redraw current frame after resize
        updateFrame(currentFrameRef.current);
      }
    };

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      
      rafId.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
        
        // Map progress to use all frames within first 70% of scroll (4 viewports)
        const adjustedProgress = Math.min(progress / 0.7, 1);
        const frameIndex = Math.floor(adjustedProgress * (totalFrames - 1));
        
        if (frameIndex < totalFrames) {
          updateFrame(frameIndex);
        }
        
        rafId.current = null;
      });
    };

    // Set initial frame
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
    const adjustedProgress = Math.min(progress / 0.7, 1);
    const frameIndex = Math.floor(adjustedProgress * (totalFrames - 1));
    updateFrame(frameIndex);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [loaded, updateFrame]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        pointerEvents: 'none',
        backgroundColor: 'black',
        display: 'block',
      }}
    />
  );
};

export default ImageSequenceScroll;