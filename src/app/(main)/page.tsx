import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CategoryCard } from '@/components/qa/CategoryCard';
import { categories } from '@/data/categories';
import { ArrowRight, BookOpen, Map, BarChartBig, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CPP41419 Q&A - Answers for Australian Real Estate Training',
  description: 'Your independent, community-driven guide to the CPP41419 Certificate IV in Real Estate Practice. Find answers, ask questions, and get expert insights.',
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
            Australia's Largest CPP41419 Q&A Resource
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-primary-foreground/80 mb-8">
            Your independent, community-driven guide to the Certificate IV in Real Estate Practice. Find answers, ask questions, and get expert insights.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/submit-question">
                <Lightbulb className="mr-2" />
                Submit a Question
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="hover:bg-primary-foreground/10 text-primary-foreground" asChild>
              <Link href="#categories">
                Explore Categories <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Explore Question Categories
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
                In-Depth Resources
            </h2>
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
               <FeaturedGuideCard 
                  icon={<BookOpen className="h-6 w-6" />}
                  title="Comprehensive Guide"
                  description="The ultimate guide to the CPP41419 course, from its history and structure to costs, providers, and career outcomes."
                  href="/guide"
               />
               <FeaturedGuideCard 
                  icon={<Map className="h-6 w-6" />}
                  title="Regional Real Estate"
                  description="Discover the nuances of starting your real estate career in different Australian cities and regions, from Sydney to Perth."
                  href="/regional-guide"
               />
               <FeaturedGuideCard 
                  icon={<BarChartBig className="h-6 w-6" />}
                  title="Data Insights"
                  description="Explore data-driven insights into the education provider sector, including potential red flags and suspect behaviors."
                  href="/data-insights"
               />
            </div>
         </div>
      </section>
    </div>
  );
}
