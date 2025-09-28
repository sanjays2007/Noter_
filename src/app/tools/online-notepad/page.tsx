import { OnlineNotepad } from "@/components/features/online-notepad";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePenLine } from "lucide-react";

export default function OnlineNotepadPage() {
    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <div className="flex items-center gap-4">
                         <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <FilePenLine className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Online Notepad</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        A rich-text editor with built-in AI writing assistance. Get suggestions to improve your writing as you type.
                    </p>
                    <OnlineNotepad />
                </CardContent>
            </Card>
        </div>
    )
}
