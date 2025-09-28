'use server';

/**
 * @fileOverview This file implements the Genkit flow for AI-assisted task generation and prioritization based on note content.
 *
 * - generateTasks - A function that handles the generation of to-do lists and prioritizes tasks based on the note content.
 * - GenerateTasksInput - The input type for the generateTasks function, which includes the note content.
 * - GenerateTasksOutput - The return type for the generateTasks function, which includes the generated to-do list.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTasksInputSchema = z.object({
  noteContent: z.string().describe('The content of the note to generate tasks from.'),
});
export type GenerateTasksInput = z.infer<typeof GenerateTasksInputSchema>;

const GenerateTasksOutputSchema = z.object({
  todoList: z.string().describe('A prioritized to-do list generated from the note content.'),
});
export type GenerateTasksOutput = z.infer<typeof GenerateTasksOutputSchema>;

export async function generateTasks(input: GenerateTasksInput): Promise<GenerateTasksOutput> {
  return generateTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTasksPrompt',
  input: {schema: GenerateTasksInputSchema},
  output: {schema: GenerateTasksOutputSchema},
  prompt: `You are an AI task management assistant. Your goal is to create and prioritize a to-do list based on the content of a user's note.

Note Content: {{{noteContent}}}

Based on the note content, generate a prioritized to-do list. Be specific and clear about what needs to be done.

To-Do List:`,
});

const generateTasksFlow = ai.defineFlow(
  {
    name: 'generateTasksFlow',
    inputSchema: GenerateTasksInputSchema,
    outputSchema: GenerateTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
