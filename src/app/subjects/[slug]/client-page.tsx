"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Pencil, PlusCircle, Save, Trash2, X, Loader2 } from "lucide-react";
import { addFileToSubject, updateFileNickname, deleteFileFromSubject } from "@/lib/subjects-data";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

type File = {
  id: string;
  name: string;
  nickname: string;
  path?: string;
};

type Subject = {
    id: string;
    name: string;
    slug: string;
    files: File[];
}

interface SubjectDetailsClientProps {
    subject: Subject;
}

export function SubjectDetailsClient({ subject: initialSubject }: SubjectDetailsClientProps) {
  const [subject, setSubject] = useState(initialSubject);
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editingNickname, setEditingNickname] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleEdit = (file: File) => {
    setEditingFileId(file.id);
    setEditingNickname(file.nickname);
  };
  
  const handleSave = async (fileId: string) => {
    const updatedSubject = await updateFileNickname(subject.slug, fileId, editingNickname);
    if(updatedSubject) {
      setSubject(updatedSubject);
      toast({ title: "Nickname updated successfully." });
    } else {
      toast({ variant: "destructive", title: "Failed to update nickname." });
    }
    setEditingFileId(null);
    setEditingNickname("");
  };

  const handleCancel = () => {
    setEditingFileId(null);
    setEditingNickname("");
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        const fileContent = reader.result as string;
        const updatedSubject = await addFileToSubject(subject.slug, file.name, fileContent);
        
        setIsUploading(false);

        if (updatedSubject) {
          setSubject(updatedSubject);
          toast({ title: "File uploaded successfully." });
        } else {
            toast({ variant: "destructive", title: "Failed to upload file." });
        }
    }
    reader.onerror = () => {
        setIsUploading(false);
        toast({ variant: "destructive", title: "Failed to read file." });
    }


    // Reset file input
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    setIsDeleting(fileId);
    const updatedSubject = await deleteFileFromSubject(subject.slug, fileId);
    setIsDeleting(null);
    if(updatedSubject) {
      setSubject(updatedSubject);
      toast({ title: "File deleted successfully." });
    } else {
      toast({ variant: "destructive", title: "Failed to delete file." });
    }
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
              {subject.name}
            </h1>
            <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                className="hidden" 
              />
              <Button onClick={handleUploadClick} disabled={isUploading}>
                {isUploading ? (
                    <Loader2 className="mr-2 animate-spin" />
                ) : (
                    <PlusCircle className="mr-2" />
                )}
                Upload File
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
                <div className="divide-y divide-border">
                {subject.files.length > 0 ? subject.files.map((file) => (
                    <div key={file.id} className="p-4 flex items-center justify-between hover:bg-muted/50">
                        <div className="flex items-center gap-4">
                            <FileText className="w-6 h-6 text-muted-foreground" />
                            <div>
                                <Link href={file.path || '#'} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
                                  {file.name}
                                </Link>
                                {editingFileId === file.id ? (
                                    <div className="flex items-center gap-2 mt-1">
                                        <Input 
                                            value={editingNickname} 
                                            onChange={(e) => setEditingNickname(e.target.value)}
                                            className="h-8"
                                        />
                                        <Button size="icon" className="h-8 w-8" onClick={() => handleSave(file.id)}><Save className="h-4 w-4"/></Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleCancel}><X className="h-4 w-4"/></Button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">{file.nickname}</p>

                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                             {editingFileId !== file.id && (
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(file)}>
                                    <Pencil className="w-4 h-4" />
                                    <span className="sr-only">Edit Nickname</span>
                                </Button>
                             )}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteFile(file.id)}
                              disabled={isDeleting === file.id}
                            >
                                {isDeleting === file.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                                <span className="sr-only">Delete File</span>
                            </Button>
                        </div>
                    </div>
                )) : (
                    <div className="p-8 text-center text-muted-foreground">
                        <p>No files uploaded for this subject yet.</p>
                    </div>
                )}
                </div>
            </CardContent>
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
}
