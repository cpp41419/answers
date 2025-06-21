'use client';

import { useState, useEffect, useMemo } from 'react';

const cyclingWords = ['ANSWERS', 'QUESTIONS', 'FINAL EXAM 2025'];
const bannerWords = ['Guides', 'Licensing', 'Careers', 'RTOs'];

interface Banner {
  id: number;
  text: string;
  top: number;
  left: number;
  rotation: number;
}

export function HeroAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const mainInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cyclingWords.length);
    }, 2500);

    return () => {
      clearInterval(mainInterval);
    };
  }, []);

  useEffect(() => {
    // Generate banner positions only on the client
    const generatedBanners = bannerWords.map((word, index) => {
      const position = (index / (bannerWords.length - 1)) * 80 + 10; // Spread from 10% to 90%
      return {
        id: index,
        text: word,
        top: Math.random() * 10 - 5, // -5px to 5px
        left: position + (Math.random() - 0.5) * 5, // Jitter left/right
        rotation: Math.random() * 10 - 5, // -5deg to 5deg
      };
    });
    setBanners(generatedBanners);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="flex flex-col items-center gap-4 mb-10 relative">
      <div className="bg-primary rounded-lg px-8 py-4 shadow-2xl drop-shadow-xl z-10 w-full max-w-2xl relative">
        <div className="absolute -top-4 left-0 w-full h-8">
          {banners.map(banner => (
            <div
              key={banner.id}
              className="absolute bg-amber-800 text-white text-[10px] font-bold uppercase py-1 px-2 rounded-sm shadow-md border border-amber-900/50"
              style={{
                top: `${banner.top}px`,
                left: `${banner.left}%`,
                transform: `translateX(-50%) rotate(${banner.rotation}deg)`,
              }}
            >
              {banner.text}
            </div>
          ))}
        </div>
        <h1 className="text-6xl md:text-7xl font-black uppercase tracking-wide text-primary-foreground text-center">
          Find Course
        </h1>
      </div>

      <div className="bg-accent rounded-lg px-8 py-6 shadow-2xl drop-shadow-xl z-20 -my-6 w-full max-w-lg h-[135px] flex items-center justify-center [perspective:1000px]">
        <h2
          key={currentIndex}
          className="text-8xl md:text-9xl font-black uppercase tracking-wide text-accent-foreground animate-flip-in text-center"
        >
          {cyclingWords[currentIndex]}
        </h2>
      </div>

      <div className="bg-card rounded-lg px-6 py-3 shadow-lg transform rotate-3 z-10 animate-slow-swing">
        <p className="text-lg font-bold uppercase tracking-wider text-primary">GET PREPARED</p>
      </div>
    </div>
  );
}
