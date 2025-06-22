'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, MessageSquareQuote } from 'lucide-react';
import { cn } from '@/lib/utils';

const NUDGE_SESSION_KEY = 'nudge-banner-dismissed';
const APPEAR_DELAY = 5000; // 5 seconds
const RUMBLE_DELAY = APPEAR_DELAY + 500; // Start rumble 0.5s after appearing
const RUMBLE_DURATION = 600; // Corresponds to animation duration (0.3s * 2 iterations)

const nudgeMessages = [
  "Let's get started!",
  "Need some help?",
  "Dare to go big?",
];

export function NudgeBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);
  const [isRumbling, setIsRumbling] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Check session storage on mount
    const dismissedInSession = sessionStorage.getItem(NUDGE_SESSION_KEY);
    if (dismissedInSession) {
      setIsDismissed(true);
      return;
    }
    
    setIsDismissed(false);

    // Show banner after a delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, APPEAR_DELAY);
    
    // Timer to start rumbling
    const rumbleStartTimer = setTimeout(() => {
      setIsRumbling(true);
    }, RUMBLE_DELAY);

    // Timer to stop rumbling
    const rumbleEndTimer = setTimeout(() => {
      setIsRumbling(false);
    }, RUMBLE_DELAY + RUMBLE_DURATION);

    // Cycle through messages while banner is visible
    const messageTimer = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % nudgeMessages.length);
    }, 4000); // Change message every 4 seconds

    return () => {
      clearTimeout(showTimer);
      clearTimeout(rumbleStartTimer);
      clearTimeout(rumbleEndTimer);
      clearInterval(messageTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(NUDGE_SESSION_KEY, 'true');
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 transition-transform duration-500 ease-in-out',
        isVisible ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)]',
        isRumbling && 'animate-rumble'
      )}
    >
      <Card className="max-w-[260px] shadow-2xl bg-card text-card-foreground border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <MessageSquareQuote className="h-6 w-6 mt-1 text-muted-foreground shrink-0" />
            <div>
              <p className="font-semibold text-base">
                {nudgeMessages[currentMessageIndex]}
              </p>
              <p className="text-xs text-muted-foreground mt-1 mb-3">
                Ready to take the next step in your real estate journey?
              </p>
              <Button asChild size="sm" className="w-full">
                <Link href="https://cpp41419.com.au/contact" target="_blank" rel="noopener noreferrer">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
