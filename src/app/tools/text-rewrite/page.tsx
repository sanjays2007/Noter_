import { TextRewrite } from "@/components/features/text-rewrite";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenSquare } from "lucide-react";

export default function TextRewritePage() {
    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <div className="flex items-center gap-4">
                         <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <PenSquare className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Text Rewrite & Paraphrasing</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        Rewrite or paraphrase your text with AI. Choose from different styles to get the perfect tone for your writing.
                    </p>
                    <TextRewrite />
                </CardContent>
            </Card>
        </div>
    )
}
