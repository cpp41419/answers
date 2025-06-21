'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroAnimation() {
  const [dynamicText, setDynamicText] = useState('That Delivers Results');

  useEffect(() => {
    const phrases = ['That Delivers Results', 'That Drives Careers', 'That Builds Futures'];
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % phrases.length;
      setDynamicText(phrases[currentIndex]);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center gap-1 mb-10 relative">
      <div className="bg-card rounded-lg px-6 py-3 shadow-lg transform -rotate-3 z-10">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wide text-accent">
          Find Quality Training
        </h1>
      </div>
      <div className="bg-card rounded-lg px-6 py-3 shadow-2xl transform rotate-1 z-20 -my-5">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-wide text-primary">
          {dynamicText}
        </h2>
      </div>
      <div className="bg-card rounded-lg px-6 py-3 shadow-lg z-10 animate-slow-swing">
        <Button asChild variant="link" className="p-0 h-auto hover:no-underline">
          <Link href="/quiz" className="text-2xl md:text-4xl font-black uppercase tracking-wide text-primary flex items-center gap-2">
            Start Your Search <ArrowRight className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
