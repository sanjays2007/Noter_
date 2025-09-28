"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface AIToolLayoutProps {
  initialInput?: string;
  inputLabel: string;
  actionButtonLabel: string;
  onAction: (input: string) => Promise<{ success: boolean; data: any; error?: string }>;
  renderResult: (data: any) => React.ReactNode;
  placeholder?: string;
  resultTitle: string;
}

export function AIToolLayout({
  initialInput = "",
  inputLabel,
  actionButtonLabel,
  onAction,
  renderResult,
  placeholder,
  resultTitle,
}: AIToolLayoutProps) {
  const [input, setInput] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setResult(null);

    const response = await onAction(input);

    setIsLoading(false);
    if (response.success) {
      setResult(response.data);
    } else {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: response.error,
      });
    }
  };

  return (
    <div className="grid gap-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          id="input"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[150px] text-sm"
          aria-label={inputLabel}
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {actionButtonLabel}
        </Button>
      </form>

      {isLoading && (
        <div className="flex items-center justify-center rounded-lg border p-8 min-h-[150px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{resultTitle}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-4">
            {renderResult(result)}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
