
'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'; // Using Headless UI for modal as an example
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock search results - replace with actual search logic
const mockResults = [
  { id: '1', title: 'Comprehensive Guide to CPP41419', href: '/guide', category: 'Guides' },
  { id: '2', title: 'NSW Licensing Requirements', href: '/questions/state-licensing-requirements/some-nsw-question-id', category: 'Licensing' },
  { id: '3', title: 'Online Study Options', href: '/questions/study-options-duration/some-online-study-question-id', category: 'Study Options' },
  { id: '4', title: 'Understanding PropTech', href: '/popular-blogs', category: 'Digital Trends' },
];


export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<typeof mockResults>([]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      // Simulate API call or filtering
      const filtered = mockResults.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Clear search term when modal is closed
    if (!isOpen) {
      setSearchTerm('');
      setResults([]);
    }
  }, [isOpen]);

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
                    <Dialog.Description as="div" className="space-y-2">
                      {results.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={onClose}
                          className="block rounded-lg p-3 hover:bg-muted transition-colors"
                        >
                          <p className="text-sm font-medium text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
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
