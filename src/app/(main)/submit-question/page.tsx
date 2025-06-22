'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/core/Breadcrumbs';
import { useToast } from '@/hooks/use-toast';
import { submitQuestion, type SubmitQuestionInput } from '@/ai/flows/submit-question';
import { categories } from '@/data/categories';
import { CheckCircle, Send, Lightbulb } from 'lucide-react';

const formSchema = z.object({
  question: z.string().min(15, {
    message: 'Your question must be at least 15 characters.',
  }),
  context: z.string().optional(),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  category: z.string({
    required_error: 'Please select a category.',
  }),
  keywords: z.string().optional(),
});

export default function SubmitQuestionPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      context: '',
      email: '',
      keywords: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const result = await submitQuestion(values as SubmitQuestionInput);
      toast({
        title: 'Question Submitted!',
        description: result.confirmationMessage,
        variant: 'default',
      });
      setSubmissionSuccess(true);
      form.reset();
    } catch (error) {
      console.error('Submission failed:', error);
      toast({
        title: 'Submission Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submissionSuccess) {
    return (
      <div className="container mx-auto max-w-2xl py-12 text-center">
        <Card className="shadow-lg">
          <CardContent className="p-10">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Thank You!</h1>
            <p className="text-muted-foreground mb-6">
              Your question has been successfully submitted for review. We'll notify you by email if it gets published.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setSubmissionSuccess(false)}>Submit Another Question</Button>
              <Button variant="outline" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-xl py-8 px-4 md:px-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Submit a Question' }]} />
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center">
            <Lightbulb className="h-8 w-8 mr-3 text-primary" />
            Submit Your Question
          </CardTitle>
          <CardDescription>
            Have a question about CPP41419? Share it with us. If approved, it will be answered and published on the site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Your Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'What are the CPD requirements for a Class 2 Agent in NSW?'"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a clear, specific question. This will be the title.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="context"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Additional Context (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide any background details or what you've already tried to find out."
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>
                      Help our experts by providing more details.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Your Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We'll notify you if your question is published. Your email will not be shared publicly.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Category</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a relevant category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                             <SelectItem key={category.slug} value={category.name}>{category.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Keywords (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., CPD, NSW, Class 2" {...field} />
                      </FormControl>
                      <FormDescription>
                        Comma-separated keywords.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Submitting...' : 'Submit Question for Review'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
