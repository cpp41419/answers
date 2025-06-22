'use client';

import { useState, useEffect } from 'react';

const cyclingWords = ['ANSWERS', 'QUESTIONS', 'FINAL EXAM'];
const woodCardWords = ['Real Estate Course', 'Licensing Info', 'Career Guides'];

export function HeroAnimation() {
  const [mainIndex, setMainIndex] = useState(0);
  const [woodCardIndex, setWoodCardIndex] = useState(0);

  useEffect(() => {
    const mainInterval = setInterval(() => {
      setMainIndex((prevIndex) => (prevIndex + 1) % cyclingWords.length);
    }, 2500);

    const woodCardInterval = setInterval(() => {
        setWoodCardIndex((prevIndex) => (prevIndex + 1) % woodCardWords.length);
    }, 2000);

    return () => {
      clearInterval(mainInterval);
      clearInterval(woodCardInterval);
    };
  }, []);

  return (
    <div className="relative bg-black/5 p-4 md:p-6 rounded-2xl border border-white/10 mb-10">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-primary rounded-lg px-8 py-4 shadow-2xl drop-shadow-xl z-10 w-full max-w-xl relative">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wide text-primary-foreground text-center">
            Find Course
          </h1>
          {/* Attached Wood Card */}
          <div className="absolute -top-4 -left-4 [perspective:1000px]">
              <div 
                  key={woodCardIndex}
                  className="bg-[#4a2c2a] text-white text-xs font-bold uppercase py-2 px-3 rounded-sm shadow-md border border-black/30 transform -rotate-12 animate-flip-in">
                  {woodCardWords[woodCardIndex]}
              </div>
          </div>
        </div>

        <div className="relative bg-accent rounded-lg px-8 py-6 shadow-2xl drop-shadow-xl z-20 -my-4 w-full max-w-lg h-[100px] flex items-center justify-center [perspective:1000px]">
          <h2
            key={mainIndex}
            className="text-6xl md:text-7xl font-black uppercase tracking-wide text-accent-foreground animate-flip-in text-center whitespace-nowrap"
          >
            {cyclingWords[mainIndex]}
          </h2>
          {/* 2025 mini card */}
          <div className="absolute -top-4 -right-4 bg-destructive text-destructive-foreground text-sm font-bold py-1 px-3 rounded-md shadow-lg transform rotate-12 border-2 border-white/50">
            2025
          </div>
        </div>

        <div className="bg-card rounded-lg px-6 py-3 shadow-lg transform -rotate-3 animate-slow-swing z-10">
          <p className="text-lg font-bold uppercase tracking-wider text-primary">GET PREPARED</p>
        </div>
      </div>
    </div>
  );
}
