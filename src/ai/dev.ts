
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-follow-up-questions.ts';
import '@/ai/flows/improve-response-quality.ts';
import '@/ai/flows/process-lead-inquiry.ts'; // Added new flow
import '@/ai/flows/submit-question.ts';

    
