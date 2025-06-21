
import type { Metadata } from 'next';
import { getAllQuestions } from '@/data/questions';
import { categories } from '@/data/categories';
import type { FAQQuestion } from '@/types';
import { QuestionListItem } from '@/components/qa/QuestionListItem';
import { Breadcrumbs } from '@/components/core/Breadcrumbs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Questions - Master Index | CPP41419 Q&A',
  description: 'A complete index of all frequently asked questions about the CPP41419 Certificate IV in Real Estate Practice, organized by category.',
  keywords: ['all questions', 'faq index', 'master faq list', 'cpp41419 questions', 'real estate course faq'],
};

export default function AllQuestionsPage() {
  const allQuestions = getAllQuestions();

  const questionsByCategory = allQuestions.reduce((acc, question) => {
    const categoryName = question.category;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(question);
    return acc;
  }, {} as Record<string, FAQQuestion[]>);

  // Get slugs for categories to build correct links
  const categorySlugs: { [key: string]: string } = {};
  categories.forEach(cat => {
    categorySlugs[cat.name] = cat.slug;
  });

  const sortedCategoryNames = Object.keys(questionsByCategory).sort((a, b) => {
    const catA = categories.find(c => c.name === a);
    const catB = categories.find(c => c.name === b);
    // Find the original index from the main categories array to maintain order
    const indexA = catA ? categories.indexOf(catA) : -1;
    const indexB = catB ? categories.indexOf(catB) : -1;
    return indexA - indexB;
  });

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 space-y-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'All Questions' }]} />
      
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center">
          <BookOpen className="mr-3 h-8 w-8 text-primary" /> Master FAQ Index
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Browse every question on the site, organized by category.
        </p>
      </header>

      <Accordion type="multiple" className="w-full space-y-4">
        {sortedCategoryNames.map((categoryName) => {
          const questions = questionsByCategory[categoryName];
          const categorySlug = categorySlugs[categoryName];
          if (!questions || !categorySlug) return null;

          return (
            <AccordionItem value={categoryName} key={categoryName} className="border bg-card rounded-xl shadow-sm">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline p-6 text-left">
                <span className="flex-1 text-left">{categoryName} ({questions.length})</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-4">
                  {questions.map((question) => (
                    <QuestionListItem key={question.id} question={question} categorySlug={categorySlug} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
