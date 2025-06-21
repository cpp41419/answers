import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, CheckCircle, ShieldCheck, BadgeCheck, Shuffle, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Find Quality CPP41419 Training That Actually Delivers Results | RTO Compass',
  description: "Australia's only independent platform protecting students from poor training decisions. Get matched with verified providers through our anonymous evaluation system—no marketing pressure, just honest assessment.",
};

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <Card className="text-center shadow-lg hover:shadow-xl transition-shadow rounded-xl">
    <CardContent className="p-6">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{children}</p>
    </CardContent>
  </Card>
);

const StepCard = ({ number, title, children }: { number: string, title: string, children: React.ReactNode }) => (
  <Card className="text-center bg-muted/50 border-0 shadow-md">
    <CardContent className="p-6">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
        {number}
      </div>
      <h3 className="text-md font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-xs">{children}</p>
    </CardContent>
  </Card>
);

const TestimonialCard = ({ name, location, children }: { name: string, location: string, children: React.ReactNode }) => (
  <Card className="shadow-lg rounded-xl">
    <CardContent className="p-6">
      <div className="flex items-center mb-4">
        <Avatar className="h-10 w-10 mr-4">
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
      <p className="text-muted-foreground text-sm italic">"{children}"</p>
    </CardContent>
  </Card>
);

const ToolCard = ({ title, children, imageHint }: { title: string, children: React.ReactNode, imageHint: string }) => (
  <Card className="flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
    <div className="relative w-full h-40 bg-muted">
       <Image
        src="https://placehold.co/600x400.png"
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        data-ai-hint={imageHint}
      />
    </div>
    <CardHeader>
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-sm text-muted-foreground line-clamp-3">{children}</p>
    </CardContent>
    <CardContent>
       <Button asChild variant="link" className="p-0 h-auto">
          <Link href="/guide">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
    </CardContent>
  </Card>
);

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white" style={{background: 'hsl(var(--deep-navy))'}}>
        <div className="container mx-auto px-4 md:px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Find Quality CPP41419 Training That Actually Delivers Results
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-blue-200 mb-8">
            Australia's only independent platform protecting students from poor training decisions. Get matched with verified providers through our anonymous evaluation system—no marketing pressure, just honest assessment.
          </p>
          <div className="max-w-lg mx-auto">
             <form className="flex gap-2 bg-white p-2 rounded-full shadow-lg">
                <Input
                    type="text"
                    placeholder="Search for providers or courses..."
                    className="flex-grow bg-transparent border-none focus-visible:ring-0 text-foreground"
                />
                <Button type="submit" className="rounded-full">Find Providers</Button>
            </form>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 -mb-10 relative z-10">
            <Card className="shadow-2xl">
                <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>100% Independent Assessment</span>
                    </div>
                     <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Anonymous Evaluation System</span>
                    </div>
                     <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Student Outcome Focused</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-slate-50 dark:bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Smart Students Choose RTO Compass</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<ShieldCheck size={28} />} title="Protection First">
              Our independent system protects you from misleading claims. We verify providers so you can enroll with confidence.
            </FeatureCard>
            <FeatureCard icon={<BadgeCheck size={28} />} title="Real Quality Scores">
              Beyond marketing fluff, our data-driven scores reflect actual student outcomes, completion rates, and satisfaction.
            </FeatureCard>
            <FeatureCard icon={<Shuffle size={28} />} title="Perfect Matches">
              Our assessment matches your learning style, budget, and career goals to the RTO best suited for your success.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* 3 Simple Steps Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Get Your Perfect Provider Match in 3 Simple Steps</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                 <StepCard number="1" title="Take Our Quick Assessment">
                    Tell us what you're looking for, your learning preferences, and career ambitions.
                 </StepCard>
                 <StepCard number="2" title="We Evaluate Providers for You">
                    Our algorithm analyzes 87+ RTOs against your unique needs and our quality data.
                 </StepCard>
                 <StepCard number="3" title="Choose With Confidence">
                    Receive your personalized, data-backed RTO recommendations. No pressure, just results.
                 </StepCard>
            </div>
             <div className="text-center">
                 <Button size="lg" asChild>
                    <Link href="/quiz">
                        Start Your Assessment Now <ArrowRight className="ml-2" />
                    </Link>
                 </Button>
             </div>
        </div>
      </section>
      
      {/* Testimonials & Metrics */}
      <section className="py-24 bg-slate-50 dark:bg-card">
        <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Real Students, Real Results</h2>
            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                <TestimonialCard name="Sarah M." location="NSW">
                    RTO Compass saved me from choosing the wrong provider. The anonymous system gave me honest insights I couldn't find anywhere else.
                </TestimonialCard>
                 <TestimonialCard name="Michael T." location="QLD">
                    I was overwhelmed with options. Their matching tool gave me three perfect choices, and I enrolled the next day. A++ service.
                </TestimonialCard>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
                <div>
                    <p className="text-4xl font-bold text-primary">2,847+</p>
                    <p className="text-muted-foreground">Students Helped</p>
                </div>
                <div>
                    <p className="text-4xl font-bold text-primary">87</p>
                    <p className="text-muted-foreground">Providers Assessed</p>
                </div>
                 <div>
                    <p className="text-4xl font-bold text-primary">40%</p>
                    <p className="text-muted-foreground">Better Graduation Outcomes</p>
                </div>
            </div>
        </div>
      </section>
      
      {/* Stop Gambling Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Stop Gambling with Your Future</h2>
            <div className="prose dark:prose-invert mx-auto text-muted-foreground">
                <p>Choosing the wrong CPP41419 provider costs more than money. Poor training leads to licensing delays, knowledge gaps, and career setbacks. We cut through the marketing copy. We test providers independently, collect genuine responses, and match you with RTOs that actually deliver results. We guarantee it. No regrets.</p>
            </div>
             <Button size="lg" asChild className="mt-8">
                <Link href="/quiz">
                    Find My Ideal Provider <ArrowRight className="ml-2" />
                </Link>
            </Button>
        </div>
      </section>

      {/* Powerful Tools Section */}
       <section className="py-24 bg-slate-50 dark:bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Powerful Tools, Simple Decisions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
             <ToolCard title="Anonymous Provider Testing" imageHint="user testing form">
               We engage with providers anonymously to test their response times, knowledge, and support quality before you do.
             </ToolCard>
             <ToolCard title="Quality Transparency Scores" imageHint="data dashboard chart">
               Our proprietary scores consolidate student feedback, completion data, and our own testing to rank providers on what matters.
             </ToolCard>
             <ToolCard title="Smart Provider Matching" imageHint="connections algorithm flowchart">
               Our quiz goes beyond the basics, using your career goals and learning style to find the RTO that's truly right for you.
             </ToolCard>
             <ToolCard title="Warning System" imageHint="alert security system">
                We maintain an active list of providers with poor student outcomes or unethical marketing, helping you avoid costly mistakes.
             </ToolCard>
          </div>
        </div>
      </section>
      
       {/* Final CTA Section */}
      <section className="bg-blue-900 text-white" style={{background: 'hsl(var(--deep-navy))'}}>
        <div className="container mx-auto px-4 md:px-6 py-20 text-center">
          <Zap className="h-12 w-12 mx-auto text-orange-400 mb-4" />
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Your Real Estate Career Starts with the Right Training
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-blue-200 mb-8">
            Don't leave your success to chance. Let us match you with a proven provider who can help you start building your future.
          </p>
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
              <p className="text-lg text-white">
                  Students using RTO Compass recommendations complete training <span className="font-bold text-orange-300">28% faster</span> and report <span className="font-bold text-orange-300">40% higher</span> satisfaction rates.
              </p>
          </div>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full text-base" asChild>
            <Link href="/quiz">
                Find My Perfect Course Now <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
