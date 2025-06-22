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
      <Card className="max-w-xs shadow-2xl">
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
              <p className="font-bold text-base">
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
