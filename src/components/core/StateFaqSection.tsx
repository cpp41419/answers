'use client';

import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Map, ChevronRight } from 'lucide-react';
import type { FAQQuestion } from '@/types';
import { slugify, cn } from '@/lib/utils';
import { useMemo } from 'react';
import { questions as allQuestions } from '@/data/questions';

interface StateFaqs {
  [state: string]: FAQQuestion[];
}

const stateColors = [
  'bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800',
  'bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
  'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
  'bg-violet-50 text-violet-900 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800',
  'bg-rose-50 text-rose-900 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
  'bg-cyan-50 text-cyan-900 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800',
  'bg-fuchsia-50 text-fuchsia-900 border-fuchsia-200 dark:bg-fuchsia-950 dark:text-fuchsia-300 dark:border-fuchsia-800',
  'bg-lime-50 text-lime-900 border-lime-200 dark:bg-lime-950 dark:text-lime-300 dark:border-lime-800',
];

export function StateFaqSection() {
  const stateFaqs = useMemo(() => {
    const stateQuestions = allQuestions.filter(q => q.state_specific);
    
    return stateQuestions.reduce((acc: StateFaqs, question) => {
      const state = question.state_specific!;
      if (!acc[state]) {
        acc[state] = [];
      }
      acc[state].push(question);
      return acc;
    }, {});
  }, []);

  const sortedStates = Object.keys(stateFaqs).sort();

  if (sortedStates.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 dark:bg-card border-t py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center justify-center gap-3">
              <Map className="h-8 w-8 text-primary" />
              State-Specific FAQs
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Find answers to common questions about licensing and practice in your state.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {sortedStates.map((state, index) => {
              const colorClass = stateColors[index % stateColors.length];
              return (
                <AccordionItem value={state} key={state} className={cn("border rounded-xl shadow-sm transition-colors", colorClass)}>
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline p-6 text-left">
                    <span className="flex-1 text-left">{state}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ul className="space-y-4">
                      {stateFaqs[state].map(q => (
                        <li key={q.id}>
                          <Link href={`/questions/${slugify(q.category)}/${q.id}`} className="group flex items-start text-primary hover:underline">
                             <ChevronRight className="h-5 w-5 mr-2 mt-0.5 shrink-0 text-primary/50 group-hover:text-primary transition-colors"/>
                             <span>{q.question}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
