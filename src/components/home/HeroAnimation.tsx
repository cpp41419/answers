'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const cyclingWords = ['ANSWERS', 'QUESTIONS', 'FINAL EXAM 2025'];

export function HeroAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerPositions, setBannerPositions] = useState<{ text: string, top: string; left: string; transform: string }[]>([]);

  useEffect(() => {
    const mainInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cyclingWords.length);
    }, 2500);

    // Generate positions for the banners on the client side to avoid hydration mismatch.
    const bannerWords = ['Guides', 'Licensing', 'Careers', 'RTOs'];
    const positions = bannerWords.map((word, i) => ({
      text: word,
      top: '-0.75rem',
      left: `${5 + i * 22 + (Math.random() * 4 - 2)}%`, // Adjusted spacing for 4 items
      transform: `rotate(${Math.random() * 20 - 10}deg)`,
    }));
    setBannerPositions(positions);

    return () => {
      clearInterval(mainInterval);
    };
  }, []);

  return (
    // Apply slow swing to the entire container to make it all swing together
    <div className="flex flex-col items-center gap-1 mb-10 relative">
      <div className="bg-card rounded-lg px-6 py-3 shadow-lg transform -rotate-3 z-10 relative">
        {bannerPositions.map((banner, index) => (
            <div 
                key={index}
                className="absolute bg-amber-800 text-white text-xs font-bold uppercase py-1 px-2 rounded-sm shadow-lg border-2 border-amber-900/50"
                style={{ top: banner.top, left: banner.left, transform: banner.transform }}
            >
                {banner.text}
            </div>
        ))}
        <h1 className="text-6xl md:text-7xl font-black uppercase tracking-wide text-primary">
          Find Course
        </h1>
      </div>
      <div className="bg-primary rounded-lg px-8 py-4 shadow-2xl drop-shadow-xl transform rotate-1 z-20 -my-5 h-[135px] flex items-center justify-center [perspective:1000px]">
        <h2
          key={currentIndex}
          className="text-7xl md:text-8xl font-black uppercase tracking-wide text-primary-foreground animate-flip-in text-center"
        >
          {cyclingWords[currentIndex]}
        </h2>
      </div>
      <div className="bg-card rounded-lg px-6 py-3 shadow-lg z-10 animate-slow-swing">
        <Button asChild variant="link" className="p-0 h-auto hover:no-underline">
          <Link href="/quiz" className="text-3xl md:text-4xl font-black uppercase tracking-wide text-primary flex items-center gap-2">
            GET PREPARED <ArrowRight className="h-8 w-8" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
