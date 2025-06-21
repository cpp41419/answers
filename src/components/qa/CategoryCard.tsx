import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowRight, HelpCircle } from 'lucide-react'; 
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/questions/${category.slug}`} className="group block h-full">
      <Card className="h-full flex flex-col bg-[hsl(var(--deep-navy))] text-primary-foreground hover:ring-2 hover:ring-accent transition-all duration-300 rounded-xl overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-3 bg-primary-foreground/10 text-primary-foreground rounded-lg">
              <HelpCircle className="h-6 w-6" />
            </span>
            <CardTitle className="text-lg font-semibold text-primary-foreground">{category.name}</CardTitle>
          </div>
          {category.description && (
            <CardDescription className="text-sm leading-relaxed line-clamp-3 h-16 text-primary-foreground/80">{category.description}</CardDescription>
          )}
        </CardHeader>
        <CardFooter className="mt-auto pt-4 border-t border-primary-foreground/20">
            <div className="text-sm text-primary-foreground/80 group-hover:text-primary-foreground group-hover:underline flex items-center font-medium transition-colors">
                View Questions
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
