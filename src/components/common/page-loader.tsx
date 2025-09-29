"use client";

import { Bot } from "lucide-react";

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <Bot className="h-full w-full text-primary" />
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary/50" />
          <div className="absolute inset-2 animate-pulse rounded-full border-2 border-primary/30" />
        </div>
        <p className="text-lg font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
