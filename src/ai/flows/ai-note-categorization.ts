// AINoteCategorization story implementation.
'use server';
/**
 * @fileOverview AI-powered note categorization flow.
 *
 * - categorizeNote - A function that categorizes a note and tags it.
 * - CategorizeNoteInput - The input type for the categorizeNote function.
 * - CategorizeNoteOutput - The return type for the categorizeNote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeNoteInputSchema = z.object({
  noteContent: z.string().describe('The content of the note to categorize.'),
});
export type CategorizeNoteInput = z.infer<typeof CategorizeNoteInputSchema>;

const CategorizeNoteOutputSchema = z.object({
  categories: z.array(z.string()).describe('The categories the note belongs to.'),
  tags: z.array(z.string()).describe('Relevant tags for the note.'),
});
export type CategorizeNoteOutput = z.infer<typeof CategorizeNoteOutputSchema>;

export async function categorizeNote(input: CategorizeNoteInput): Promise<CategorizeNoteOutput> {
  return categorizeNoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeNotePrompt',
  input: {schema: CategorizeNoteInputSchema},
  output: {schema: CategorizeNoteOutputSchema},
  prompt: `You are an AI assistant that categorizes notes and suggests tags for them.

  Analyze the following note content and provide a list of categories and tags that are relevant to the note.

  Note Content: {{{noteContent}}}

  Categories:
  Tags:`, // Add the Handlebars syntax here
});

const categorizeNoteFlow = ai.defineFlow(
  {
    name: 'categorizeNoteFlow',
    inputSchema: CategorizeNoteInputSchema,
    outputSchema: CategorizeNoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
