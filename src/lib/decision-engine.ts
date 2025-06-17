
export interface RTO {
  id: string;
  rto: string;
  description: string;
  rating: number; // e.g., 9.2
  delivery: ('online' | 'in-person' | 'blended')[];
  states: string[]; // e.g., ['NSW', 'VIC'] or ['All'] for national
  features: string[];
  guide: string; // Link to their specific guide or website
  cost?: number; // Optional: e.g., 2000
  duration?: string; // Optional: e.g., "6 months"
}

// Mock RTO Data - replace with actual data source or API
const allRTOs: RTO[] = [
  {
    id: '1',
    rto: 'National Real Estate College',
    description: 'Leading provider of online real estate courses with flexible study options and comprehensive support.',
    rating: 9.5,
    delivery: ['online', 'blended'],
    states: ['All'],
    features: ['24/7 Online Access', 'Dedicated Tutors', 'Industry Connections', 'Payment Plans Available'],
    guide: 'https://example.com/nrec',
    cost: 1895,
    duration: "4-6 months"
  },
  {
    id: '2',
    rto: 'NSW Property Academy',
    description: 'Specialized in NSW real estate licensing with in-person workshops and local market expertise.',
    rating: 9.2,
    delivery: ['in-person', 'blended'],
    states: ['NSW'],
    features: ['Face-to-Face Workshops', 'NSW Specific Content', 'Job Placement Assistance', 'Small Class Sizes'],
    guide: 'https://example.com/nswpa',
    cost: 2200,
    duration: "6 months"
  },
  {
    id: '3',
    rto: 'VIC Real Estate Institute',
    description: 'Official industry body training for Victoria, ensuring up-to-date compliance and best practices.',
    rating: 9.0,
    delivery: ['blended', 'in-person'],
    states: ['VIC'],
    features: ['Industry Body Endorsed', 'VIC Licensing Experts', 'Networking Events', 'CPD Pathways'],
    guide: 'https://example.com/vrei',
    cost: 2450,
    duration: "5-7 months"
  },
  {
    id: '4',
    rto: 'QLD Online Training Pros',
    description: 'Affordable and flexible online CPP41419 for Queenslanders, get licensed quickly.',
    rating: 8.8,
    delivery: ['online'],
    states: ['QLD'],
    features: ['Fast Track Option', 'Lowest Price Guarantee', 'QLD Specific Modules', 'Easy Online Platform'],
    guide: 'https://example.com/qldotp',
    cost: 1495,
    duration: "3-5 months"
  },
  {
    id: '5',
    rto: 'WA Property Experts',
    description: 'Your go-to for real estate qualifications in Western Australia, with local support.',
    rating: 8.9,
    delivery: ['blended', 'online'],
    states: ['WA'],
    features: ['WA Market Focus', 'Local Mentors', 'Flexible Online Portal', 'Triennial Certificate Support'],
    guide: 'https://example.com/wape',
    cost: 1999,
    duration: "4-6 months"
  },
   {
    id: '6',
    rto: "SA Real Estate Hub",
    description: "Comprehensive training for South Australian real estate professionals, from entry to advanced.",
    rating: 9.1,
    delivery: ["online", "blended"],
    states: ["SA"],
    features: ["SA Licensing Pathway Expertise", "Industry Networking", "Small Group Workshops", "Career Support"],
    guide: "https://example.com/sahub",
    cost: 2100,
    duration: "5-7 months"
  },
  {
    id: '7',
    rto: "Tasmanian Training Co.",
    description: "Focused training for the Tasmanian property market, offering personalized support.",
    rating: 8.7,
    delivery: ["blended", "in-person"],
    states: ["TAS"],
    features: ["Local TAS Knowledge", "Government Funding Links", "Supportive Learning Environment", "Job Assistance"],
    guide: "https://example.com/tastrain",
    cost: 1950,
    duration: "6-8 months"
  },
  {
    id: '8',
    rto: "ACT & Capital Region College",
    description: "Specialized courses for real estate in the ACT, covering unique leasehold system.",
    rating: 8.9,
    delivery: ["online", "blended"],
    states: ["ACT"],
    features: ["ACT Leasehold Expertise", "Government Sector Links", "Flexible Study Options", "Modern Curriculum"],
    guide: "https://example.com/actcollege",
    cost: 2150,
    duration: "4-6 months"
  },
  {
    id: '9',
    rto: "NT Property Training Solutions",
    description: "Real estate training tailored for the Northern Territory market, including remote area considerations.",
    rating: 8.6,
    delivery: ["online", "blended"],
    states: ["NT"],
    features: ["NT Specific Content", "Remote Learning Support", "Cultural Awareness Training", "Experienced Local Trainers"],
    guide: "https://example.com/nttrain",
    cost: 2300,
    duration: "5-7 months"
  },
   {
    id: '10',
    rto: 'Universal Property College (Sponsored)',
    description: 'Australia-wide premium RTO with flexible online and blended learning, top-rated support, and exclusive industry partnerships. We get you job-ready faster!',
    rating: 9.8,
    delivery: ['online', 'blended'],
    states: ['All'],
    features: ['Fast-Track Options', 'Guaranteed Work Experience Interviews', 'Advanced Digital Marketing Modules', 'Lifetime Career Support', 'AI-Powered Learning Tools'],
    guide: 'https://realestatesuccess.edu.au/', // Example sponsored link
    cost: 2750,
    duration: "3-6 months (flexible)"
  }
];

interface FormData {
  delivery: string;
  state: string;
}

export function matchRTO(formData: FormData): RTO[] {
  const { delivery, state } = formData;

  const filteredRTOs = allRTOs.filter(rto => {
    const deliveryMatch = rto.delivery.includes(delivery.toLowerCase() as any) || rto.delivery.includes('blended');
    const stateMatch = rto.states.includes('All') || rto.states.includes(state.toUpperCase());
    return deliveryMatch && stateMatch;
  });

  // Simple ranking: higher rating first, then by cost (lower is better if rating is same)
  // Ensure sponsored RTO is always first if it matches criteria
  const sortedRTOs = filteredRTOs.sort((a, b) => {
    if (a.rto.includes('(Sponsored)')) return -1; // Sponsored always first among matches
    if (b.rto.includes('(Sponsored)')) return 1;

    if (b.rating === a.rating) {
      return (a.cost || Infinity) - (b.cost || Infinity);
    }
    return b.rating - a.rating;
  });

  return sortedRTOs;
}

    