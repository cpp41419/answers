'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const cyclingWords = ['ANSWERS', 'QUESTIONS', 'FINAL EXAM 2025'];

export function HeroAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cyclingWords.length);
    }, 2500); // Change word every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-1 mb-10 relative">
      <div className="bg-card rounded-lg px-6 py-3 shadow-lg transform -rotate-3 z-10">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-wide text-primary">
          Find Course
        </h1>
      </div>
      <div className="bg-card rounded-lg px-6 py-3 shadow-2xl transform rotate-1 z-20 -my-5 h-[100px] flex items-center justify-center [perspective:1000px]">
        <h2
          key={currentIndex}
          className="text-5xl md:text-7xl font-black uppercase tracking-wide text-accent animate-flip-in text-center"
        >
          {cyclingWords[currentIndex]}
        </h2>
      </div>
      <div className="bg-card rounded-lg px-6 py-3 shadow-lg z-10 animate-slow-swing">
        <Button asChild variant="link" className="p-0 h-auto hover:no-underline">
          <Link href="/quiz" className="text-4xl md:text-6xl font-black uppercase tracking-wide text-primary flex items-center gap-2">
            GET PREPARED <ArrowRight className="h-8 w-8" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
