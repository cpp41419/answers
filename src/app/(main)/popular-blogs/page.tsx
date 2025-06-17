
'use client'; // This page now needs client-side state for filtering

import { useState, useMemo } from 'react';
import type { Metadata } from 'next'; // Metadata is typically for server components or page.tsx exports
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/core/Breadcrumbs';
import { ArrowRight, Rss } from 'lucide-react';
import { CategoryFilter } from '@/components/filters/CategoryFilter'; // Import the filter

// export const metadata: Metadata = { // Keep for SSR if possible, or manage title dynamically
//   title: 'Popular Real Estate Blogs & Articles | CPP41419 Q&A',
//   description: 'Discover insightful articles and blog posts on real estate practice, market trends, and career development related to CPP41419.',
//   keywords: ['real estate blog', 'property articles', 'real estate insights', 'CPP41419 career', 'market trends Australia'],
// };

interface BlogPost { // Renamed from BlogPostCardProps for clarity and added category
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  href?: string;
  category: string; // e.g., 'guides', 'digital-trends'
}

const BlogPostCard: React.FC<BlogPost> = ({ title, description, imageUrl, imageHint, href, category }) => (
  <Card className="flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
    <div className="relative w-full h-48">
      <Image
        src={imageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        data-ai-hint={imageHint}
      />
    </div>
    <CardHeader>
      <CardTitle className="text-xl font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <CardDescription className="text-sm line-clamp-3">{description}</CardDescription>
    </CardContent>
    <CardFooter className="flex justify-between items-center">
      <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">{category}</span>
      <Button asChild variant="outline" size="sm" className="group">
        <Link href={href || "#"} target={href ? "_blank" : "_self"} rel={href ? "noopener noreferrer" : ""}>
          Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

// Initial blog posts data - ensure each has a category matching filterCategories
const initialBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: "Navigating Your First Year as a Real Estate Agent",
    description: "Tips and tricks for surviving and thriving in your initial year in the competitive real estate market. Learn how to build your network and close your first deals.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "new agent office",
    href: "https://cpp41419.com.au/blog/first-year-agent",
    category: "student-advice" 
  },
  {
    id: 'blog-2',
    title: "Understanding the Latest PropTech Innovations",
    description: "An overview of cutting-edge technologies transforming the property industry, from AI-powered valuations to virtual reality tours.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "proptech innovation interface",
    category: "digital-trends"
  },
  {
    id: 'blog-3',
    title: "Mastering Digital Marketing for Real Estate in 2025",
    description: "Essential digital marketing strategies for agents, including social media engagement, SEO for listings, and effective email campaigns.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "digital marketing real estate",
    category: "digital-trends"
  },
  {
    id: 'blog-4',
    title: "The Future of Sustainable Housing in Australia",
    description: "Exploring trends in eco-friendly building practices, green certifications, and how they impact property values and buyer preferences.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "sustainable housing modern",
    category: "guides" 
  },
  {
    id: 'blog-5',
    title: "Deep Dive into NSW Licensing Changes",
    description: "A comprehensive look at the latest updates to NSW real estate licensing and what they mean for agents.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "legal document nsw",
    category: "licensing"
  },
  {
    id: 'blog-6',
    title: "Choosing the Right RTO: A Student's Perspective",
    description: "An honest review and guide on selecting a Registered Training Organisation that fits your learning style and career goals.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "student studying online",
    category: "rto-reviews"
  }
];


export default function PopularBlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Set document title dynamically for client components
  useEffect(() => {
    document.title = 'Popular Real Estate Blogs & Articles | CPP41419 Q&A';
  }, []);
  
  const filteredBlogPosts = useMemo(() => {
    return initialBlogPosts.filter(post => {
      const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
      const searchTermMatch = searchTerm === '' || 
                              post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              post.description.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchTermMatch;
    });
  }, [selectedCategory, searchTerm]);

  const pageBreadcrumbs = [
    { label: 'Home', href: '/' }, 
    { label: 'Popular Blogs' }
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 space-y-8">
      {/* Breadcrumbs are now handled by MainLayout, but we pass the items */}
      {/* <Breadcrumbs items={pageBreadcrumbs} /> */}
      
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center">
          <Rss className="mr-3 h-8 w-8 text-primary" /> Popular Real Estate Blogs & Articles
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Stay updated with the latest insights, trends, and advice from the real estate world.
        </p>
      </header>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        articles={initialBlogPosts} // Pass all articles for counting
      />

      {filteredBlogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              {...post}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No articles found matching your criteria.</p>
          <Button variant="link" onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }} className="mt-4">
            Clear Filters
          </Button>
        </div>
      )}

      <Card className="mt-8 bg-accent/10 border-accent/30 rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center font-semibold text-accent-foreground dark:text-accent-foreground">
            Contribute to Our Blog
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2 text-sm text-foreground/90 space-y-2">
          <p>Have an interesting article or insight you'd like to share? We are always looking for fresh perspectives on the real estate industry, especially related to CPP41419 and career development.</p>
          <Button variant="secondary" asChild>
            <Link href="/contact-us"> {/* Assuming a contact page might exist or be created */}
              Submit Your Article Idea
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// It's good practice to define a metadata object for Next.js App Router if needed,
// but for dynamic titles in client components, useEffect is common.
// If this page were a Server Component, this would be the way:
export const metadata: Metadata = {
  title: 'Popular Real Estate Blogs & Articles | CPP41419 Q&A',
  description: 'Discover insightful articles and blog posts on real estate practice, market trends, and career development related to CPP41419.',
  keywords: ['real estate blog', 'property articles', 'real estate insights', 'CPP41419 career', 'market trends Australia'],
};

// This line is needed to ensure the Breadcrumbs in MainLayout receive the correct items
// If you want to manage breadcrumbs from page level directly.
export function getStaticProps() {
  return {
    props: {
      breadcrumbItems: [
        { label: 'Home', href: '/' },
        { label: 'Popular Blogs' }
      ]
    }
  };
}
