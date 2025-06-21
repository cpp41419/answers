'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroAnimation() {
  return (
    <div className="flex flex-col items-center gap-1 mb-10 relative">
      <div className="bg-card rounded-lg px-6 py-3 shadow-lg transform -rotate-3 z-10">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wide text-primary">
          Find Course
        </h1>
      </div>
      <div className="bg-card rounded-lg px-6 py-3 shadow-2xl transform rotate-1 z-20 -my-5">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-wide text-accent">
          ANSWERS
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
