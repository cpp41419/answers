
'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { School, MapPin, GraduationCap, Star, ChevronRight, ArrowRight, CheckCircle, Clock, Users, BookOpen, Sparkles, Send } from 'lucide-react';
import { matchRTO, type RTO } from '@/lib/decision-engine'; // Adjusted path
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Breadcrumbs } from '@/components/core/Breadcrumbs';
import { processLeadInquiry, type ProcessLeadInquiryInput, type ProcessLeadInquiryOutput } from '@/ai/flows/process-lead-inquiry';
import { useToast } from '@/hooks/use-toast';


// Note: Next.js Metadata should be defined in a separate metadata export if needed for SSR,
// or handled client-side if that's sufficient. For this example, we'll focus on the component logic.
// export const metadata: Metadata = {
//   title: 'Find Your CPP41419 Provider - Training Matcher | CPP41419 Q&A',
//   description: 'Find the perfect CPP41419 training provider that matches your learning style and location.',
// };

interface ThoughtBubble {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
}

interface LeadSubmissionResult {
  message: string;
  nextSteps?: string;
}

export default function QuizPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ delivery: '', state: '' });
  const [results, setResults] = useState<RTO[] | null>(null);
  const [thoughtBubbles, setThoughtBubbles] = useState<ThoughtBubble[]>([]);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmissionResult, setLeadSubmissionResult] = useState<LeadSubmissionResult | null>(null);

  const thoughts = [
    "Great choice! 🎯",
    "Perfect fit! ✨",
    "Excellent! 🌟",
    "Smart move! 💡",
    "Let's go! 🚀",
    "Success ahead! 🎉"
  ];

  const colors = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#7C3AED', '#F59E0B', '#10B981'];

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (Math.random() > 0.85) { // Adjust frequency
      const bubble: ThoughtBubble = {
        id: uuidv4(),
        text: thoughts[Math.floor(Math.random() * thoughts.length)],
        x: x,
        y: y,
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      setThoughtBubbles(prev => [...prev, bubble]);

      setTimeout(() => {
        setThoughtBubbles(prev => prev.filter(b => b.id !== bubble.id));
      }, 2000);
    }
  };

  const handleSubmitQuiz = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.delivery || !formData.state) {
        toast({
            title: "Missing Information",
            description: "Please select both delivery method and state.",
            variant: "destructive",
        });
        return;
    }
    const rankedResults = matchRTO(formData);
    setResults(rankedResults);
    setLeadSubmissionResult(null); // Reset lead submission result
  };

  const handleLeadInquiry = async (rto: RTO) => {
    setIsSubmittingLead(true);
    setLeadSubmissionResult(null);
    try {
      const inquiryMessage = `Hi,\nI would like to know more about the course "${rto.rto}" that was recommended to me by the quiz. Could you please answer the following questions:\n\n1. What is the total cost of the course?\n2. Are there any government funding or subsidy options available?\n3. When do the next intakes start, and how long does the course take?\n4. Is the course fully online, in-person, or blended?\n5. What kind of support is available for students?\n\nThank you!`;
      
      const input: ProcessLeadInquiryInput = {
        deliveryPreference: formData.delivery,
        state: formData.state,
        selectedRtoName: rto.rto,
        userInquiry: inquiryMessage,
      };
      const output: ProcessLeadInquiryOutput = await processLeadInquiry(input);
      setLeadSubmissionResult({ message: output.confirmationMessage, nextSteps: output.nextSteps });
      toast({
        title: "Inquiry Sent!",
        description: output.confirmationMessage,
        variant: "default", // Or "success" if you have one
      });
    } catch (error) {
      console.error("Error processing lead inquiry:", error);
      toast({
        title: "Error",
        description: "Could not process your inquiry at this time. Please try again later.",
        variant: "destructive",
      });
      setLeadSubmissionResult({ message: "Failed to submit inquiry. Please try again." });
    } finally {
      setIsSubmittingLead(false);
    }
  };
  
  // Add a useEffect to set the page title dynamically if needed, since Metadata export is for SSR
  useEffect(() => {
    document.title = 'Find Your CPP41419 Provider - Training Matcher | CPP41419 Q&A';
  }, []);


  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Provider Quiz' }]} />

      <style jsx global>{`
        .thought-bubble-firework {
          animation: firework-animation 2s ease-out forwards;
          font-size: 1rem;
          font-weight: bold;
          opacity: 0;
          white-space: nowrap;
        }
        @keyframes firework-animation {
          0% { transform: scale(0.5) translateY(0); opacity: 1; }
          50% { transform: scale(1.2) translateY(-30px); opacity: 0.8; }
          100% { transform: scale(0.8) translateY(-60px); opacity: 0; }
        }
      `}</style>
      
      <header className="bg-primary bg-gradient-to-b from-primary to-[hsl(var(--deep-navy))] text-primary-foreground py-16 md:py-20 px-4 rounded-xl shadow-xl">
        <div className="max-w-3xl mx-auto text-center">
          <School className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 text-primary-foreground/90" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Find Your Perfect CPP41419 Provider
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
            A fast and simple provider matcher that helps you find the ideal CPP41419 training solution.
          </p>
        </div>
      </header>

      <Card 
        className="max-w-3xl mx-auto shadow-2xl relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {thoughtBubbles.map(bubble => (
          <div
            key={bubble.id}
            className="thought-bubble-firework absolute pointer-events-none"
            style={{
              left: bubble.x,
              top: bubble.y,
              color: bubble.color,
              zIndex: 10, // Ensure bubbles are above content
            }}
          >
            {bubble.text}
          </div>
        ))}
        <CardContent className="p-6 md:p-8">
          {!results ? (
            <>
              <div className="flex items-center justify-between mb-8 md:mb-12">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-medium transition-colors ${
                    step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    1
                  </div>
                  <div className={`h-1 flex-grow ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} style={{minWidth: '40px', maxWidth: '80px'}} />
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-medium transition-colors ${
                    step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    2
                  </div>
                </div>
                <Button variant="link" asChild>
                  <Link href="/"> {/* Placeholder: Link to /schools or a comparison page */}
                    Compare RTOs
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>

              {step === 1 ? (
                <div className="space-y-6 md:space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">How would you like to study?</h2>
                    <p className="text-muted-foreground md:text-lg">Choose your preferred learning method.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-auto p-6 md:p-8 text-left flex flex-col items-start group hover:border-primary"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, delivery: 'online' }));
                        setStep(2);
                      }}
                    >
                      <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-primary mb-3 group-hover:scale-105 transition-transform" />
                      <h3 className="text-lg md:text-xl font-semibold mb-1">Online Learning</h3>
                      <p className="text-muted-foreground text-sm">Study at your own pace with 24/7 access to course materials.</p>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-auto p-6 md:p-8 text-left flex flex-col items-start group hover:border-primary"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, delivery: 'in-person' }));
                        setStep(2);
                      }}
                    >
                      <Users className="w-10 h-10 md:w-12 md:h-12 text-primary mb-3 group-hover:scale-105 transition-transform" />
                      <h3 className="text-lg md:text-xl font-semibold mb-1">In-Person Classes</h3>
                      <p className="text-muted-foreground text-sm">Learn face-to-face with expert trainers and fellow students.</p>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 md:space-y-8">
                  <Button
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="flex items-center text-primary hover:text-primary"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                    Back to Delivery Method
                  </Button>
                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Where are you located?</h2>
                    <p className="text-muted-foreground md:text-lg">Select your state to find relevant providers.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                    {['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'].map((state) => (
                      <Button
                        key={state}
                        variant="outline"
                        size="lg"
                        className="h-auto p-4 md:p-6 flex flex-col items-center group hover:border-primary"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, state }));
                          handleSubmitQuiz();
                        }}
                      >
                        <MapPin className="w-7 h-7 md:w-8 md:h-8 text-primary mb-2 group-hover:scale-105 transition-transform" />
                        <span className="font-medium text-base md:text-lg">{state}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setResults(null);
                    setStep(1);
                    setFormData({ delivery: '', state: '' });
                    setLeadSubmissionResult(null);
                  }}
                  className="text-primary hover:text-primary"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Start New Search
                </Button>
                <Button variant="link" asChild>
                  <Link href="/"> {/* Placeholder */}
                    View All Providers
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
              
              {results.length > 0 ? (
                <>
                  <Card className="bg-gradient-to-br from-primary/5 via-background to-background border-primary/20 shadow-lg">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <div className="flex items-center mb-2 sm:mb-0">
                          <GraduationCap className="w-10 h-10 md:w-12 md:h-12 text-primary mr-3 md:mr-4" />
                          <div>
                            <CardTitle className="text-2xl md:text-3xl">Best Match for You</CardTitle>
                            <CardDescription className="md:text-lg">Based on your preferences for {formData.delivery} study in {formData.state}.</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center bg-card px-3 py-1.5 rounded-full shadow-sm border self-start sm:self-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1.5" fill="currentColor" />
                          <span className="font-semibold text-sm md:text-base">{results[0].rating}/10</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 md:space-y-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-1 text-foreground">{results[0].rto}</h3>
                        <p className="text-muted-foreground md:text-base">{results[0].description}</p>
                      </div>

                      {results[0].features.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                          {results[0].features.map((feature, index) => (
                            <div key={index} className="flex items-center p-3 bg-card rounded-lg shadow-sm border">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2.5 shrink-0" />
                              <span className="text-sm text-foreground/90">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {!leadSubmissionResult ? (
                        <Alert className="mt-6 bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300">
                          <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <AlertTitle className="font-semibold text-green-700 dark:text-green-300">Want to know more, anonymously?</AlertTitle>
                          <AlertDescription className="text-green-600 dark:text-green-400/90">
                            We handle your enquiry for you and send you back the answers—no spam, no pressure. Just press the button below and we'll find out more for you.
                          </AlertDescription>
                          <Button
                            onClick={() => handleLeadInquiry(results[0])}
                            disabled={isSubmittingLead}
                            className="mt-4 w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
                          >
                            {isSubmittingLead ? 'Submitting...' : 'Request More Info Anonymously'}
                            <Send className="ml-2 h-4 w-4" />
                          </Button>
                        </Alert>
                      ) : (
                        <Alert variant={leadSubmissionResult.message.startsWith("Failed") ? "destructive" : "default"} className="mt-6">
                           <Sparkles className="h-5 w-5" />
                          <AlertTitle>{leadSubmissionResult.message.startsWith("Failed") ? "Submission Error" : "Inquiry Processed"}</AlertTitle>
                          <AlertDescription>
                            {leadSubmissionResult.message}
                            {leadSubmissionResult.nextSteps && <p className="mt-2">{leadSubmissionResult.nextSteps}</p>}
                          </AlertDescription>
                        </Alert>
                      )}

                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-3 md:gap-4 pt-6 border-t">
                       <Button size="lg" asChild>
                          <a href={results[0].guide || "/CPP41419-UPDATED-2-25-COURSE-GUIDE.pdf"} target="_blank" rel="noopener noreferrer">
                            <GraduationCap className="mr-2 h-5 w-5" />
                            Visit Provider
                          </a>
                       </Button>
                       <Button size="lg" variant="outline" asChild>
                          <a href="/CPP41419-UPDATED-2-25-COURSE-GUIDE.pdf" target="_blank" rel="noopener noreferrer"> {/* General Guide */}
                            Download Course Guide
                          </a>
                       </Button>
                    </CardFooter>
                  </Card>

                  {results.length > 1 && (
                    <div className="mt-8 md:mt-12">
                      <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center text-foreground">Other Recommendations</h3>
                      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                        {results.slice(1, 3).map((result, index) => (
                          <Card key={index} className="hover:shadow-xl transition-shadow">
                            <CardHeader>
                              <div className="flex items-center justify-between mb-1">
                                  <CardTitle className="text-lg">{result.rto}</CardTitle>
                                <div className="flex items-center text-sm">
                                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                                  <span className="font-medium">{result.rating}/10</span>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground text-sm line-clamp-3">{result.description}</p>
                            </CardContent>
                            <CardFooter>
                              <Button variant="link" className="p-0 h-auto" asChild>
                                <a href={result.guide || '#'} target="_blank" rel="noopener noreferrer">
                                  Learn More
                                  <ChevronRight className="w-4 h-4 ml-1" />
                                </a>
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Alert variant="destructive">
                  <MapPin className="h-4 w-4" />
                  <AlertTitle>No Providers Found</AlertTitle>
                  <AlertDescription>
                    Unfortunately, no providers matched your exact criteria for {formData.delivery} study in {formData.state}. Try a new search or view all providers.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    