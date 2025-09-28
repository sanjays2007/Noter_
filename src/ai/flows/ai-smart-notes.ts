'use server';

/**
 * @fileOverview This file implements the AI-assisted smart notes feature, allowing users to automatically summarize their notes using AI.
 *
 * @remarks
 *   - aiSmartNotes - A function that takes note content as input and returns a summarized version of the note.
 *   - AISmartNotesInput - The input type for the aiSmartNotes function.
 *   - AISmartNotesOutput - The return type for the aiSmartNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISmartNotesInputSchema = z.object({
  noteContent: z.string().describe('The content of the note to be summarized.'),
});
export type AISmartNotesInput = z.infer<typeof AISmartNotesInputSchema>;

const AISmartNotesOutputSchema = z.object({
  summary: z.string().describe('The AI-generated summary of the note content.'),
});
export type AISmartNotesOutput = z.infer<typeof AISmartNotesOutputSchema>;

export async function aiSmartNotes(input: AISmartNotesInput): Promise<AISmartNotesOutput> {
  return aiSmartNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSmartNotesPrompt',
  input: {schema: AISmartNotesInputSchema},
  output: {schema: AISmartNotesOutputSchema},
  prompt: `Summarize the following note content:\n\n{{noteContent}}`,
});

const aiSmartNotesFlow = ai.defineFlow(
  {
    name: 'aiSmartNotesFlow',
    inputSchema: AISmartNotesInputSchema,
    outputSchema: AISmartNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
