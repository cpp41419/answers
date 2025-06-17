
'use client';

import Link from 'next/link';
import { AppLogo } from '@/components/core/AppLogo';
import { Button } from '@/components/ui/button';
import { Menu, Search } from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
}

export default function Header({ onOpenMobileMenu, onOpenSearch }: HeaderProps) {
  const navLinks = [
    { name: 'Find Providers', href: '/providers' }, // Page doesn't exist yet
    { name: 'Compare RTOs', href: '/compare' }, // Page doesn't exist yet
    { name: 'Take Quiz', href: '/quiz' },
    { name: 'State Guides', href: '/regional-guide' },
    { name: 'Insights', href: '/data-insights' }, // Or /popular-blogs
    // { name: 'About', href: '/about' }, // Page doesn't exist yet
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <AppLogo />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-primary text-foreground/80"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2 md:space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSearch}
            aria-label="Open search"
            className="text-muted-foreground hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenMobileMenu}
            aria-label="Open mobile menu"
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-6 w-6" />
          </Button>
           <Button asChild className="hidden md:inline-flex rounded-full">
            <Link href="/quiz">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
