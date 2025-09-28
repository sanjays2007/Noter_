import { SemanticSearch } from "@/components/features/semantic-search";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

export default function SemanticSearchPage() {
    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                     <div className="flex items-center gap-4">
                         <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Semantic Search</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <SemanticSearch />
                </CardContent>
            </Card>
        </div>
    )
}
