import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="container mx-auto flex h-[60vh] flex-col items-center justify-center text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Sorry, we couldn't find the page you were looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href="/">
              Go back home
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/submit-question">Contact support <span aria-hidden="true">&rarr;</span></Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
