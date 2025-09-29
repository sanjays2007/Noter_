'use server';

/**
 * @fileOverview A semantic search AI agent that searches across notes and documents.
 *
 * - semanticSearch - A function that performs semantic search.
 * - SemanticSearchInput - The input type for the semanticSearch function.
 * - SemanticSearchOutput - The return type for the semanticSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SemanticSearchInputSchema = z.object({
  query: z.string().describe('The search query.'),
  documents: z
    .array(z.string())
    .describe('The documents to search through. This can be plain text or data URIs for files.'),
});
export type SemanticSearchInput = z.infer<typeof SemanticSearchInputSchema>;

const SemanticSearchOutputSchema = z.object({
  results: z
    .array(z.string())
    .describe('The search results, ranked by relevance. If the input document is a file, the result should be relevant snippets from the document. If it is text, it should be the most relevant text snippets.'),
});
export type SemanticSearchOutput = z.infer<typeof SemanticSearchOutputSchema>;

export async function semanticSearch(
  input: SemanticSearchInput
): Promise<SemanticSearchOutput> {
  return semanticSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'semanticSearchPrompt',
  input: {schema: SemanticSearchInputSchema},
  output: {schema: SemanticSearchOutputSchema},
  prompt: `You are an AI semantic search engine.

You will be given a search query and a list of documents. The documents can be either plain text or files encoded as data URIs.

Your task is to find the most relevant information within the documents based on the search query.

- If the documents are plain text, return the most relevant lines or snippets.
- If a document is a file (like a PDF or Word document provided as a data URI), extract and return the most relevant text passages from within that file.

Return the results ranked by relevance.

Query: {{{query}}}

Documents:
{{#each documents}}
- {{{this}}}
{{/each}}`,
});

const semanticSearchFlow = ai.defineFlow(
  {
    name: 'semanticSearchFlow',
    inputSchema: SemanticSearchInputSchema,
    outputSchema: SemanticSearchOutputSchema,
  },
  async input => {
    // This logic handles both data URIs and plain text gracefully.
    // The prompt is designed to differentiate, so no special handling is needed here.
    const {output} = await prompt(input);
    return output!;
  }
);
