"use client";

import React, { useState, useRef } from "react";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getSemanticSearchResults } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function SearchTextTab() {
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !documents.trim()) return;

    setIsLoading(true);
    setResult(null);

    const docsArray = documents.split('\n').filter(doc => doc.trim() !== '');

    const response = await getSemanticSearchResults({ query, documents: docsArray });

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
        <div className="space-y-2">
            <Label htmlFor="query-text">Search Query</Label>
            <Input
            id="query-text"
            placeholder="Enter your search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="documents">Documents</Label>
            <Textarea
            id="documents"
            placeholder="Paste your documents here, one per line."
            value={documents}
            onChange={(e) => setDocuments(e.target.value)}
            className="min-h-[150px] text-sm"
            />
        </div>
        <Button type="submit" disabled={isLoading || !query.trim() || !documents.trim()}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Search
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
            <CardTitle className="text-lg">Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            {result.results?.length > 0 ? (
                <ul className="space-y-2 text-sm">
                    {result.results.map((res: string, index: number) => (
                        <li key={index} className="p-3 bg-secondary rounded-md">{res}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-muted-foreground">No relevant documents found.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SearchDocumentTab() {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
        setFile(selectedFile);
        setResult(null);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setFileContent(content);
        };
        reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !fileContent) return;

    setIsLoading(true);
    setResult(null);

    const response = await getSemanticSearchResults({ query, documents: [fileContent] });

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
    <form onSubmit={handleSubmit} className="space-y-6">
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
                        <p className="font-semibold">Click to upload a document</p>
                        <p className="text-sm">(.txt, .md, .pdf, .doc, .docx)</p>
                    </>
                )}
            </div>
        </div>

      <div className="space-y-2">
          <Label htmlFor="query-doc">Search Query</Label>
          <Input
          id="query-doc"
          placeholder="What are you looking for in the document?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          />
      </div>
      
      <Button type="submit" disabled={isLoading || !query.trim() || !fileContent}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Search Document
      </Button>

      {isLoading && (
        <div className="flex items-center justify-center rounded-lg border p-8 min-h-[150px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            {result.results?.length > 0 ? (
                <ul className="space-y-2 text-sm">
                    {result.results.map((res: string, index: number) => (
                        <li key={index} className="p-3 bg-secondary rounded-md whitespace-pre-wrap">{res}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-muted-foreground">No relevant results found in the document.</p>
            )}
          </CardContent>
        </Card>
      )}
    </form>
  )

}


export function SemanticSearch() {
    return (
    <Tabs defaultValue="text">
        <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="text">Search Text</TabsTrigger>
            <TabsTrigger value="document">Search Document</TabsTrigger>
        </TabsList>
        <TabsContent value="text">
            <p className="text-muted-foreground mb-6">
                Paste a query and a list of documents (one per line) to find the most relevant ones.
            </p>
            <SearchTextTab />
        </TabsContent>
        <TabsContent value="document">
            <p className="text-muted-foreground mb-6">
                Upload a document and enter a query to find relevant information within the file.
            </p>
            <SearchDocumentTab />
        </TabsContent>
    </Tabs>
  );
}
