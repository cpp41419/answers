'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { categories } from '@/data/categories';
import { ArrowRight, BookOpen, Map, BarChartBig, Lightbulb, ClipboardCheck, Star, CheckCircle } from 'lucide-react';
import React from 'react';
import { cn, slugify } from '@/lib/utils';
import { getAllQuestions } from '@/data/questions';
import { FaqSchema } from '@/components/core/FaqSchema';
import { CategoryCard } from '@/components/qa/CategoryCard';
import type { FAQQuestion } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const cyclingWords = [
  "That Delivers Results",
  "Verified by Experts",
  "Trusted by Students",
];

const FeaturedGuideCard = ({
  icon,
  title,
  infoContent,
  relatedFaqs,
  href,
  rotationClass
}: {
  icon: React.ReactNode;
  title: string;
  infoContent: React.ReactNode;
  relatedFaqs: FAQQuestion[];
  href: string;
  rotationClass: string;
}) => (
    <Card className={cn(
        "flex flex-col h-full bg-amber-100/80 dark:bg-amber-900/30 text-gray-800 dark:text-gray-200 border-amber-200 dark:border-amber-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105",
        rotationClass
      )}>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <span className="p-3 bg-amber-200/80 dark:bg-amber-800/50 text-amber-700 dark:text-amber-200 rounded-lg">
            {icon}
          </span>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <Tabs defaultValue="info" className="w-full flex-grow flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="p-4 text-sm text-gray-700 dark:text-gray-300 flex-grow">
                {infoContent}
            </TabsContent>
            <TabsContent value="faqs" className="p-4 flex-grow max-h-[150px] overflow-y-auto">
                <ul className="space-y-3 text-sm">
                    {relatedFaqs.length > 0 ? (
                        relatedFaqs.slice(0, 4).map((faq) => ( // limit to 4 FAQs
                            <li key={faq.id}>
                                <Link href={`/questions/${slugify(faq.category)}/${faq.id}`} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-amber-200 hover:underline">
                                    <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 opacity-70"/>
                                    <span className="line-clamp-2">{faq.question}</span>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No related FAQs found.</p>
                    )}
                </ul>
            </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="mt-auto border-t border-amber-300/50 dark:border-amber-700/50 pt-3">
        <Button asChild variant="ghost" className="w-full text-gray-800 dark:text-gray-200 hover:bg-amber-200/80 dark:hover:bg-amber-800/50">
          <Link href={href}>
            Read Full Guide <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
);

export default function HomePage() {
  const [middleCardWord, setMiddleCardWord] = useState(cyclingWords[0]);
  
  useEffect(() => {
    // Set metadata dynamically if needed in a client component
    document.title = 'ANSWERS - Your Real Estate Authority Resource';

    const interval = setInterval(() => {
      setMiddleCardWord(prev => {
        const currentIndex = cyclingWords.indexOf(prev);
        const nextIndex = (currentIndex + 1) % cyclingWords.length;
        return cyclingWords[nextIndex];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const allQuestions = getAllQuestions();

  const guideFaqs = allQuestions.filter(q => 
    ["Course Basics & Enrollment", "Costs & Payment", "Study Options & Duration"].includes(q.category)
  );

  const regionalFaqs = allQuestions.filter(q => 
    q.category === "State Licensing Requirements"
  );
  
  const dataFaqs = allQuestions.filter(q => 
    q.category === "Provider Selection"
  );

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-[hsl(var(--deep-navy))]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          
          <div className="mb-12 flex flex-col items-center justify-center gap-y-1">
            <div className="rounded-lg bg-card px-8 py-4 shadow-xl transform -rotate-3">
              <h1 className="text-4xl font-black uppercase tracking-tight text-accent md:text-5xl">
                Find Quality Training
              </h1>
            </div>
            <div className="z-10 rounded-lg bg-card px-8 py-4 shadow-xl transform rotate-1 transition-transform duration-300 hover:scale-110">
              <h2 key={middleCardWord} className="text-4xl font-black uppercase tracking-tight text-[hsl(var(--deep-navy))] md:text-5xl animate-flip-in h-12 flex items-center justify-center">
                {middleCardWord}
              </h2>
            </div>
            <div className="rounded-lg bg-card px-6 py-3 shadow-xl transform -rotate-1">
              <Link
                href="/quiz"
                className="group flex items-center gap-3 text-destructive"
              >
                <h3 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
                  Start Your Search
                </h3>
                <ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          <p className="max-w-3xl mx-auto text-lg text-primary-foreground/80">
            Australia’s only independent platform protecting students from poor training decisions. Get matched with verified providers through our anonymous evaluation system - no marketing pressure, just honest assessment.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm text-primary-foreground/90">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>No Vested RTO Interests</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Anonymous Evaluation System</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Student Protection Focus</span>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Base Section */}
      <section className="py-16 md:py-20 bg-slate-50 dark:bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center mb-12">
             <h2 className="text-3xl font-bold text-foreground bg-amber-200/80 px-6 py-2 rounded-md rotate-1 shadow-md dark:text-gray-800">
                🔍 Explore Question Categories
             </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>
      
       {/* Featured Guides Section */}
      <section className="py-16 md:py-20 bg-background border-t">
         <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-center mb-12">
              <h2 className="text-3xl font-bold text-foreground bg-amber-200/80 px-6 py-2 rounded-md -rotate-1 shadow-md dark:text-gray-800">
                  📘 In-Depth Resources
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <FeaturedGuideCard 
                  icon={<BookOpen className="h-6 w-6" />}
                  title="Comprehensive Guide"
                  infoContent={<p>The full breakdown of CPP41419: structure, content, providers, costs, timeframes, and outcomes.</p>}
                  relatedFaqs={guideFaqs}
                  href="/guide"
                  rotationClass="transform -rotate-2 hover:-rotate-1"
               />
               <FeaturedGuideCard 
                  icon={<Map className="h-6 w-6" />}
                  title="Regional Real Estate"
                  infoContent={<p>Insights into studying and working in real estate across major Australian cities and regional areas.</p>}
                  relatedFaqs={regionalFaqs}
                  href="/regional-guide"
                  rotationClass="transform rotate-1 hover:rotate-0"
               />
               <FeaturedGuideCard 
                  icon={<BarChartBig className="h-6 w-6" />}
                  title="Data Insights"
                  infoContent={<p>See how providers compare. Red flags. Trends. Real stories from students and alumni.</p>}
                  relatedFaqs={dataFaqs}
                  href="/data-insights"
                  rotationClass="transform rotate-3 hover:rotate-1"
               />
            </div>
         </div>
      </section>

      {/* RTO Sale Offer Section */}
      <section id="sale-offer" className="py-16 md:py-20 text-center bg-slate-50 dark:bg-card border-t">
        <div className="container mx-auto px-4 md:px-6 flex justify-center">
          <Card className="relative group w-full max-w-lg bg-gradient-to-br from-primary to-[hsl(var(--deep-navy))] text-white overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 -rotate-2 hover:rotate-0">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute top-20 left-10 w-8 h-8 rounded-full bg-white/5 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-16 right-24 w-12 h-12 rounded-full bg-white/5 opacity-30 group-hover:scale-125 transition-transform duration-700 delay-200"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-3 bg-white/20 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-300" />
                </span>
                <CardTitle className="text-2xl font-bold text-white">Exclusive RTO Offer</CardTitle>
              </div>
              <CardDescription className="text-primary-foreground/80">
                Limited time offer from our top-rated providers (Demo Offer).
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-lg mb-4">
                Save up to <span className="font-bold text-4xl text-yellow-300">25%</span> on your CPP41419 course fees.
              </p>
              <p className="text-primary-foreground/90 text-sm">
                Take our 2-minute quiz to get matched with participating RTOs and unlock your exclusive discount.
              </p>
            </CardContent>
            <CardFooter className="relative z-10 bg-black/20 p-4">
              <Button asChild size="lg" className="w-full bg-accent text-accent-foreground font-bold hover:bg-accent/90">
                <Link href="/quiz">
                  Find Your Discount
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
         <p className="mt-6 text-sm text-muted-foreground">
            Are you an RTO? <Link href="https://cpp41419.com.au/logup" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">Learn about partnership opportunities.</Link>
        </p>
      </section>

      <FaqSchema questions={allQuestions} />
    </div>
  );
}
