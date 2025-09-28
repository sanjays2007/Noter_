'use server';
/**
 * @fileOverview A web clipper AI agent that summarizes web content.
 *
 * - webClipperAISummarization - A function that handles the web content summarization process.
 * - WebClipperAISummarizationInput - The input type for the webClipperAISummarization function.
 * - WebClipperAISummarizationOutput - The return type for the webClipperAISummarization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WebClipperAISummarizationInputSchema = z.object({
  webContent: z
    .string()
    .describe('The web content to be summarized.'),
});
export type WebClipperAISummarizationInput = z.infer<typeof WebClipperAISummarizationInputSchema>;

const WebClipperAISummarizationOutputSchema = z.object({
  summary: z.string().describe('The summary of the web content.'),
});
export type WebClipperAISummarizationOutput = z.infer<typeof WebClipperAISummarizationOutputSchema>;

export async function webClipperAISummarization(input: WebClipperAISummarizationInput): Promise<WebClipperAISummarizationOutput> {
  return webClipperAISummarizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'webClipperAISummarizationPrompt',
  input: {schema: WebClipperAISummarizationInputSchema},
  output: {schema: WebClipperAISummarizationOutputSchema},
  prompt: `Summarize the following web content:\n\n{{webContent}}`,
});

const webClipperAISummarizationFlow = ai.defineFlow(
  {
    name: 'webClipperAISummarizationFlow',
    inputSchema: WebClipperAISummarizationInputSchema,
    outputSchema: WebClipperAISummarizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
