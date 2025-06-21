
'use client';

import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { ScrollProgressBar } from '@/components/core/ScrollProgressBar';
import { Fab } from '@/components/core/Fab';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import MobileMenu from '@/components/navigation/MobileMenu';
import GlobalSearch from '@/components/search/GlobalSearch';
import { StateFaqSection } from '@/components/core/StateFaqSection';
import { AuditCta } from '@/components/core/AuditCta';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MainLayout({ 
  children, 
  className = "" 
}: MainLayoutProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <ScrollProgressBar />
      <Toaster />

      <div className="min-h-screen flex flex-col bg-background">
        <Header 
          onOpenSearch={() => setSearchOpen(true)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className={`flex-1 ${className}`}>
          {children}
        </main>

        <AuditCta />
        <StateFaqSection />

        <Footer />
        
        <Fab /> 

        <GlobalSearch 
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />

        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onOpenSearch={() => {
            setMobileMenuOpen(false);
            setSearchOpen(true);
          }}
        />
      </div>
    </>
  );
}
