import { TaskGeneration } from "@/components/features/task-generation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo } from "lucide-react";

export default function TaskGenerationPage() {
    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <div className="flex items-center gap-4">
                         <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <ListTodo className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Task Generation</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        Based on the content of your notes, the AI will generate a prioritized to-do list to help you stay on track.
                    </p>
                    <TaskGeneration />
                </CardContent>
            </Card>
        </div>
    )
}
