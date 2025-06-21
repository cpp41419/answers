
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { categories } from '@/data/categories';
import { ArrowRight, BookOpen, Map, BarChartBig, Lightbulb, ClipboardCheck, Star } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { getAllQuestions } from '@/data/questions';
import { FaqSchema } from '@/components/core/FaqSchema';
import { CategoryCard } from '@/components/qa/CategoryCard';

export const metadata: Metadata = {
  title: 'ANSWERS - Your Real Estate Authority Resource',
  description: 'The definitive, community-driven guide to the CPP41419 Certificate IV in Real Estate Practice. Gain clarity on licensing, costs, course options, career pathways, and more.',
};

const FeaturedGuideCard = ({ icon, title, content, href, rotationClass }: { icon: React.ReactNode, title: string, content: React.ReactNode, href: string, rotationClass: string }) => (
    <Card className={cn(
        "flex flex-col h-full bg-amber-100/80 dark:bg-amber-900/30 text-gray-800 dark:text-gray-200 border-amber-200 dark:border-amber-800/50 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105",
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
      <CardContent className="flex-grow">
        <div className="text-gray-700 dark:text-gray-300 text-sm">{content}</div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full text-gray-800 dark:text-gray-200 hover:bg-amber-200/80 dark:hover:bg-amber-800/50">
          <Link href={href}>
            Read Guide <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
);

const popularTopics = [
  { name: 'Licensing', href: '/questions/state-licensing-requirements' },
  { name: 'Course Costs', href: '/questions/costs-payment' },
  { name: 'Career Paths', href: '/questions/career-employment' },
  { name: 'Online Study', href: '/questions/study-options-duration' },
  { name: 'Enrollment', href: '/questions/course-basics-enrollment' },
  { name: 'RPL', href: '/questions/assessment-completion' },
  { name: 'Assessments', href: '/questions/assessment-completion' },
  { name: 'Provider Reviews', href: '/questions/provider-selection' },
  { name: 'TAFE vs RTO', href: '/questions/provider-selection' },
  { name: 'CPD Points', href: '/questions/advanced-questions' },
  { name: 'NSW Licensing', href: '/questions/state-licensing-requirements' },
  { name: 'VIC Licensing', href: '/questions/state-licensing-requirements' },
  { name: 'QLD Licensing', href: '/questions/state-licensing-requirements' },
  { name: 'WA Licensing', href: '/questions/state-licensing-requirements' },
  { name: 'SA Licensing', href: '/questions/state-licensing-requirements' },
  { name: 'TAS Licensing', href: '/questions/state-licensing-requirements' },
  { name: 'Job Outlook', href: '/questions/career-employment' },
  { name: 'Salary', href: '/questions/career-employment' },
  { name: 'Exams', href: '/questions/assessment-completion' },
  { name: 'Prerequisites', href: '/questions/course-basics-enrollment' }
];

export default function HomePage() {
  const questions = getAllQuestions();

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-[hsl(var(--deep-navy))]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-4">
            ANSWERS: Your Real Estate Authority Resource
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-primary-foreground/80 mb-8">
            The definitive, community-driven guide to the CPP41419 Certificate IV in Real Estate Practice. Gain clarity on licensing, costs, course options, career pathways, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/quiz">
                ✅ Take the Quiz
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/submit-question">
                ❓ Submit a Question
              </Link>
            </Button>
          </div>
           {/* New tags section */}
          <div className="mt-10 text-center">
            <p className="text-sm text-primary-foreground/60 mb-3">
              Or jump to a popular topic:
            </p>
            <div className="flex flex-col items-center gap-1.5">
              {/* Tier 1 - Visible on all screens */}
              <div className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 gap-y-2 text-primary-foreground font-medium">
                {popularTopics.slice(0, 5).map((topic, index) => (
                  <React.Fragment key={topic.name}>
                    <Link href={topic.href} className="hover:underline text-white">
                      {topic.name}
                    </Link>
                    {index < 4 && <span className="text-primary-foreground/50">•</span>}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Tier 2 - Hidden on mobile */}
              <div className="hidden md:flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 gap-y-2 text-primary-foreground/90 font-medium">
                {popularTopics.slice(5, 12).map((topic, index) => (
                  <React.Fragment key={topic.name}>
                    <Link href={topic.href} className="hover:underline text-white">
                      {topic.name}
                    </Link>
                    {index < popularTopics.slice(5, 12).length - 1 && <span className="text-primary-foreground/50">•</span>}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Tier 3 - Hidden on mobile */}
              <div className="hidden md:flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 gap-y-2 text-primary-foreground/80 font-medium">
                 {popularTopics.slice(12, 20).map((topic, index) => (
                  <React.Fragment key={topic.name}>
                    <Link href={topic.href} className="hover:underline text-white">
                      {topic.name}
                    </Link>
                    {index < popularTopics.slice(12, 20).length - 1 && <span className="text-primary-foreground/50">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          {/* Trust Bar */}
          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-primary-foreground/70">
                <span>✅ Independent & Unbiased</span>
                <span>✅ Up-to-Date Information</span>
                <span>✅ 150+ Providers Compared</span>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Base Section */}
      <section className="py-20 md:py-24 bg-slate-50 dark:bg-card border-t">
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
      <section className="py-20 md:py-24 bg-background border-t">
         <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-center mb-12">
              <h2 className="text-3xl font-bold text-foreground bg-amber-200/80 px-6 py-2 rounded-md -rotate-1 shadow-md dark:text-gray-800">
                  📘 In-Depth Resources
              </h2>
            </div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
               <FeaturedGuideCard 
                  icon={<BookOpen className="h-6 w-6" />}
                  title="Comprehensive Guide"
                  content={<p>The full breakdown of CPP41419: structure, content, providers, costs, timeframes, and outcomes.</p>}
                  href="/guide"
                  rotationClass="transform -rotate-2 hover:-rotate-1"
               />
               <FeaturedGuideCard 
                  icon={<Map className="h-6 w-6" />}
                  title="Regional Real Estate"
                  content={<p>Insights into studying and working in real estate across major Australian cities and regional areas.</p>}
                  href="/regional-guide"
                  rotationClass="transform rotate-1 hover:rotate-0"
               />
               <FeaturedGuideCard 
                  icon={<BarChartBig className="h-6 w-6" />}
                  title="Data Insights"
                  content={<p>See how providers compare. Red flags. Trends. Real stories from students and alumni.</p>}
                  href="/data-insights"
                  rotationClass="transform rotate-3 hover:rotate-1"
               />
            </div>
         </div>
      </section>

      {/* RTO Sale Offer Section */}
      <section id="sale-offer" className="py-20 md:py-24 text-center">
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

      <FaqSchema questions={questions} />
    </div>
  );
}
