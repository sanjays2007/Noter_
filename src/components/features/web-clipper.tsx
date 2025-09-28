"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getWebContentSummary, addFileToSubjectAction } from "@/app/actions";
import { AIToolLayout } from "./ai-tool-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Image, Loader2, Scissors } from "lucide-react";
import NextImage from "next/image";
import type { Subject } from "@/lib/subjects-db";

interface WebClipperProps {
    subjects: Subject[];
}

function SummarizeTab() {
  return (
    <AIToolLayout
      inputLabel="Web Content"
      placeholder="Paste clipped web content here to summarize..."
      actionButtonLabel="Summarize Content"
      resultTitle="AI Summary"
      onAction={(webContent) => getWebContentSummary({ webContent })}
      renderResult={(data) => <p>{data.summary}</p>}
    />
  );
}

function ScreenshotTab({ subjects }: WebClipperProps) {
    const [pastedImage, setPastedImage] = useState<string | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const pasteAreaRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const handlePaste = useCallback((event: ClipboardEvent) => {
        const items = event.clipboardData?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                const blob = items[i].getAsFile();
                if (blob) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setPastedImage(e.target?.result as string);
                    };
                    reader.readAsDataURL(blob);
                }
            }
        }
    }, []);

    useEffect(() => {
        const pasteArea = pasteAreaRef.current;
        if(pasteArea) {
            // Can't add event listener directly to JSX element in this case
            pasteArea.addEventListener("paste", handlePaste as EventListener);
        }

        return () => {
            if(pasteArea) {
                pasteArea.removeEventListener("paste", handlePaste as EventListener);
            }
        }
    }, [handlePaste]);

    const handleSave = async () => {
        if (!pastedImage || !selectedSubject) {
            toast({
                variant: "destructive",
                title: "Missing information",
                description: "Please paste an image and select a subject.",
            });
            return;
        }

        setIsLoading(true);
        const fileName = `screenshot-${Date.now()}.png`;
        const response = await addFileToSubjectAction(selectedSubject, fileName, pastedImage);
        setIsLoading(false);

        if (response.success) {
            toast({
                title: "Screenshot Saved!",
                description: `Your screenshot has been saved to the selected subject.`,
            });
            setPastedImage(null);
            setSelectedSubject("");
        } else {
            toast({
                variant: "destructive",
                title: "Failed to save screenshot",
                description: response.error,
            });
        }
    }
    
    return (
        <div className="space-y-4">
             <div 
                ref={pasteAreaRef}
                tabIndex={0}
                className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
             >
                {pastedImage ? (
                    <div className="relative w-full max-w-md mx-auto">
                        <NextImage src={pastedImage} alt="Pasted screenshot" width={600} height={400} className="rounded-md object-contain" />
                    </div>
                ): (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Image className="w-12 h-12" />
                        <p className="font-semibold">Paste your screenshot here</p>
                        <p className="text-sm">Press Ctrl+V or Command+V to paste.</p>
                    </div>
                )}
            </div>

            {pastedImage && (
                 <div className="flex flex-col sm:flex-row items-center gap-4">
                     <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger className="w-full sm:w-[280px]">
                            <SelectValue placeholder="Select a subject to save to..." />
                        </SelectTrigger>
                        <SelectContent>
                            {subjects.map(subject => (
                                <SelectItem key={subject.id} value={subject.slug}>{subject.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={handleSave} disabled={isLoading || !selectedSubject} className="w-full sm:w-auto">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Screenshot
                    </Button>
                 </div>
            )}
        </div>
    )
}

export function WebClipper({ subjects }: WebClipperProps) {
  return (
    <div className="container py-12 md:py-16">
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-4">
                     <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <Scissors className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Web Clipper</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="summarize">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="summarize">Summarize Content</TabsTrigger>
                        <TabsTrigger value="screenshot">Save Screenshot</TabsTrigger>
                    </TabsList>
                    <TabsContent value="summarize">
                        <p className="text-muted-foreground mb-6">
                            Save articles, recipes, and other web content, and let the AI provide a concise summary for you.
                        </p>
                        <SummarizeTab />
                    </TabsContent>
                    <TabsContent value="screenshot">
                         <p className="text-muted-foreground mb-6">
                            Paste a screenshot and save it directly to one of your subjects.
                        </p>
                        <ScreenshotTab subjects={subjects} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}
