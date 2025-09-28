"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import Link from "next/link";
import { PlusCircle, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubjects, addSubject } from "@/lib/subjects-data";
import { AddSubjectDialog } from "@/components/subjects/add-subject-dialog";

type Subject = {
  id: string;
  name: string;
  slug: string;
  files: any[];
};

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchSubjects = async () => {
    const initialSubjects = await getSubjects();
    setSubjects(initialSubjects);
  }

  useEffect(() => {
    // Fetch initial subjects on mount
    fetchSubjects();
  }, []);


  const handleAddSubject = async (name: string) => {
    await addSubject(name);
    // Refetch subjects to get the latest list
    await fetchSubjects();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
              My Subjects
            </h1>
            <AddSubjectDialog
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              onAddSubject={handleAddSubject}
            >
              <Button onClick={() => setIsDialogOpen(true)}>
                <PlusCircle className="mr-2" />
                Add Subject
              </Button>
            </AddSubjectDialog>
          </div>

          {subjects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => (
                <Link href={`/subjects/${subject.slug}`} key={subject.id}>
                  <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                          <Book className="w-6 h-6" />
                      </div>
                      <div>
                          <CardTitle>{subject.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {subject.files.length} file(s)
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-lg border border-dashed">
                <h2 className="text-xl font-semibold">No Subjects Yet</h2>
                <p className="text-muted-foreground mt-2">Click "Add Subject" to create your first one.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
