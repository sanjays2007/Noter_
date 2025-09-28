'use server';

/**
 * @fileOverview An AI writing assistance flow for the online notepad.
 *
 * - aiWritingAssistance - A function that provides AI writing assistance.
 * - AIWritingAssistanceInput - The input type for the aiWritingAssistance function.
 * - AIWritingAssistanceOutput - The return type for the aiWritingAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIWritingAssistanceInputSchema = z.object({
  text: z.string().describe('The text to provide writing assistance for.'),
});
export type AIWritingAssistanceInput = z.infer<
  typeof AIWritingAssistanceInputSchema
>;

const AIWritingAssistanceOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('AI writing suggestions.'),
});
export type AIWritingAssistanceOutput = z.infer<
  typeof AIWritingAssistanceOutputSchema
>;

export async function aiWritingAssistance(
  input: AIWritingAssistanceInput
): Promise<AIWritingAssistanceOutput> {
  return aiWritingAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiWritingAssistancePrompt',
  input: {schema: AIWritingAssistanceInputSchema},
  output: {schema: AIWritingAssistanceOutputSchema},
  prompt: `You are an AI writing assistant. Provide writing suggestions for the following text:\n\n{{text}}\n\nSuggestions should be clear, concise, and actionable.`,
});

const aiWritingAssistanceFlow = ai.defineFlow(
  {
    name: 'aiWritingAssistanceFlow',
    inputSchema: AIWritingAssistanceInputSchema,
    outputSchema: AIWritingAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
