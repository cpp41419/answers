'use server';
/**
 * @fileOverview A flow for handling user question submissions.
 *
 * - submitQuestion - A function that handles the question submission process.
 * - SubmitQuestionInput - The input type for the submitQuestion function.
 * - SubmitQuestionOutput - The return type for the submitQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SubmitQuestionInputSchema = z.object({
  question: z.string().min(10, {message: 'Question must be at least 10 characters long.'}).describe('The question being submitted by the user.'),
  context: z.string().optional().describe('Optional additional context or details for the question.'),
  email: z.string().email({message: 'Please enter a valid email address.'}).describe("The user's email address for notifications."),
  category: z.string().describe('The category the question belongs to.'),
  keywords: z.string().optional().describe('Comma-separated keywords related to the question.'),
});
export type SubmitQuestionInput = z.infer<typeof SubmitQuestionInputSchema>;

const SubmitQuestionOutputSchema = z.object({
  submissionId: z.string().describe('A unique identifier for the submitted question.'),
  confirmationMessage: z.string().describe('A message confirming the submission to the user.'),
});
export type SubmitQuestionOutput = z.infer<typeof SubmitQuestionOutputSchema>;

export async function submitQuestion(input: SubmitQuestionInput): Promise<SubmitQuestionOutput> {
  return submitQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'submitQuestionPrompt',
  input: {schema: SubmitQuestionInputSchema},
  output: {schema: SubmitQuestionOutputSchema},
  prompt: `A user has submitted a new question for the CPP41419 Q&A website.

User Email: {{{email}}}
Category: {{{category}}}
Question: "{{{question}}}"
Context: "{{{context}}}"
Keywords: "{{{keywords}}}"

Task:
1. Generate a unique submission ID (e.g., "SUB-" followed by 8 random alphanumeric characters).
2. Create a friendly confirmation message acknowledging receipt of their question. Mention that they will be notified by email if their question is published.
`,
});


const submitQuestionFlow = ai.defineFlow(
  {
    name: 'submitQuestionFlow',
    inputSchema: SubmitQuestionInputSchema,
    outputSchema: SubmitQuestionOutputSchema,
  },
  async (input) => {
    console.log('Processing new question submission:', JSON.stringify(input, null, 2));

    // In a real application, you would save this to a database for moderation.
    // For now, we'll just log it and use AI to generate the confirmation.

    const {output} = await prompt(input);
    
    if (!output) {
        const submissionId = `SUB-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        return {
            submissionId,
            confirmationMessage: `Thank you for your submission! We've received your question and will review it shortly. You'll be notified at ${input.email} if it's published.`
        };
    }
    
    // Ensure ID is unique if AI doesn't generate a good one
    if (!output.submissionId.startsWith("SUB-")) {
        output.submissionId = `SUB-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }

    console.log('Question submission processed. ID:', output.submissionId);
    return output;
  }
);
