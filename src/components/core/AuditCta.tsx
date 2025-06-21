import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export function AuditCta() {
  return (
    <section className="bg-background py-16 md:py-20 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="bg-gradient-to-r from-primary to-[hsl(var(--deep-navy))] text-primary-foreground shadow-xl rounded-2xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center text-center md:text-left p-8 md:p-12 gap-8">
            <div className="flex-shrink-0">
              <div className="p-4 bg-white/20 rounded-full">
                <ShieldCheck className="h-16 w-16 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl md:text-3xl font-bold text-white">
                Is Your RTO Maximising its Potential?
              </CardTitle>
              <CardDescription className="mt-2 text-lg text-primary-foreground/80">
                Get a complimentary audit of your online presence and lead generation strategy. Discover opportunities to improve student enrollment and brand visibility.
              </CardDescription>
            </div>
            <div className="flex-shrink-0 mt-6 md:mt-0">
              <Button asChild size="lg" className="bg-accent text-accent-foreground font-bold hover:bg-accent/90 w-full md:w-auto">
                <a href="https://online.cpp41419.com.au/" target="_blank" rel="noopener noreferrer">
                  Request Free Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
