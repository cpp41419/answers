
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Breadcrumbs } from '@/components/core/Breadcrumbs';
import { CheckCircle, Info, AlertTriangle, XCircle, BookOpen, Clock, DollarSign, Award, BarChart2, Users, Briefcase, TrendingUp, PlayCircle, ShieldCheck, BookCopy, Building, UserCheck } from 'lucide-react';
import MermaidDiagram from '@/components/core/MermaidDiagram'; // Import the new component
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'CPP41419 Certificate IV - Complete Australian Guide | CPP41419 Q&A',
  description: 'A comprehensive guide to the CPP41419 Certificate IV in Real Estate Practice across Australia, covering course history, state licensing, costs, providers, and career pathways.',
  keywords: ['CPP41419 complete guide', 'Certificate IV in Real Estate Practice', 'real estate course Australia', 'how to become a real estate agent', 'NSW real estate license', 'VIC agent representative', 'QLD real estate registration', 'RTO course comparison', 'real estate career pathways', 'real estate salary Australia'],
};

interface SpecialBlockProps {
  type: 'abstract' | 'info' | 'timeline' | 'example' | 'tip' | 'warning' | 'important' | 'check' | 'question' | 'note' | 'success';
  title?: string;
  children: React.ReactNode;
}

const SpecialBlock: React.FC<SpecialBlockProps> = ({ type, title, children }) => {
  let IconComponent: React.ElementType = Info;
  let alertVariant: "default" | "destructive" = "default";
  let effectiveTitle = title || type.charAt(0).toUpperCase() + type.slice(1);

  switch (type) {
    case 'abstract': IconComponent = BookOpen; break;
    case 'info': IconComponent = Info; break;
    case 'timeline': IconComponent = Clock; break;
    case 'example': IconComponent = PlayCircle; break;
    case 'tip': IconComponent = CheckCircle; alertVariant = "default"; break; 
    case 'warning': IconComponent = AlertTriangle; alertVariant = "default"; break; 
    case 'important': IconComponent = AlertTriangle; break;
    case 'check': IconComponent = CheckCircle; break;
    case 'question': IconComponent = Info; break; 
    case 'note': IconComponent = Info; break;
    case 'success': IconComponent = CheckCircle; break;
    default: IconComponent = Info;
  }

  return (
    <Alert variant={alertVariant} className="my-4">
      <IconComponent className="h-4 w-4" />
      <AlertTitle>{effectiveTitle}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};

const DataTable: React.FC<{ headers: string[], rows: (string | React.ReactNode)[][] }> = ({ headers, rows }) => (
  <div className="my-4 overflow-x-auto">
    <table className="min-w-full divide-y divide-border">
      <thead className="bg-muted/50">
        <tr>
          {headers.map((header, index) => (
            <th key={index} scope="col" className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-card divide-y divide-border">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-4 py-3 whitespace-nowrap text-sm text-card-foreground align-top">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function ComprehensiveGuidePage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Comprehensive Guide' }]} />
      
      <header className="pb-6 border-b">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          CPP41419 Certificate IV in Real Estate Practice - Complete Australian Guide
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Welcome to the most comprehensive resource for understanding the CPP41419 Certificate IV in Real Estate Practice across Australia.
        </p>
      </header>

      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Introduction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 prose max-w-none dark:prose-invert">
          <SpecialBlock type="abstract" title="Navigation Hub">
            This comprehensive guide covers everything you need to know about CPP41419 across Australia. Use the sections below to jump to specific topics:
            <ul className="list-disc pl-5 mt-2">
              <li><Link href="#course-history" className="text-primary hover:underline">Course History</Link></li>
              <li><Link href="#course-overview" className="text-primary hover:underline">Course Overview</Link></li>
              <li><Link href="#state-requirements" className="text-primary hover:underline">State Requirements</Link></li>
              <li><Link href="#cost-breakdown" className="text-primary hover:underline">Cost Breakdown</Link></li>
              <li><Link href="#provider-selection" className="text-primary hover:underline">Provider Selection</Link></li>
              <li><Link href="#career-outcomes" className="text-primary hover:underline">Career Outcomes</Link></li>
              <li><Link href="#industry-outlook" className="text-primary hover:underline">Industry Outlook</Link></li>
              <li><Link href="#getting-started" className="text-primary hover:underline">Getting Started</Link></li>
              <li><Link href="#faq-guide" className="text-primary hover:underline">FAQ</Link></li>
              <li><Link href="#related-resources" className="text-primary hover:underline">Related Resources</Link></li>
            </ul>
          </SpecialBlock>
          <p>Whether you're considering a career change, just finishing school, or looking to upgrade your qualifications, this guide provides everything you need to make informed decisions about your real estate education journey.</p>
          <SpecialBlock type="info" title="Source Authority">
            All information in this guide has been verified against current regulatory requirements and industry standards. For the most up-to-date provider comparisons and licensing information, visit <Link href="https://cpp41419.com.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au</Link>.
          </SpecialBlock>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl" id="course-history">
        <CardHeader><CardTitle className="text-2xl font-semibold flex items-center"><Clock className="mr-2 h-6 w-6 text-primary" /> Course History and Evolution</CardTitle></CardHeader>
        <CardContent className="space-y-4 prose max-w-none dark:prose-invert">
          <SpecialBlock type="timeline" title="CPP41419 Development">
            <strong>2001-2018: CPP40307 Era</strong> → Foundation qualification with basic training <br />
            <strong>2019: CPP41419 Introduction</strong> → Enhanced digital and ethical components <br />
            <strong>2020-2025: Industry Modernization</strong> → PropTech integration and sustainability focus
          </SpecialBlock>
          <p>The CPP41419 Certificate IV in Real Estate Practice represents the latest iteration of Australia's nationally recognized real estate qualification, introduced in 2019 to replace the outdated CPP40307. This evolution reflected the industry's need for modern practitioners equipped with digital skills, enhanced ethical frameworks, and contemporary compliance knowledge.</p>
          
          <h3>Key Historical Milestones</h3>
          <MermaidDiagram 
            id="cpp41419-evolution-timeline"
            title="CPP41419 Evolution Timeline" 
            code={`
timeline
    title CPP41419 Evolution Timeline
    2001 : CPP40307 Introduced
         : Basic property law focus
    2010 : Digital integration begins
         : Online delivery emerges
    2019 : CPP41419 Launch
         : Enhanced ethical requirements
         : Digital marketing components
    2025 : Current Standard
         : PropTech awareness
         : Sustainability emphasis
          `} />
          
          <h4>2001-2018: CPP40307 Era</h4>
          <ul className="list-disc pl-5">
            <li>Foundation qualification for real estate licensing</li>
            <li>Basic property law and sales training</li>
            <li>Limited digital component</li>
            <li>State-specific variations in implementation</li>
          </ul>

          <h4>2019: CPP41419 Introduction</h4>
          <ul className="list-disc pl-5">
            <li>Enhanced ethical practice requirements</li>
            <li>Digital marketing and communication profiles</li>
            <li>Strengthened trust account management</li>
            <li>Standardized national approach</li>
          </ul>

          <h4>2020-2025: Industry Modernization</h4>
          <ul className="list-disc pl-5">
            <li>Integration of PropTech awareness</li>
            <li>Consumer protection emphasis</li>
            <li>Environmental sustainability considerations</li>
            <li>Remote work capability development</li>
          </ul>
          <SpecialBlock type="important" title="Transition Impact">
            The change from CPP40307 to CPP41419 addressed critical industry gaps in technology integration, consumer protection, regulatory compliance, and professional standards.
          </SpecialBlock>

          <h3>Why the Change?</h3>
          <SpecialBlock type="check" title="Industry Modernization Drivers">
            <ul className="list-disc pl-5">
              <li><strong>Technology Integration</strong>: Modern real estate requires digital literacy for CRM systems, online marketing, and virtual inspections. (Source: <Link href="https://cpp41419.com.au/digital-skills" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/digital-skills</Link>)</li>
              <li><strong>Consumer Protection</strong>: Enhanced focus on ethical practice and transparent communication. (Source: <Link href="https://cpp41419.com.au/consumer-protection" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/consumer-protection</Link>)</li>
              <li><strong>Regulatory Compliance</strong>: Strengthened understanding of evolving state and federal regulations. (Source: <Link href="https://cpp41419.com.au/compliance" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/compliance</Link>)</li>
              <li><strong>Professional Standards</strong>: Higher expectations for continuing professional development. (Source: <Link href="https://cpp41419.com.au/cpd-requirements" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/cpd-requirements</Link>)</li>
            </ul>
          </SpecialBlock>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl" id="course-overview">
        <CardHeader><CardTitle className="text-2xl font-semibold flex items-center"><BookOpen className="mr-2 h-6 w-6 text-primary" /> Course Overview</CardTitle></CardHeader>
        <CardContent className="space-y-4 prose max-w-none dark:prose-invert">
          <SpecialBlock type="info" title="National Recognition">
            CPP41419 is recognized across all Australian states and territories, though each jurisdiction has specific licensing requirements and processes. (Source: <Link href="https://cpp41419.com.au/national-recognition" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/national-recognition</Link>)
          </SpecialBlock>
          <SpecialBlock type="example" title="Quick Course Facts">
             <ul className="list-disc pl-5">
              <li><strong>Duration</strong>: 3-8 months</li>
              <li><strong>Assessment</strong>: Project-based (no exams)</li>
              <li><strong>Delivery</strong>: Online, classroom, or blended</li>
              <li><strong>Recognition</strong>: All Australian states and territories</li>
            </ul>
          </SpecialBlock>
          <h3>What is CPP41419?</h3>
          <p>The Certificate IV in Real Estate Practice is Australia's mandatory qualification for anyone seeking to work as a licensed real estate agent. (Source: <Link href="https://cpp41419.com.au/what-is-cpp41419" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/what-is-cpp41419</Link>) This nationally accredited course covers essential skills in:</p>
          <SpecialBlock type="abstract" title="Core Learning Areas">
            <pre className="text-sm p-2 bg-muted/50 rounded"><code>
┌─ Property Sales and Marketing
├─ Residential and Commercial Leasing  
├─ Trust Account Management
├─ Legal and Ethical Compliance
├─ Client Relationship Management
└─ Digital Communication Strategies
            </code></pre>
          </SpecialBlock>

          <h3>National Standards and Accreditation</h3>
            <SpecialBlock type="important" title="Ensuring Quality and Consistency">
              The CPP41419 qualification adheres to strict national standards to ensure quality and consistency across Australia:
              <ul className="list-disc pl-5 mt-2">
                <li>
                  <strong>ASQA (Australian Skills Quality Authority)</strong>: ASQA is the national regulator for Australia’s vocational education and training (VET) sector. Registered Training Organisations (RTOs) delivering CPP41419 must be registered with ASQA and meet rigorous standards related to training delivery, assessment practices, student support, and governance. This ensures that the qualification you receive is from a reputable provider meeting national quality benchmarks. (Source: <Link href="https://www.asqa.gov.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">asqa.gov.au</Link>)
                </li>
                <li>
                  <strong>AQF Level 4 (Australian Qualifications Framework)</strong>: The Certificate IV in Real Estate Practice is an AQF Level 4 qualification. This signifies that graduates possess theoretical and practical knowledge and skills for specialized and/or skilled work and/or learning. AQF Level 4 qualifications prepare individuals to undertake skilled work, provide leadership and guidance to others, and solve a range of problems with some complexity. It indicates a capability to work independently and take responsibility for their own outputs in work and learning. (Source: <Link href="https://www.aqf.edu.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">aqf.edu.au</Link>)
                </li>
              </ul>
              Understanding these frameworks helps confirm the credibility and standard of the CPP41419 qualification.
            </SpecialBlock>

          <h3>Course Structure</h3>
          <SpecialBlock type="note" title="Unit Breakdown">
             <strong>Total Units</strong>: 18 (5 Core + 13 Electives) (Source: <Link href="https://cpp41419.com.au/course-structure" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/course-structure</Link>)<br/>
             <strong>Duration</strong>: 3-8 months (varies by provider and study mode)<br/>
             <strong>Delivery</strong>: Online, classroom, or blended learning options<br/>
             <strong>Assessment</strong>: Project-based assignments (no exams)
          </SpecialBlock>

          <h4>Core Units (Mandatory for All Students)</h4>
          <MermaidDiagram 
            id="core-unit-map"
            title="Core Unit Map" 
            code={`
graph LR
    A[CPPREP4001<br/>Professional Practice] --> B[CPPREP4002<br/>Ethical Practice]
    B --> C[CPPREP4003<br/>Legislation]
    C --> D[CPPREP4004<br/>Marketing & Communication]
    D --> E[CPPREP4005<br/>Trust Accounts]
          `} />
          <div className="space-y-3 mt-4">
            <div className="flex items-center gap-4 rounded-lg border bg-card p-3 shadow-sm">
              <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-1.5 rounded-md">CPPREP4001</span>
              <p className="flex-1 text-sm text-card-foreground">Prepare for professional practice in real estate</p>
            </div>
            <div className="flex items-center gap-4 rounded-lg border bg-card p-3 shadow-sm">
              <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-1.5 rounded-md">CPPREP4002</span>
              <p className="flex-1 text-sm text-card-foreground">Access and interpret ethical practice in real estate</p>
            </div>
            <div className="flex items-center gap-4 rounded-lg border bg-card p-3 shadow-sm">
              <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-1.5 rounded-md">CPPREP4003</span>
              <p className="flex-1 text-sm text-card-foreground">Access and interpret legislation in real estate</p>
            </div>
            <div className="flex items-center gap-4 rounded-lg border bg-card p-3 shadow-sm">
              <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-1.5 rounded-md">CPPREP4004</span>
              <p className="flex-1 text-sm text-card-foreground">Establish marketing and communication profiles in real estate</p>
            </div>
            <div className="flex items-center gap-4 rounded-lg border bg-card p-3 shadow-sm">
              <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-1.5 rounded-md">CPPREP4005</span>
              <p className="flex-1 text-sm text-card-foreground">Prepare to work with real estate trust accounts</p>
            </div>
          </div>
          
          <h4 className="pt-4">Common Elective Units</h4>
          <SpecialBlock type="example" title="Popular Elective Streams">
            Providers typically bundle elective units based on common career paths like sales or property management. Here are some of the most frequently offered elective units from different specializations:
          </SpecialBlock>
          <div className="space-y-3 mt-4">
            <div className="flex items-center gap-4 rounded-lg border bg-card p-3 shadow-sm">
              <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-2.5 py-1.5 rounded-md">CPPREP4102</span>
              <p className="flex-1 text-sm text-card-foreground">Market property (Sales)</p>
            </div>
            <div className="flex items-center gap-4 rounded-lg border bg-card p-3 shadow-sm">
              <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-2.5 py-1.5 rounded-md">CPPREP4105</span>
              <p className="flex-1 text-sm text-card-foreground">Sell property (Sales)</p>
            </div>
            <div className="flex items-center gap-4 rounded-lg border bg-card p-3 shadow-sm">
              <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-2.5 py-1.5 rounded-md">CPPREP4121</span>
              <p className="flex-1 text-sm text-card-foreground">Establish and maintain property management portfolio (Property Management)</p>
            </div>
            <div className="flex items-center gap-4 rounded-lg border bg-card p-3 shadow-sm">
              <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-2.5 py-1.5 rounded-md">CPPREP4122</span>
              <p className="flex-1 text-sm text-card-foreground">Manage tenant relationships (Property Management)</p>
            </div>
            <div className="flex items-center gap-4 rounded-lg border bg-card p-3 shadow-sm">
              <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-2.5 py-1.5 rounded-md">CPPREP4162</span>
              <p className="flex-1 text-sm text-card-foreground">Conduct and complete property sale by auction (Auctioneering)</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg rounded-xl" id="state-requirements">
        <CardHeader><CardTitle className="text-2xl font-semibold flex items-center"><BarChart2 className="mr-2 h-6 w-6 text-primary" /> State-by-State Licensing Deep Dive</CardTitle></CardHeader>
        <CardContent className="space-y-4 prose max-w-none dark:prose-invert">
          <SpecialBlock type="abstract" title="Navigation Map (State Guides)">
            Click to jump to detailed state guides:
            <ul className="list-disc pl-5 mt-2">
              <li><Link href="#nsw" className="text-primary hover:underline">NSW - Two-Step Progression</Link></li>
              <li><Link href="#vic" className="text-primary hover:underline">VIC - Agent's Representative Path</Link></li>
              <li><Link href="#qld" className="text-primary hover:underline">QLD - Registration to Salesperson</Link></li>
              <li><Link href="#wa" className="text-primary hover:underline">WA - Triennial System</Link></li>
              <li><Link href="#sa" className="text-primary hover:underline">SA - Land and Business Agent Path</Link></li>
              <li><Link href="#tas" className="text-primary hover:underline">TAS - Property Agent Registration</Link></li>
              <li><Link href="#act" className="text-primary hover:underline">ACT - Government Focus</Link></li>
              <li><Link href="#nt" className="text-primary hover:underline">NT - Remote Area Considerations</Link></li>
            </ul>
          </SpecialBlock>
          <p>Each Australian state and territory has unique licensing pathways and requirements, primarily governed by state-specific legislation and regulatory bodies. While CPP41419 provides the foundational educational qualification, understanding these local nuances is critical for aspiring real estate professionals.</p>
          
          <div id="nsw" className="pt-4">
            <h4 className="text-xl font-bold border-b pb-2 mb-4">New South Wales (NSW)</h4>
            <SpecialBlock type="tip" title="NSW Pathway Overview">
              <p>In New South Wales, the real estate licensing framework is overseen by <strong>NSW Fair Trading</strong>, operating under the <strong>Property and Stock Agents Act 2002</strong>. This legislation outlines the requirements for individuals wishing to work in the property industry, emphasizing consumer protection and professional standards.</p>
            </SpecialBlock>
            <DataTable 
              headers={["Stage", "Requirement", "Allows You To"]}
              rows={[
                ["Step 1: Assistant Agent", 
                  <>Complete 5 core units of CPP41419.<br/>Obtain Certificate of Registration.</>, 
                  "Work under supervision of a licensed agent. Perform sales and leasing tasks."
                ],
                ["Step 2: Class 2 Agent", 
                  <>Complete full CPP41419 qualification.<br/>12 months practical experience.</>, 
                  "Work independently as a sales agent or property manager."
                ],
                ["Step 3: Class 1 Agent", 
                  <>Complete Diploma of Property (CPP51122).<br/>24 months practical experience.</>, 
                  "Open and manage your own real estate agency."
                ],
              ]}
            />
            <SpecialBlock type="info" title="NSW Job Market Insights">
              <ul className="list-disc pl-5">
                <li><strong>Key Hubs:</strong> Sydney CBD, North Shore, Eastern Suburbs, Western Sydney growth corridors.</li>
                <li><strong>Average Salary (Entry):</strong> $55,000 - $70,000 + commission.</li>
                <li><strong>Unique Trait:</strong> Extremely competitive auction culture. Specialization in a specific suburb or property type is crucial for success in Sydney.</li>
              </ul>
            </SpecialBlock>
             <SpecialBlock type="check" title="Top Rated Providers in NSW">
              <ul className="list-disc pl-5">
                  <li><strong>NSW Property Academy:</strong> Known for face-to-face workshops and strong NSW-specific content.</li>
                  <li><strong>REINSW:</strong> The peak industry body, offering credible training with strong networking opportunities.</li>
                  <li><strong>Kaplan Professional:</strong> A popular online choice with flexible learning for busy professionals.</li>
              </ul>
               <Link href="https://cpp41419.com.au/compare/nsw" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline block mt-2">Compare more NSW Providers</Link>
            </SpecialBlock>
          </div>

          <div id="vic" className="pt-4">
            <h4 className="text-xl font-bold border-b pb-2 mb-4">Victoria (VIC)</h4>
            <SpecialBlock type="tip" title="VIC Pathway Overview">
              <p>Victoria's real estate industry is regulated by <strong>Consumer Affairs Victoria (CAV)</strong>, with the primary legislative framework being the <strong>Estate Agents Act 1980</strong>. Victoria requires the full qualification upfront to start working.</p>
            </SpecialBlock>
             <DataTable 
              headers={["Stage", "Requirement", "Allows You To"]}
              rows={[
                ["Step 1: Agent's Representative", 
                  "Complete full CPP41419 qualification.", 
                  "Work in sales or property management under a licensed estate agent."
                ],
                ["Step 2: Licensed Estate Agent", 
                  <>Complete Diploma of Property (CPP51122).<br/>12 months full-time experience in the preceding 3 years.</>, 
                  "Operate, manage, or own a real estate agency."
                ],
              ]}
            />
             <SpecialBlock type="info" title="VIC Job Market Insights">
              <ul className="list-disc pl-5">
                <li><strong>Key Hubs:</strong> Melbourne's inner-city, Bayside suburbs, Geelong, Ballarat.</li>
                <li><strong>Average Salary (Entry):</strong> $50,000 - $65,000 + commission.</li>
                <li><strong>Unique Trait:</strong> Strong emphasis on private treaty sales alongside auctions. Deep understanding of heritage overlays and complex Owners Corporation rules is vital in Melbourne.</li>
              </ul>
            </SpecialBlock>
            <SpecialBlock type="check" title="Top Rated Providers in VIC">
              <ul className="list-disc pl-5">
                <li><strong>REIV (Real Estate Institute of Victoria):</strong> The state's industry body, offering highly respected and compliant courses.</li>
                <li><strong>Entry Education:</strong> Well-regarded for their strong student support and online platform.</li>
                <li><strong>Victoria University Polytechnic:</strong> A TAFE option providing structured, government-backed training.</li>
              </ul>
              <Link href="https://cpp41419.com.au/compare/vic" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline block mt-2">Compare more VIC Providers</Link>
            </SpecialBlock>
          </div>

          <div id="qld" className="pt-4">
            <h4 className="text-xl font-bold border-b pb-2 mb-4">Queensland (QLD)</h4>
            <SpecialBlock type="tip" title="QLD Pathway Overview">
               <p>In Queensland, the real estate profession is regulated by the <strong>Office of Fair Trading (OFT) Queensland</strong>. The key legislation is the <strong>Property Occupations Act 2014</strong>, which allows entry into the industry with a shorter initial course.</p>
            </SpecialBlock>
             <DataTable 
              headers={["Stage", "Requirement", "Allows You To"]}
              rows={[
                ["Step 1: Registration Certificate", 
                  "Complete 7 core units from CPP41419.", 
                  "Work as a real estate salesperson or property manager under supervision."
                ],
                ["Step 2: Full Real Estate Agent Licence", 
                  "Complete the remaining 11 units of the CPP41419.", 
                  "Operate independently, manage a trust account, or open your own agency."
                ],
              ]}
            />
            <SpecialBlock type="info" title="QLD Job Market Insights">
              <ul className="list-disc pl-5">
                <li><strong>Key Hubs:</strong> Brisbane, Gold Coast, Sunshine Coast, Cairns.</li>
                <li><strong>Average Salary (Entry):</strong> $50,000 - $65,000 + commission.</li>
                <li><strong>Unique Trait:</strong> Tourism-driven markets on the coasts require expertise in holiday letting and body corporate management. Understanding flood zones is critical in Brisbane.</li>
              </ul>
            </SpecialBlock>
            <SpecialBlock type="check" title="Top Rated Providers in QLD">
              <ul className="list-disc pl-5">
                <li><strong>REIQ (Real Estate Institute of Queensland):</strong> Industry-standard training with a focus on QLD legislation and practice.</li>
                <li><strong>Validum Institute:</strong> A popular choice for their flexible online courses tailored to the QLD market.</li>
                <li><strong>TAFE Queensland:</strong> Offers government-subsidised places and structured classroom environments.</li>
              </ul>
              <Link href="https://cpp41419.com.au/compare/qld" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline block mt-2">Compare more QLD Providers</Link>
            </SpecialBlock>
          </div>
          {/* Other states can be added here with similar structure */}
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl" id="cost-breakdown">
        <CardHeader><CardTitle className="text-2xl font-semibold flex items-center"><DollarSign className="mr-2 h-6 w-6 text-primary" /> Cost Analysis Across Australia</CardTitle></CardHeader>
        <CardContent className="space-y-4 prose max-w-none dark:prose-invert">
          <SpecialBlock type="tip" title="Budget Planning">
            Course costs vary significantly by provider and location. Government subsidies can reduce costs by 50-75% for eligible students.
          </SpecialBlock>
          <SpecialBlock type="abstract" title="Cost Breakdown Dashboard">
            <pre className="text-sm p-2 bg-muted/50 rounded"><code>
Provider Types by Cost Range:
┌─ Online RTOs      → $1,495-$1,895 (Budget Option)
├─ TAFE Institutes → $2,200-$2,670 (Government Backed)
├─ Industry Bodies → $2,050-$2,950 (Industry Connected)
└─ Universities    → $2,750-$2,890 (Academic Rigor)
            </code></pre>
          </SpecialBlock>
          <h3>Course Fee Ranges by Provider Type</h3>
          <DataTable 
            headers={["Provider Type", "Cost Range", "Best For"]}
            rows={[
              ["Online RTOs", "$1,495-$1,895", "Budget-conscious, flexible schedule"],
              ["TAFE Institutes", "$2,200-$2,670", "Government backing, face-to-face learning"],
              ["Industry Bodies", "$2,050-$2,950", "Industry connections, job placement"],
              ["Universities", "$2,750-$2,890", "Academic rigor, research access"],
            ]}
          />
          <h3>Additional Licensing Costs</h3>
          <SpecialBlock type="warning" title="Hidden Costs Alert">
            <MermaidDiagram 
              id="hidden-costs-alert-diagram"
              code={`
graph TD
    A[Course Fees] --> B[Criminal Check $45-$56]
    B --> C[License Application $145-$675]
    C --> D[Professional Insurance $300-$600/year]
    D --> E[CPD Requirements $200-$600/year]
    
    style A fill:#e1f5fe
    style B fill:#fff3e0
    style C fill:#fff3e0
    style D fill:#ffebee
    style E fill:#ffebee
            `} />
          </SpecialBlock>
          <DataTable 
            headers={["Expense", "Range", "Notes"]}
            rows={[
              ["Criminal History Check", "$45-$56", "Required in all states"],
              ["License Application", "$145-$675", "Varies significantly by state"],
              ["Professional Indemnity Insurance", "$300-$600/year", "Mandatory in most states"],
              ["CPD Requirements", "$200-$600/year", "Ongoing professional development"],
            ]}
          />
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl" id="provider-selection">
        <CardHeader><CardTitle className="text-2xl font-semibold flex items-center"><Users className="mr-2 h-6 w-6 text-primary" /> Provider Comparison Framework</CardTitle></CardHeader>
        <CardContent className="space-y-4 prose max-w-none dark:prose-invert">
          <SpecialBlock type="abstract" title="Decision Matrix">
            <pre className="text-sm p-2 bg-muted/50 rounded"><code>
Study Mode → Support Services → State Specialization
     ↓              ↓                    ↓
Flexibility    Job Placement      Local Knowledge
Interaction    Trainer Access     Market Insights
Schedule       Study Materials    Licensing Support
            </code></pre>
          </SpecialBlock>
          <p>When choosing your CPP41419 provider, consider these factors:</p>
          <h4>Study Mode Preferences</h4>
          <SpecialBlock type="note" title="Learning Styles">
            <ul className="list-disc pl-5">
              <li><strong>100% Online</strong>: Maximum flexibility, self-paced learning</li>
              <li><strong>Blended</strong>: Combines online theory with practical workshops</li>
              <li><strong>Classroom</strong>: Face-to-face interaction, structured schedule</li>
            </ul>
          </SpecialBlock>
          <h4>Support Services</h4>
          <SpecialBlock type="check" title="Quality Indicators">
            <ul className="list-disc pl-5">
              <li><strong>Trainer Access</strong>: Email, phone, or video consultation availability</li>
              <li><strong>Job Placement</strong>: Industry connections and employment assistance</li>
              <li><strong>Study Materials</strong>: Digital textbooks, video content, practice assessments</li>
            </ul>
          </SpecialBlock>
          <h4>State Specialization</h4>
          <SpecialBlock type="important" title="Local Advantage">
            <ul className="list-disc pl-5">
              <li><strong>Local Knowledge</strong>: Understanding of state-specific legislation</li>
              <li><strong>Market Insights</strong>: Regional property trends and career opportunities</li>
              <li><strong>Licensing Support</strong>: Guidance through state registration processes</li>
            </ul>
          </SpecialBlock>
           <SpecialBlock type="tip" title="Get Anonymous Answers From Providers">
              <p>Want to ask about course costs, support, or start dates without sharing your details? Our Provider Quiz matches you with top RTOs and lets you ask questions anonymously.</p>
              <Button asChild className="mt-3">
                  <Link href="/quiz">Find a Provider & Ask Anonymously</Link>
              </Button>
          </SpecialBlock>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl" id="career-outcomes">
        <CardHeader><CardTitle className="text-2xl font-semibold flex items-center"><Briefcase className="mr-2 h-6 w-6 text-primary" /> Career Pathways and Opportunities</CardTitle></CardHeader>
        <CardContent className="space-y-4 prose max-w-none dark:prose-invert">
           <h3>Salary Progression Visualization</h3>
            <SpecialBlock type="abstract" title="Expected Earnings Over Time (OTE)">
              <MermaidDiagram 
                id="salary-progression-chart"
                code={`
graph TD
    A[Entry-Level<br/>0-2 Yrs<br/><b>$55k - $85k</b>] --> B[Mid-Career<br/>3-5 Yrs<br/><b>$90k - $150k</b>]
    B --> C[Senior Agent<br/>5-10 Yrs<br/><b>$150k - $250k+</b>]
    C --> D[Principal/Owner<br/>10+ Yrs<br/><b>$200k - $500k+</b>]

    subgraph "Focus: Building Client Base"
      A
    end
    subgraph "Focus: Market Specialization"
      B
    end
    subgraph "Focus: Top Performer / Team Leader"
      C
    end
    subgraph "Focus: Business Operations"
      D
    end

    style A fill:#e8f5e9,stroke:#333,stroke-width:2px
    style B fill:#e1f5fe,stroke:#333,stroke-width:2px
    style C fill:#fff3e0,stroke:#333,stroke-width:2px
    style D fill:#f3e5f5,stroke:#333,stroke-width:2px
                `}
              />
            </SpecialBlock>

           <h3>"A Day in the Life" Case Studies</h3>
           <SpecialBlock type="example" title="Case Study 1: Residential Sales Agent (Mid-Career)">
              <ul className="list-disc pl-5">
                <li><strong>8:00 AM:</strong> Market analysis and responding to overnight enquiries.</li>
                <li><strong>9:00 AM:</strong> Team sales meeting to discuss new listings and buyer feedback.</li>
                <li><strong>10:30 AM:</strong> Prospecting calls to build pipeline and follow up on leads.</li>
                <li><strong>12:00 PM:</strong> Conduct a property appraisal for a potential new listing.</li>
                <li><strong>2:00 PM:</strong> Host open for inspections for two properties.</li>
                <li><strong>4:00 PM:</strong> Negotiate offers between a buyer and vendor.</li>
                <li><strong>5:30 PM:</strong> Prepare marketing materials for a new campaign.</li>
              </ul>
           </SpecialBlock>
            <SpecialBlock type="example" title="Case Study 2: Property Manager">
              <ul className="list-disc pl-5">
                <li><strong>9:00 AM:</strong> Process rental applications and conduct reference checks.</li>
                <li><strong>10:00 AM:</strong> Schedule and coordinate maintenance requests with tradespeople.</li>
                <li><strong>11:30 AM:</strong> Conduct a routine inspection, documenting property condition.</li>
                <li><strong>1:00 PM:</strong> Mediate a tenancy issue and review lease agreements.</li>
                <li><strong>3:00 PM:</strong> Prepare condition reports for new tenancies.</li>
                <li><strong>4:30 PM:</strong> Liaise with landlords regarding portfolio performance and upcoming lease renewals.</li>
              </ul>
           </SpecialBlock>
           
           <h3>Industry Partnership Showcase</h3>
           <SpecialBlock type="success" title="Example Career Partnerships">
            Many leading RTOs have partnerships that provide graduates with direct pathways into the industry. Look for providers connected with:
              <ul className="list-disc pl-5 mt-2">
                <li><strong>Major Franchise Groups:</strong> Ray White, LJ Hooker, McGrath, etc. offering cadetships.</li>
                <li><strong>Boutique Agencies:</strong> Opportunities for specialized roles in high-end or niche markets.</li>
                <li><strong>PropTech Companies:</strong> Roles in sales or support for companies like Domain, REA Group, and various CRM providers.</li>
                <li><strong>Developer Sales Teams:</strong> Opportunities to work on off-the-plan project sales.</li>
              </ul>
           </SpecialBlock>

        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl" id="industry-outlook">
        <CardHeader><CardTitle className="text-2xl font-semibold flex items-center"><TrendingUp className="mr-2 h-6 w-6 text-primary" /> Industry Outlook and Future Trends</CardTitle></CardHeader>
        <CardContent className="space-y-4 prose max-w-none dark:prose-invert">
            <SpecialBlock type="abstract" title="Market Intelligence">
              <pre className="text-sm p-2 bg-muted/50 rounded"><code>
Growth Indicators:
┌─ National Employment Growth → 6.8% through 2026
├─ Technology Integration    → Increasing digital skills demand
├─ Sustainability Focus     → Green building expertise
└─ Remote Work Capability   → Virtual transaction skills
              </code></pre>
            </SpecialBlock>
            <h4>Market Growth Projections</h4>
            <SpecialBlock type="success" title="Positive Outlook">
              <ul className="list-disc pl-5">
                <li><strong>National Employment Growth</strong>: 6.8% projected increase through 2026</li>
                <li><strong>Technology Integration</strong>: Increasing demand for digital skills</li>
                <li><strong>Sustainability Focus</strong>: Growing emphasis on energy efficiency and environmental compliance</li>
              </ul>
            </SpecialBlock>
            <h4>Emerging Specializations</h4>
            <SpecialBlock type="example" title="Future Opportunities">
              <ul className="list-disc pl-5">
                <li><strong>PropTech Integration</strong>: Technology-driven property solutions</li>
                <li><strong>Sustainable Development</strong>: Green building and energy efficiency expertise</li>
                <li><strong>Remote Work Facilitation</strong>: Virtual inspections and digital transactions</li>
              </ul>
            </SpecialBlock>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl" id="getting-started">
        <CardHeader><CardTitle className="text-2xl font-semibold flex items-center"><Award className="mr-2 h-6 w-6 text-primary" /> Getting Started: Your Next Steps</CardTitle></CardHeader>
        <CardContent className="space-y-4 prose max-w-none dark:prose-invert">
           <SpecialBlock type="abstract" title="Action Plan">
            <MermaidDiagram 
              id="action-plan-diagram"
              code={`
graph LR
    A[1. Choose State] --> B[2. Select Provider]
    B --> C[3. Check Subsidies]
    C --> D[4. Plan Timeline]
    D --> E[5. Prepare for Success]
    
    style A fill:#e8f5e8
    style B fill:#e1f5fe
    style C fill:#fff3e0
    style D fill:#f3e5f5
    style E fill:#ffebee
            `} />
          </SpecialBlock>
          <h4>1. Choose Your State</h4>
          <SpecialBlock type="note" title="Location Planning">
            Review the specific licensing requirements for your intended practice location.
          </SpecialBlock>
          <h4>2. Select Your Provider</h4>
          <SpecialBlock type="tip" title="Provider Selection">
            Compare costs, study modes, and support services based on your preferences.
          </SpecialBlock>
          <h4>3. Check Eligibility for Subsidies</h4>
          <SpecialBlock type="success" title="Funding Options">
            Investigate government funding options in your state to reduce course costs.
          </SpecialBlock>
          <h4>4. Plan Your Timeline</h4>
          <SpecialBlock type="example" title="Schedule Planning">
            Consider work commitments and target licensing dates when selecting course duration.
          </SpecialBlock>
          <h4>5. Prepare for Success</h4>
          <SpecialBlock type="check" title="Technical Requirements">
            Ensure reliable internet access for online study and basic computer skills.
          </SpecialBlock>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-xl" id="faq-guide">
        <CardHeader><CardTitle className="text-2xl font-semibold">Frequently Asked Questions (Guide Specific)</CardTitle></CardHeader>
        <CardContent className="space-y-4 prose max-w-none dark:prose-invert">
          <SpecialBlock type="question" title="Can I practice in multiple states with one qualification?">
            CPP41419 is nationally recognized, but each state requires separate licensing applications with state-specific requirements and fees.
          </SpecialBlock>
          <SpecialBlock type="question" title="How long does it take to start earning as a real estate agent?">
            Most agents secure their first sale within 2-4 months of licensing, though this varies significantly by location and market conditions.
          </SpecialBlock>
          <SpecialBlock type="question" title="Is previous sales experience necessary?">
            No formal prerequisites exist for CPP41419 enrollment. However, sales, customer service, or communication experience can be advantageous.
          </SpecialBlock>
          <SpecialBlock type="question" title="What happens if I fail an assessment?">
            Most providers allow 2-3 retake attempts per unit. Additional fees typically apply for reassessment.
          </SpecialBlock>
          <SpecialBlock type="question" title="Can I upgrade from CPP40307 to CPP41419?">
            CPP40307 expired in 2019. Current holders must complete CPP41419 for new licensing applications.
          </SpecialBlock>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg rounded-xl" id="related-resources">
        <CardHeader><CardTitle className="text-2xl font-semibold">Related Resources & Citations</CardTitle></CardHeader>
        <CardContent className="space-y-4 prose max-w-none dark:prose-invert">
            <SpecialBlock type="abstract" title="Related Resources">
                <ul className="list-disc pl-5">
                    <li><Link href="https://cpp41419.com.au/nsw" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NSW CPP41419 Guide</Link> - Detailed NSW licensing pathway</li>
                    <li><Link href="https://cpp41419.com.au/vic" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">VIC CPP41419 Guide</Link> - Victoria-specific requirements</li>
                    <li><Link href="https://cpp41419.com.au/qld" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">QLD CPP41419 Guide</Link> - Queensland registration process</li>
                    <li><Link href="https://cpp41419.com.au/compare" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Provider Comparison Tool</Link> - Interactive provider selector</li>
                    <li><Link href="https://cpp41419.com.au/calculator" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Cost Calculator</Link> - Estimate your total education investment</li>
                    <li><Link href="https://www.cpp41419.com.au/logup" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Partner Login/Signup</Link> - Access provider resources and dashboards</li>
                </ul>
            </SpecialBlock>
            <h3>Citations & Sources</h3>
            <p>All information in this guide has been sourced from cpp41419.com.au and verified against current regulatory requirements:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>Digital Skills in Modern Real Estate:</strong> <Link href="https://cpp41419.com.au/digital-skills" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/digital-skills</Link></li>
              <li><strong>Consumer Protection in Real Estate Education:</strong> <Link href="https://cpp41419.com.au/consumer-protection" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/consumer-protection</Link></li>
              <li><strong>Regulatory Compliance Overview:</strong> <Link href="https://cpp41419.com.au/compliance" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/compliance</Link></li>
              <li><strong>Professional Development Requirements:</strong> <Link href="https://cpp41419.com.au/cpd-requirements" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/cpd-requirements</Link></li>
              <li><strong>National Recognition Framework:</strong> <Link href="https://cpp41419.com.au/national-recognition" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/national-recognition</Link></li>
              <li><strong>What is CPP41419?:</strong> <Link href="https://cpp41419.com.au/what-is-cpp41419" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/what-is-cpp41419</Link></li>
              <li><strong>CPP41419 Units and Structure:</strong> <Link href="https://cpp41419.com.au/course-structure" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/course-structure</Link></li>
              <li><strong>NSW Licensing Pathway:</strong> <Link href="https://cpp41419.com.au/nsw" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/nsw</Link></li>
              <li><strong>Victoria Agent's Representative Guide:</strong> <Link href="https://cpp41419.com.au/vic" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/vic</Link></li>
              <li><strong>Queensland Registration Process:</strong> <Link href="https://cpp41419.com.au/qld" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/qld</Link></li>
              <li><strong>Western Australia Triennial System:</strong> <Link href="https://cpp41419.com.au/wa" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/wa</Link></li>
              <li><strong>South Australia Trust Account Regulations:</strong> <Link href="https://cpp41419.com.au/sa" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/sa</Link></li>
              <li><strong>Tasmania Property Agent Registration:</strong> <Link href="https://cpp41419.com.au/tas" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/tas</Link></li>
              <li><strong>ACT Leasehold System Guide:</strong> <Link href="https://cpp41419.com.au/act" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/act</Link></li>
              <li><strong>Northern Territory Remote Area Practice:</strong> <Link href="https://cpp41419.com.au/nt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/nt</Link></li>
            </ol>
            <h4 className="mt-4">Additional Resources:</h4>
            <ul className="list-disc pl-5 space-y-1">
                <li><strong>Provider Database:</strong> <Link href="https://cpp41419.com.au/providers" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/providers</Link></li>
                <li><strong>Cost Analysis Tool:</strong> <Link href="https://cpp41419.com.au/costs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/costs</Link></li>
                <li><strong>Career Pathways Guide:</strong> <Link href="https://cpp41419.com.au/careers" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/careers</Link></li>
                <li><strong>FAQ Database:</strong> <Link href="https://cpp41419.com.au/faq" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/faq</Link></li>
                <li><strong>Industry Updates:</strong> <Link href="https://cpp41419.com.au/news" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au/news</Link></li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground"><em>This guide represents the most current information available as of May 2025. Licensing requirements and provider details may change. Always verify specific requirements with your state licensing authority before enrollment. For real-time updates and the latest provider information, visit <Link href="https://cpp41419.com.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cpp41419.com.au</Link>.</em></p>
        </CardContent>
      </Card>

    </div>
  );
}
