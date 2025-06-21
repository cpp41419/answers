'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Search, X, FileText, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAllQuestions } from '@/data/questions';
import { slugify } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  href: string;
  category: string;
  type: 'page' | 'question';
}

const searchablePages: Omit<SearchResult, 'type'>[] = [
  { id: 'guide', title: 'Comprehensive Guide to CPP41419', href: '/guide', category: 'Guides' },
  { id: 'regional-guide', title: 'Regional Real Estate Guide', href: '/regional-guide', category: 'Guides' },
  { id: 'data-insights', title: 'Data Insights: Suspect Provider Behavior', href: '/data-insights', category: 'Analysis' },
  { id: 'popular-blogs', title: 'Popular Real Estate Blogs & Articles', href: '/popular-blogs', category: 'Articles' },
  { id: 'quiz', title: 'Find Your Perfect CPP41419 Provider Quiz', href: '/quiz', category: 'Tools' },
];

const allQuestions = getAllQuestions();
const allSearchableContent: SearchResult[] = [
  ...searchablePages.map(p => ({ ...p, type: 'page' as const })),
  ...allQuestions.map(q => ({
    id: q.id,
    title: q.question,
    href: `/questions/${slugify(q.category)}/${q.id}`,
    category: q.category,
    type: 'question' as const
  }))
];

export default function GlobalSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = allSearchableContent.filter(item =>
        item.title.toLowerCase().includes(lowercasedTerm) ||
        item.category.toLowerCase().includes(lowercasedTerm)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSearchTerm('');
        setResults([]);
      }, 200);
    }
  }, [isOpen]);

  const getIcon = (type: 'page' | 'question') => {
    switch (type) {
      case 'page': return <FileText className="h-5 w-5 text-muted-foreground" />;
      case 'question': return <MessageSquare className="h-5 w-5 text-muted-foreground" />;
      default: return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-6 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel 
                data-testid="search-modal"
                className="w-full max-w-xl transform overflow-hidden rounded-xl bg-background text-left align-middle shadow-2xl transition-all"
              >
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <Input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search questions, guides, articles..."
                    className="h-14 w-full border-0 border-b border-border bg-transparent pl-12 pr-12 text-base placeholder:text-muted-foreground focus:ring-0 sm:text-sm"
                  />
                   <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground" 
                    onClick={onClose}
                    aria-label="Close search"
                   >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {results.length > 0 && (
                  <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
                    <Dialog.Description as="div" className="space-y-1">
                      {results.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors"
                        >
                          {getIcon(item.type)}
                          <div className="flex-1">
                             <p className="text-sm font-medium text-foreground">{item.title}</p>
                             <p className="text-xs text-muted-foreground">{item.category}</p>
                          </div>
                        </Link>
                      ))}
                    </Dialog.Description>
                  </div>
                )}

                {searchTerm && results.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-sm text-muted-foreground">No results found for &quot;{searchTerm}&quot;.</p>
                  </div>
                )}
                
                {!searchTerm && (
                    <div className="p-6 text-center">
                        <p className="text-sm text-muted-foreground">Start typing to search the site.</p>
                    </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}