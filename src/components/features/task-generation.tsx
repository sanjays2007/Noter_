"use client";

import { getGeneratedTasks } from "@/app/actions";
import { AIToolLayout } from "./ai-tool-layout";

export function TaskGeneration() {
  return (
    <AIToolLayout
      inputLabel="Note Content"
      placeholder="Paste your note here to generate a to-do list..."
      actionButtonLabel="Generate Tasks"
      resultTitle="AI-Generated To-Do List"
      onAction={(noteContent) => getGeneratedTasks({ noteContent })}
      renderResult={(data) => <p className="whitespace-pre-wrap">{data.todoList}</p>}
    />
  );
}
