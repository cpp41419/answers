
'use client';

import { Filter, Search } from 'lucide-react';

// Using the categories provided by the user for this filter
const filterCategories = [
  { 
    id: 'all', 
    name: 'All Articles', 
    description: 'View all insights and analysis',
    color: 'bg-muted text-muted-foreground hover:bg-muted/80' // Using theme colors
  },
  { 
    id: 'guides', 
    name: 'Course Guides', 
    description: 'Comprehensive guides to CPP41419',
    color: 'bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 hover:bg-blue-500/20'
  },
  { 
    id: 'rto-reviews', 
    name: 'RTO Reviews', 
    description: 'Performance analysis of training providers',
    color: 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-500/20'
  },
  { 
    id: 'digital-trends', 
    name: 'Digital Trends', 
    description: 'Technology in real estate education',
    color: 'bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 hover:bg-purple-500/20'
  },
  { 
    id: 'licensing', 
    name: 'Licensing Info', 
    description: 'State requirements and regulations',
    color: 'bg-orange-500/10 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 hover:bg-orange-500/20'
  },
  { 
    id: 'student-advice', 
    name: 'Student Advice', 
    description: 'Tips for prospective students',
    color: 'bg-pink-500/10 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400 hover:bg-pink-500/20'
  }
];

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

// Assuming articles have a 'category' field matching one of the ids above
interface Article {
  id: string; // Or some unique identifier
  title: string;
  description: string;
  category: string; // e.g., 'guides', 'rto-reviews'
  [key: string]: any; // Allow other properties
}

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  articles: Article[]; // Pass the articles to count them
}

export function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange, 
  searchTerm, 
  onSearchChange,
  articles 
}: CategoryFilterProps) {
  
  const currentCategoryDescription = filterCategories.find(c => c.id === selectedCategory)?.description || 'Filter articles by category or search term.';

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-muted-foreground mr-2" />
          <h2 className="text-lg font-semibold text-foreground">Filter Articles</h2>
        </div>
        <div className="text-sm text-muted-foreground text-left sm:text-right">
          {currentCategoryDescription}
        </div>
      </div>
      
      <div className="relative mb-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search articles by title, keyword..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-base"
        />
      </div>
      
      <div className="flex flex-wrap gap-3">
        {filterCategories.map(category => {
          const count = category.id === 'all' 
            ? articles.length 
            : articles.filter(a => a.category === category.id).length;
          
          const isActive = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-primary/50
                ${
                  isActive
                    ? `${category.color} shadow-md` // Active category uses its specific color string
                    : 'bg-background text-foreground border border-border hover:bg-muted' // Inactive uses theme neutrals
                }`}
            >
              {category.name} <span className="text-xs opacity-75">({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

