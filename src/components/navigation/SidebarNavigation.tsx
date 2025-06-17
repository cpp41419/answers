
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/data/categories';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, BarChartBig, BookText, Landmark, Rss, ClipboardCheck } from 'lucide-react'; // Added Landmark, Rss, ClipboardCheck

export function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-full px-1"> {/* Added px-1 to match sidebar header/footer padding */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname === '/'}
            className="w-full justify-start"
            tooltip="Home"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Data Insights Link */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname === '/data-insights'}
            className="w-full justify-start"
            tooltip="Data Insights"
          >
            <Link href="/data-insights">
              <BarChartBig className="mr-2 h-4 w-4" />
              <span>Data Insights</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Comprehensive Guide Link */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname === '/guide'}
            className="w-full justify-start"
            tooltip="Comprehensive Guide"
          >
            <Link href="/guide">
              <BookText className="mr-2 h-4 w-4" />
              <span>Comprehensive Guide</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Regional Guide Link */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname === '/regional-guide'}
            className="w-full justify-start"
            tooltip="Regional Real Estate Guide"
          >
            <Link href="/regional-guide">
              <Landmark className="mr-2 h-4 w-4" />
              <span>Regional Guide</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Popular Blogs Link */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname === '/popular-blogs'}
            className="w-full justify-start"
            tooltip="Popular Blogs"
          >
            <Link href="/popular-blogs">
              <Rss className="mr-2 h-4 w-4" />
              <span>Popular Blogs</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        
        {/* Quiz Page Link */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname === '/quiz'}
            className="w-full justify-start"
            tooltip="Find Your Provider Quiz"
          >
            <Link href="/quiz">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              <span>Provider Quiz</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>


        {categories.map((category) => {
          const href = `/questions/${category.slug}`;
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <SidebarMenuItem key={category.slug}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className="w-full justify-start"
                tooltip={category.name}
              >
                <Link href={href}>
                  {/* Consider adding icons per category if available/desired */}
                  <span>{category.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </ScrollArea>
  );
}

    