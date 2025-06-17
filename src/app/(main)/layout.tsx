
import type { ReactNode } from 'react';
import { MainLayout } from '@/components/layout/MainLayout'; // This now refers to the new MainLayout

// This layout applies to all routes within the (main) group.
// It will use the new MainLayout which includes Header, Footer, MobileMenu, GlobalSearch.

export default function MainAppLayout({ children }: { children: ReactNode }) {
  // The breadcrumbItems prop will be passed down from individual page.tsx files
  // For a default, or if pages don't set it, MainLayout handles it.
  // Or, we can decide that breadcrumbs are always defined at page level.
  // For now, MainLayout's default handles breadcrumb visibility.
  return <MainLayout>{children}</MainLayout>;
}
