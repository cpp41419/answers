
'use server';
/**
 * @fileOverview A Genkit flow to process a lead inquiry from the RTO Quiz.
 *
 * - processLeadInquiry - A function that takes quiz answers and RTO choice, simulates lead storage, and generates a confirmation.
 * - ProcessLeadInquiryInput - The input type for the processLeadInquiry function.
 * - ProcessLeadInquiryOutput - The return type for the processLeadInquiry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessLeadInquiryInputSchema = z.object({
  deliveryPreference: z.string().describe('The user\'s preferred delivery method (e.g., online, in-person).'),
  state: z.string().describe('The user\'s state of residence/interest.'),
  selectedRtoName: z.string().describe('The name of the RTO the user is interested in.'),
  userInquiry: z.string().describe('The user\'s message or questions for the RTO.'),
});
export type ProcessLeadInquiryInput = z.infer<typeof ProcessLeadInquiryInputSchema>;

const ProcessLeadInquiryOutputSchema = z.object({
  leadId: z.string().describe('A unique identifier for the generated lead (simulated).'),
  confirmationMessage: z.string().describe('A message confirming the lead submission to the user.'),
  nextSteps: z.string().optional().describe('Suggested next steps for the user.'),
});
export type ProcessLeadInquiryOutput = z.infer<typeof ProcessLeadInquiryOutputSchema>;

export async function processLeadInquiry(input: ProcessLeadInquiryInput): Promise<ProcessLeadInquiryOutput> {
  return processLeadInquiryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processLeadInquiryPrompt',
  input: {schema: ProcessLeadInquiryInputSchema},
  output: {schema: ProcessLeadInquiryOutputSchema},
  prompt: `You are an AI assistant for a CPP41419 Real Estate course information website.
A user has submitted an inquiry based on a quiz they took.
Their preferences:
- Delivery Method: {{{deliveryPreference}}}
- State: {{{state}}}
- Interested RTO: {{{selectedRtoName}}}
- Their inquiry: "{{{userInquiry}}}"

Task:
1. Generate a unique lead ID (e.g., "LEAD-" followed by 8 random alphanumeric characters).
2. Create a friendly confirmation message for the user. Acknowledge their interest in the RTO and their specific preferences. Mention that their inquiry (about costs, start dates, support etc.) will be "forwarded" (simulated).
3. Suggest brief, helpful next steps, such as "While you wait for more information, feel free to explore our Comprehensive Guide or compare other providers on our site."

Example Lead ID: LEAD-A4T8K2P1
Example Confirmation: "Thanks for your interest in {{{selectedRtoName}}} for {{{deliveryPreference}}} study in {{{state}}}! We've noted your inquiry and will (simulate) forwarding it. You'll hear back soon!"
`,
});

const processLeadInquiryFlow = ai.defineFlow(
  {
    name: 'processLeadInquiryFlow',
    inputSchema: ProcessLeadInquiryInputSchema,
    outputSchema: ProcessLeadInquiryOutputSchema,
  },
  async (input: ProcessLeadInquiryInput) => {
    console.log('Processing lead inquiry:', JSON.stringify(input, null, 2));

    // In a real application, you would save this lead to a database or CRM.
    // For now, we'll just log it and use AI to generate the response.

    const {output} = await prompt(input);

    if (!output) {
        // Fallback if AI fails to generate output as expected
        const leadId = `LEAD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        return {
            leadId: leadId,
            confirmationMessage: `Thank you for your interest in ${input.selectedRtoName} for ${input.deliveryPreference} study in ${input.state}. Your inquiry has been noted (ID: ${leadId}).`,
            nextSteps: "While you wait for more information, feel free to explore our Comprehensive Guide or compare other providers on our site."
        };
    }
    
    // Ensure leadId is truly unique if AI just copies example.
    // This is a simple way, a more robust way might be needed if AI consistently fails to vary it.
    if (output.leadId === "LEAD-A4T8K2P1" || !output.leadId.startsWith("LEAD-")) {
        output.leadId = `LEAD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }


    console.log('Lead processed. ID:', output.leadId);
    return output;
  }
);

    