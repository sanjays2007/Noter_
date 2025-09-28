"use client";

import { getNoteCategories, addFileToSubjectAction, addSubjectAction } from "@/app/actions";
import { AIToolLayout } from "./ai-tool-layout";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSubjects } from "@/lib/subjects-data";
import type { Subject } from "@/lib/subjects-db";
import { AddSubjectDialog } from "@/components/subjects/add-subject-dialog";

function TextCategorizationTab() {
  return (
    <AIToolLayout
      inputLabel="Note Content"
      placeholder="Paste your note here to get categories and tags..."
      actionButtonLabel="Categorize Note"
      resultTitle="AI Categorization"
      onAction={(noteContent) => getNoteCategories({ noteContent })}
      renderResult={(data) => (
        <div>
          <div>
            <h3 className="font-semibold mb-2">Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {data.categories?.map((category: string) => <Badge key={category}>{category}</Badge>) ?? <p className="text-muted-foreground">No categories generated.</p>}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {data.tags?.map((tag: string) => <Badge variant="secondary" key={tag}>{tag}</Badge>) ?? <p className="text-muted-foreground">No tags generated.</p>}
            </div>
          </div>
        </div>
      )}
    />
  );
}

function FileCategorizationTab() {
    const [file, setFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<string>("");
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [isAddSubjectDialogOpen, setIsAddSubjectDialogOpen] = useState(false);


    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const fetchSubjects = async () => {
        const fetchedSubjects = await getSubjects();
        setSubjects(fetchedSubjects);
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setAnalysisResult(null);
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setFileContent(content);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleAnalyze = async () => {
        if (!file || !fileContent) {
             toast({ variant: "destructive", title: "Analysis Failed", description: "File not found or content is empty."});
             setIsAnalyzing(false);
             return;
        }

        setIsAnalyzing(true);
        setAnalysisResult(null);

        // The content is already a data URI from handleFileChange
        const response = await getNoteCategories({ noteContent: fileContent });
        setIsAnalyzing(false);

        if (response.success) {
            setAnalysisResult(response.data);
            toast({ title: "Analysis Complete", description: "Categories and tags have been generated." });
        } else {
            toast({
                variant: "destructive",
                title: "Analysis Failed",
                description: response.error || "Failed to categorize note.",
            });
        }
    };
    
    const handleSaveToSubject = async (subjectSlug: string) => {
        if (!file || !fileContent || !subjectSlug) return;
        
        setIsSaving(true);
        
        const response = await addFileToSubjectAction(subjectSlug, file.name, fileContent);
        
        if (response.success) {
            toast({ title: "File Saved!", description: `Saved to subject: ${subjectSlug}` });
            // Reset state
            setFile(null);
            setFileContent("");
            setAnalysisResult(null);
            setSelectedSubject("");
            if(fileInputRef.current) fileInputRef.current.value = "";
        } else {
            toast({
                variant: "destructive",
                title: "Failed to save file",
                description: response.error || "An unknown error occurred",
            });
        }
        setIsSaving(false);
    };

    const handleCreateAndSaveSubject = async (subjectName: string) => {
        setIsSaving(true);
        const newSubjectResponse = await addSubjectAction(subjectName);
        if (newSubjectResponse.success && newSubjectResponse.data) {
          const newSlug = newSubjectResponse.data.slug;
          await fetchSubjects(); // Refresh the subjects list
          setSelectedSubject(newSlug); // Pre-select the new subject
          await handleSaveToSubject(newSlug);
        } else {
          toast({
            variant: 'destructive',
            title: 'Failed to create subject',
            description: newSubjectResponse.error,
          });
        }
        setIsSaving(false);
      };


    return (
        <div className="space-y-6">
            <div 
                className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center bg-muted/20 cursor-pointer hover:border-primary"
                onClick={() => fileInputRef.current?.click()}
            >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".txt,.md,.text,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload className="w-12 h-12" />
                    {file ? (
                        <p className="font-semibold text-foreground">{file.name}</p>
                    ) : (
                        <>
                            <p className="font-semibold">Click to upload a file</p>
                            <p className="text-sm">(.txt, .md, .pdf, .doc, .docx)</p>
                        </>
                    )}
                </div>
            </div>

            {file && (
                 <Button onClick={handleAnalyze} disabled={isAnalyzing || !fileContent}>
                    {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Analyze File
                </Button>
            )}

            {analysisResult && (
                <div className="space-y-4 rounded-lg border p-4">
                     <div>
                        <h3 className="font-semibold mb-2">Categories:</h3>
                        <div className="flex flex-wrap gap-2">
                        {analysisResult.categories?.map((category: string) => <Badge key={category}>{category}</Badge>) ?? <p className="text-muted-foreground">No categories generated.</p>}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                        {analysisResult.tags?.map((tag: string) => <Badge variant="secondary" key={tag}>{tag}</Badge>) ?? <p className="text-muted-foreground">No tags generated.</p>}
                        </div>
                    </div>
                    
                    <div className="border-t pt-4 mt-4 space-y-4">
                        <h3 className="font-semibold">Store to My Subjects</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                <SelectTrigger className="w-full sm:w-[280px]">
                                    <SelectValue placeholder="Select an existing subject..." />
                                </SelectTrigger>

                                <SelectContent>
                                    {subjects.map(subject => (
                                        <SelectItem key={subject.id} value={subject.slug}>{subject.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={() => { if(selectedSubject) handleSaveToSubject(selectedSubject) }} disabled={isSaving || !selectedSubject} className="w-full sm:w-auto">
                                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save to Subject
                            </Button>
                        </div>
                         <div className="relative flex items-center justify-center text-sm text-muted-foreground">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t"></div>
                            </div>
                            <span className="relative bg-card px-2">Or</span>
                        </div>
                         <AddSubjectDialog
                            open={isAddSubjectDialogOpen}
                            onOpenChange={setIsAddSubjectDialogOpen}
                            onAddSubject={handleCreateAndSaveSubject}
                            >
                            <Button variant="outline" className="w-full" onClick={() => setIsAddSubjectDialogOpen(true)} disabled={isSaving}>
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Create a new subject and save
                            </Button>
                        </AddSubjectDialog>
                    </div>
                </div>
            )}
        </div>
    )
}

export function NoteCategorization() {
  return (
    <Tabs defaultValue="text">
        <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="text">Categorize Text</TabsTrigger>
            <TabsTrigger value="file">Categorize File</TabsTrigger>
        </TabsList>
        <TabsContent value="text">
             <p className="text-muted-foreground mb-6">
                Paste your note content to get categories and tags.
            </p>
            <TextCategorizationTab />
        </TabsContent>
        <TabsContent value="file">
            <p className="text-muted-foreground mb-6">
                Upload a file to have the AI analyze it and suggest categories and tags.
            </p>
            <FileCategorizationTab />
        </TabsContent>
    </Tabs>
  );
}
