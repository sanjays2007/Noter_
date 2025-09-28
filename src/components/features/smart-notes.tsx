"use client";

import { getSmartNotesSummary } from "@/app/actions";
import { AIToolLayout } from "./ai-tool-layout";

export function SmartNotes() {
  return (
    <AIToolLayout
      inputLabel="Note Content"
      placeholder="Paste your note here to get a summary..."
      actionButtonLabel="Summarize Note"
      resultTitle="AI Summary"
      onAction={(noteContent) => getSmartNotesSummary({ noteContent })}
      renderResult={(data) => <p>{data.summary}</p>}
    />
  );
}
