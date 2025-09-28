import { getSubjectBySlug } from "@/lib/subjects-data";
import { notFound } from "next/navigation";
import { SubjectDetailsClient } from "./client-page";

export const dynamic = 'force-dynamic';

export default async function SubjectPage({ params }: { params: { slug: string } }) {
  const subject = await getSubjectBySlug(params.slug);
  
  if (!subject) {
    notFound();
  }

  return <SubjectDetailsClient subject={subject} />;
}
