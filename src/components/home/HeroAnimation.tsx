'use client';

import { useState, useEffect } from 'react';

const cyclingWords = ['ANSWERS', 'QUESTIONS', 'FINAL EXAM 2025'];

export function HeroAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const mainInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cyclingWords.length);
    }, 2500);

    return () => {
      clearInterval(mainInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 mb-10 relative">
      <div className="bg-amber-800 text-white text-xs font-bold uppercase py-1 px-3 rounded-sm shadow-lg border-2 border-amber-900/50 transform -rotate-6">
        REAL ESTATE COURSE
      </div>

      <div className="bg-primary rounded-lg px-8 py-4 shadow-2xl drop-shadow-xl z-10 h-[135px] flex items-center justify-center [perspective:1000px] w-full max-w-2xl">
        <h1
          key={currentIndex}
          className="text-7xl md:text-8xl font-black uppercase tracking-wide text-primary-foreground animate-flip-in text-center"
        >
          {cyclingWords[currentIndex]}
        </h1>
      </div>
    </div>
  );
}
