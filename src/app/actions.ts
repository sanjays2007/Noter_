"use server";

import { aiSmartNotes, type AISmartNotesInput } from "@/ai/flows/ai-smart-notes";
import { categorizeNote, type CategorizeNoteInput } from "@/ai/flows/ai-note-categorization";
import { generateTasks, type GenerateTasksInput } from "@/ai/flows/ai-task-generation";
import { webClipperAISummarization, type WebClipperAISummarizationInput } from "@/ai/flows/web-clipper-ai-summarization";
import { semanticSearch, type SemanticSearchInput } from "@/ai/flows/ai-semantic-search";
import { rewriteText, type RewriteTextInput } from "@/ai/flows/ai-text-rewrite-paraphrasing";
import { aiWritingAssistance, type AIWritingAssistanceInput } from "@/ai/flows/ai-writing-assistance";
import { addFileToSubject, addSubject } from "@/lib/subjects-data";

export async function getSmartNotesSummary(input: AISmartNotesInput) {
    try {
        const result = await aiSmartNotes(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to generate summary." };
    }
}

export async function getNoteCategories(input: CategorizeNoteInput) {
    try {
        const result = await categorizeNote(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to categorize note." };
    }
}

export async function getGeneratedTasks(input: GenerateTasksInput) {
    try {
        const result = await generateTasks(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to generate tasks." };
    }
}

export async function getWebContentSummary(input: WebClipperAISummarizationInput) {
    try {
        const result = await webClipperAISummarization(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to summarize web content." };
    }
}

export async function getSemanticSearchResults(input: SemanticSearchInput) {
    try {
        const response = await semanticSearch(input);
        return { success: true, data: response };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to perform semantic search." };
    }
}

export async function getRewrittenText(input: RewriteTextInput) {
    try {
        const result = await rewriteText(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to rewrite text." };
    }
}

export async function getWritingAssistance(input: AIWritingAssistanceInput) {
    try {
        const result = await aiWritingAssistance(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to get writing assistance." };
    }
}

export async function addSubjectAction(name: string) {
    try {
        const newSubject = await addSubject(name);
        return { success: true, data: newSubject };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to create subject." };
    }
}

export async function addFileToSubjectAction(subjectSlug: string, fileName: string, fileContent: string) {
    try {
        const result = await addFileToSubject(subjectSlug, fileName, fileContent);
        if (result) {
            return { success: true, data: result };
        }
        return { success: false, error: "Failed to save file." };

    } catch (error) {
        console.error(error);
        return { success: false, error: "An unexpected error occurred." };
    }
}
