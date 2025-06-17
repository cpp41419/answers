
'use client';

import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { ScrollProgressBar } from '@/components/core/ScrollProgressBar';
import { Fab } from '@/components/core/Fab'; // Existing FAB
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import MobileMenu from '@/components/navigation/MobileMenu';
import GlobalSearch from '@/components/search/GlobalSearch';
import { Breadcrumbs as CoreBreadcrumbs } from '@/components/core/Breadcrumbs'; // Renamed to avoid conflict

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface MainLayoutProps {
  children: ReactNode;
  // title and description props are removed as metadata is handled by Next.js App Router pages/layouts
  showBreadcrumbs?: boolean;
  breadcrumbItems?: BreadcrumbItem[];
  className?: string;
}

export function MainLayout({ 
  children, 
  showBreadcrumbs = true,
  breadcrumbItems = null, // Default to null if not provided
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

  // If custom breadcrumb items are not provided, don't render breadcrumbs
  // unless showBreadcrumbs is explicitly true and breadcrumbItems is an empty array (for homepage case perhaps)
  const shouldShowBreadcrumbs = showBreadcrumbs && breadcrumbItems;


  return (
    <>
      {/* ScrollProgressBar and Toaster are global UI elements */}
      <ScrollProgressBar />
      <Toaster />

      <div className="min-h-screen flex flex-col bg-background">
        <Header 
          onOpenSearch={() => setSearchOpen(true)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Breadcrumbs - Conditionally rendered */}
        {shouldShowBreadcrumbs && breadcrumbItems && breadcrumbItems.length > 0 && (
          <div className="container mx-auto px-4 md:px-6 py-4">
            <CoreBreadcrumbs items={breadcrumbItems} />
          </div>
        )}

        <main className={`flex-1 ${className}`}>
          {/* Children typically wrapped in a container on the page level */}
          {children}
        </main>

        <Footer />
        
        {/* FAB is kept as it's a global floating action button */}
        <Fab /> 

        <GlobalSearch 
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />

        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onOpenSearch={() => {
            setMobileMenuOpen(false); // Close menu before opening search
            setSearchOpen(true);
          }}
        />
      </div>
    </>
  );
}
