
import type { Category } from '@/types';
import { slugify } from '@/lib/utils';

interface CategoryDefinition {
  name: string;
  description: string;
}

const categoryDefinitions: CategoryDefinition[] = [
  {
    name: "Course Basics & Enrollment",
    description: "Get answers about enrolling and understanding the fundamentals of the CPP41419 qualification."
  },
  {
    name: "Study Options & Duration",
    description: "Learn about full-time vs part-time, online vs in-person, and how long it takes to finish."
  },
  {
    name: "Costs & Payment",
    description: "Understand course fees, payment plans, and hidden costs to watch out for."
  },
  {
    name: "State Licensing Requirements",
    description: "Breakdown of licensing steps and rules in your specific Australian state or territory."
  },
  {
    name: "Assessment & Completion",
    description: "Everything about course assessments, recognition of prior learning (RPL), and completing the qualification."
  },
  {
    name: "Career & Employment",
    description: "Explore where this course leads—jobs, salaries, growth paths, and real estate specialties."
  },
  {
    name: "Provider Selection",
    description: "What to consider when choosing an RTO—reviews, pricing, flexibility, and trust factors."
  },
  {
    name: "Technical Requirements",
    description: "Minimum tech specs and software needs for online study."
  },
  {
    name: "Advanced Questions",
    description: "Deep-dive into complex issues, uncommon pathways, or edge-case scenarios."
  }
];

export const categories: Category[] = categoryDefinitions.map(cat => ({
  name: cat.name,
  slug: slugify(cat.name),
  description: cat.description,
}));
