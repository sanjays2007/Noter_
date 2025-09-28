"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getRewrittenText } from "@/app/actions";

export function TextRewrite() {
  const [input, setInput] = useState("");
  const [style, setStyle] = useState("default");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setResult(null);

    const response = await getRewrittenText({ text: input, style: style === 'default' ? undefined : style });

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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        <div className="space-y-2 flex-grow flex flex-col">
          <Label htmlFor="input-text">Original Text</Label>
          <Textarea
            id="input-text"
            placeholder="Paste your text to rewrite..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="text-sm flex-grow"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rewrite-style">Rewrite Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger id="rewrite-style">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="informal">Informal</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Rewrite Text
        </Button>
      </form>

      <div className="flex flex-col">
        {isLoading && (
          <div className="flex h-full min-h-[250px] items-center justify-center rounded-lg border">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {result && (
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Rewritten Text</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex">
              <Textarea
                readOnly
                value={result.rewrittenText}
                className="text-sm bg-secondary flex-grow"
              />
            </CardContent>
          </Card>
        )}
        {!isLoading && !result && (
            <div className="flex h-full min-h-[250px] items-center justify-center rounded-lg border bg-secondary/50">
                <p className="text-sm text-muted-foreground p-4 text-center">Your rewritten text will appear here.</p>
            </div>
        )}
      </div>
    </div>
  );
}
