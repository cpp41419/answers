
'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Changed from next/router
import { Menu, X, ChevronDown, ChevronRight, Home, Search, Briefcase, BarChart2, BookOpen, Users, Info, ClipboardCheck, Lightbulb } from 'lucide-react';

interface MenuItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  highlight?: boolean;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  name: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
  },
  {
    name: 'Find Providers', // This page does not exist yet
    href: '/providers',
    icon: Briefcase,
    description: 'Browse 87 CPP41419 providers',
  },
  {
    name: 'Compare RTOs', // This page does not exist yet
    href: '/compare',
    icon: BarChart2,
    description: 'Side-by-side comparison',
  },
  {
    name: 'Take Quiz',
    href: '/quiz', // Changed from /evaluate to match existing quiz page
    icon: ClipboardCheck,
    description: 'Find your perfect course',
    highlight: true,
  },
  {
    name: 'Submit a Question',
    href: '/submit-question',
    icon: Lightbulb,
    description: 'Ask the community',
  },
  {
    name: 'State Guides',
    href: '/regional-guide', // Changed to match existing regional guide page
    icon: BookOpen,
    description: 'Licensing by state',
    submenu: [
      // These specific state links would require pages like /regional-guide/nsw etc.
      // For now, they link to sections within the main regional guide if possible, or just the main guide.
      // Or, if the regional guide already has accordion items for states, these could link to those anchor IDs.
      // For simplicity, I am linking them to the main regional guide page.
      { name: 'NSW', href: '/regional-guide#nsw' },
      { name: 'VIC', href: '/regional-guide#vic' },
      { name: 'QLD', href: '/regional-guide#qld' },
      { name: 'WA', href: '/regional-guide#wa' },
      { name: 'SA', href: '/regional-guide#sa' },
      { name: 'TAS', href: '/regional-guide#tas' },
      { name: 'ACT', href: '/regional-guide#act' },
      { name: 'NT', href: '/regional-guide#nt' },
    ],
  },
  {
    name: 'Insights', // This could link to /data-insights or /popular-blogs
    href: '/data-insights',
    icon: Users, // Using Users as a placeholder icon
    description: 'Expert analysis',
  },
  {
    name: 'About', // This page does not exist yet
    href: '/about',
    icon: Info,
    description: 'Our mission',
  },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export default function MobileMenu({ isOpen, onClose, onOpenSearch }: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const pathname = usePathname(); // Changed from useRouter

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    // For App Router, ensure it matches the start of the pathname for parent routes
    return pathname.startsWith(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div 
        data-testid="mobile-menu"
        className="fixed right-0 top-0 h-full w-80 max-w-[calc(100%-2rem)] sm:max-w-sm bg-background shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border">
          <h2 id="mobile-menu-title" className="text-xl font-bold text-foreground">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Button */}
        <div className="p-4 border-b border-border">
          <button
            onClick={() => {
              onOpenSearch();
              onClose();
            }}
            className="w-full flex items-center p-3 bg-muted/50 rounded-lg text-foreground hover:bg-muted transition-colors"
          >
            <Search className="w-5 h-5 mr-3 text-muted-foreground" />
            <span>Search...</span>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <div key={item.name}>
                {/* Main Item */}
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex-1 flex items-center p-3 rounded-lg transition-colors text-sm
                      ${
                        item.highlight
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : isActive(item.href)
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-foreground hover:bg-muted'
                      }`}
                  >
                    {item.icon && <item.icon className={`w-5 h-5 mr-3 shrink-0 ${isActive(item.href) && !item.highlight ? 'text-primary' : item.highlight ? 'text-primary-foreground' : 'text-muted-foreground'}`} />}
                    <div className="flex-1">
                      <div className={`font-medium ${item.highlight ? '' : isActive(item.href) ? '' : ''}`}>{item.name}</div>
                      {item.description && (
                        <div className={`text-xs ${
                          item.highlight ? 'text-primary-foreground/80' : isActive(item.href) ? 'text-primary/80' : 'text-muted-foreground'
                        }`}>
                          {item.description}
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Submenu Toggle */}
                  {item.submenu && (
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                      aria-expanded={expandedItems[item.name] || false}
                      aria-controls={`submenu-${item.name}`}
                    >
                      {expandedItems[item.name] ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Submenu */}
                {item.submenu && expandedItems[item.name] && (
                  <div id={`submenu-${item.name}`} className="ml-5 mt-1 pl-3 border-l border-border space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={onClose}
                        className={`block p-2 rounded-md text-sm transition-colors ${
                          isActive(subItem.href)
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 mt-auto">
          <Link
            href="/quiz" // Changed from /evaluate
            onClick={onClose}
            className="block w-full bg-primary text-primary-foreground text-center py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
