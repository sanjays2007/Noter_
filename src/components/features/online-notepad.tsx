"use client";

import { getWritingAssistance } from "@/app/actions";
import { AIToolLayout } from "./ai-tool-layout";
import { Sparkles } from "lucide-react";

export function OnlineNotepad() {
  return (
    <AIToolLayout
      inputLabel="Your Note"
      placeholder="Start writing your note... When you need help, click the button below."
      actionButtonLabel="Get Writing Suggestions"
      resultTitle="AI Suggestions"
      onAction={(text) => getWritingAssistance({ text })}
      renderResult={(data) => (
        <ul className="space-y-2">
            {data.suggestions?.map((suggestion: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                    <Sparkles className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>{suggestion}</span>
                </li>
            ))}
        </ul>
      )}
    />
  );
}
