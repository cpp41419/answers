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
    { name: 'Quiz', href: '/quiz' },
    { name: 'Guide', href: '/guide' },
    { name: 'Regions', href: '/regional-guide' },
    { name: 'Blogs', href: '/popular-blogs' },
    { name: 'Insights', href: '/data-insights' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
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
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
           <Button asChild variant="outline" className="hidden md:inline-flex rounded-full">
            <Link href="/submit-question">Submit Question</Link>
          </Button>
           <Button asChild className="hidden md:inline-flex rounded-full">
            <Link href="/quiz">Take the Quiz</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
