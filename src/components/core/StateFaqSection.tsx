
'use client';

import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Map, ChevronRight } from 'lucide-react';
import type { FAQQuestion } from '@/types';
import { slugify } from '@/lib/utils';
import { useMemo } from 'react';
import { questions as allQuestions } from '@/data/questions';

interface StateFaqs {
  [state: string]: FAQQuestion[];
}

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
            {sortedStates.map((state) => (
              <AccordionItem value={state} key={state} className="border bg-card rounded-xl shadow-sm">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline p-6 text-left">
                  {state}
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
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
