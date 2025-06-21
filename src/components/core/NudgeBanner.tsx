'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, MessageSquareQuote } from 'lucide-react';
import { cn } from '@/lib/utils';

const NUDGE_SESSION_KEY = 'nudge-banner-dismissed';
const APPEAR_DELAY = 5000; // 5 seconds

const nudgeMessages = [
  "Let's get started!",
  "Need some help?",
  "Dare to go big?",
];

export function NudgeBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);
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
    
    // Cycle through messages while banner is visible
    const messageTimer = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % nudgeMessages.length);
    }, 4000); // Change message every 4 seconds

    return () => {
      clearTimeout(showTimer);
      clearInterval(messageTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(NUDGE_SESSION_KEY, 'true');
    // We don't set isDismissed to true here so the component doesn't get unmounted
    // allowing for the exit animation. The session storage prevents re-appearance.
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 transition-transform duration-500 ease-in-out',
        isVisible ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)]'
      )}
    >
      <Card className="max-w-sm shadow-2xl bg-primary text-primary-foreground border-accent">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-accent text-accent-foreground hover:bg-accent/80 z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <MessageSquareQuote className="h-8 w-8 mt-1 text-primary-foreground/80 shrink-0" />
            <div>
              <p className="font-bold text-lg h-8">
                {nudgeMessages[currentMessageIndex]}
              </p>
              <p className="text-sm text-primary-foreground/90 mt-1 mb-4">
                Ready to take the next step in your real estate journey?
              </p>
              <Button asChild variant="secondary" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
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
