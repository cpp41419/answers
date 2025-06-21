
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
      <Card className="h-full flex flex-col hover:border-primary/50 hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden"> {/* Increased rounding and shadow */}
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-3 bg-primary/10 text-primary rounded-lg"> {/* Adjusted padding & rounding */}
              <HelpCircle className="h-6 w-6" />
            </span>
            <CardTitle className="text-lg font-semibold">{category.name}</CardTitle>
          </div>
          {category.description && (
            <CardDescription className="text-sm leading-relaxed line-clamp-3 h-16">{category.description}</CardDescription> /* Added fixed height */
          )}
        </CardHeader>
        <CardFooter className="mt-auto pt-4 border-t border-border/50">
            <div className="text-sm text-primary group-hover:underline flex items-center font-medium"> {/* Added font-medium */}
                View Questions
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
