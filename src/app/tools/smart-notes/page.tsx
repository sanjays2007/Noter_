import { SmartNotes } from "@/components/features/smart-notes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotebookText } from "lucide-react";

export default function SmartNotesPage() {
    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <div className="flex items-center gap-4">
                         <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <NotebookText className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Smart Notes</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        Automatically summarize your notes using AI. Just paste your note content below and let the AI do the work.
                    </p>
                    <SmartNotes />
                </CardContent>
            </Card>
        </div>
    )
}
