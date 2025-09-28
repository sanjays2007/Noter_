import { WebClipper } from "@/components/features/web-clipper";
import { getSubjects } from "@/lib/subjects-data";

export const dynamic = 'force-dynamic';

export default async function WebClipperPage() {
    const subjects = await getSubjects();
    return <WebClipper subjects={subjects} />;
}
