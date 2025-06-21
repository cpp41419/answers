'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const cyclingWords = ['ANSWERS', 'QUESTIONS', 'FINAL EXAM 2025'];
const woodCardWords = ['Real Estate Course', 'Licensing Info', 'Career Guides'];

export function HeroAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [woodCardIndex, setWoodCardIndex] = useState(0);

  useEffect(() => {
    const mainInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cyclingWords.length);
    }, 2500); // Change word every 2.5 seconds

    const woodCardInterval = setInterval(() => {
        setWoodCardIndex((prevIndex) => (prevIndex + 1) % woodCardWords.length);
    }, 2800); // Change slightly slower to avoid sync

    return () => {
        clearInterval(mainInterval);
        clearInterval(woodCardInterval);
    };
  }, []);

  return (
    // Apply slow swing to the entire container to make it all swing together
    <div className="flex flex-col items-center gap-1 mb-10 relative animate-slow-swing">
      <div className="bg-card rounded-lg px-6 py-3 shadow-lg transform -rotate-3 z-10 relative">
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-wide text-primary">
          Find Course
        </h1>
        {/* Attached "wood" card with a border */}
        <div 
            className="absolute -top-3 -right-6 bg-amber-800 text-white text-xs font-bold uppercase py-1 px-2 rounded-sm shadow-lg transform rotate-12 border-2 border-amber-900/50 [perspective:1000px]"
        >
          <span key={woodCardIndex} className="inline-block animate-flip-in">
            {woodCardWords[woodCardIndex]}
          </span>
        </div>
      </div>
      <div className="bg-card rounded-lg px-6 py-3 shadow-2xl transform rotate-1 z-20 -my-3 h-[90px] flex items-center justify-center [perspective:1000px]">
        <h2
          key={currentIndex}
          className="text-4xl md:text-5xl font-black uppercase tracking-wide text-accent animate-flip-in text-center"
        >
          {cyclingWords[currentIndex]}
        </h2>
      </div>
      <div className="bg-card rounded-lg px-6 py-3 shadow-lg z-10">
        <Button asChild variant="link" className="p-0 h-auto hover:no-underline">
          <Link href="/quiz" className="text-3xl md:text-4xl font-black uppercase tracking-wide text-primary flex items-center gap-2">
            GET PREPARED <ArrowRight className="h-8 w-8" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
