"use client";

import { NoteCategorization } from "@/components/features/note-categorization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tags } from "lucide-react";

export default function NoteCategorizationPage() {

    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                     <div className="flex items-center gap-4">
                         <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <Tags className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Note Categorization</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        AI will automatically categorize and suggest tags for your notes. Paste your note content to get started.
                    </p>
                    <NoteCategorization />
                </CardContent>
            </Card>
        </div>
    )
}
