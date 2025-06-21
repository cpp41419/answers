import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CategoryCard } from '@/components/qa/CategoryCard';
import { categories } from '@/data/categories';
import { ArrowRight, BookOpen, Map, BarChartBig } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ANSWERS - Your CPP41419 Real Estate Authority Resource',
  description: 'The definitive, community-driven guide to the CPP41419 Certificate IV in Real Estate Practice. Gain clarity on licensing, costs, course options, career pathways, and more.',
};

const FeaturedGuideCard = ({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href: string }) => (
  <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow rounded-xl">
    <CardHeader>
      <div className="flex items-center gap-3 mb-2">
        <span className="p-3 bg-primary/10 text-primary rounded-lg">
          {icon}
        </span>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-muted-foreground text-sm">{description}</p>
    </CardContent>
    <CardFooter>
      <Button asChild variant="outline" className="w-full">
        <Link href={href}>
          Read Guide <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function HomePage() {
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
            <div className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 gap-y-2 text-primary-foreground/80 font-medium">
              <Link href="/questions/state-licensing-requirements" className="hover:text-primary-foreground hover:underline">Licensing</Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/questions/costs-payment" className="hover:text-primary-foreground hover:underline">Course Costs</Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/questions/career-employment" className="hover:text-primary-foreground hover:underline">Career Paths</Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/questions/study-options-duration" className="hover:text-primary-foreground hover:underline">Online Study</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            🔍 Explore Question Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Guides Section */}
      <section className="py-20 md:py-24 bg-slate-50 dark:bg-card border-t">
         <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                📘 In-Depth Resources
            </h2>
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
               <FeaturedGuideCard 
                  icon={<BookOpen className="h-6 w-6" />}
                  title="Comprehensive Guide"
                  description="The full breakdown of CPP41419: structure, content, providers, costs, timeframes, and outcomes."
                  href="/guide"
               />
               <FeaturedGuideCard 
                  icon={<Map className="h-6 w-6" />}
                  title="Regional Real Estate"
                  description="Insights into studying and working in real estate across major Australian cities and regional areas."
                  href="/regional-guide"
               />
               <FeaturedGuideCard 
                  icon={<BarChartBig className="h-6 w-6" />}
                  title="Data Insights"
                  description="See how providers compare. Red flags. Trends. Real stories from students and alumni."
                  href="/data-insights"
               />
            </div>
         </div>
      </section>
    </div>
  );
}
