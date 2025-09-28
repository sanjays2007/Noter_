"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon | null;
  title: string;
  description: string;
  href?: string;
}

export function FeatureCard({ icon: Icon, title, description, href }: FeatureCardProps) {
  const cardContent = (
    <CardHeader>
      {Icon && <div className="mb-4 bg-primary/10 text-primary p-3 rounded-lg w-min">
        <Icon className="h-6 w-6" />
      </div>}
      <CardTitle className="font-headline">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );

  if (href) {
    return (
        <Link href={href} className="flex">
            <Card className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full flex flex-col group w-full">
                {cardContent}
            </Card>
        </Link>
    );
  }

  return (
    <Card className="h-full flex flex-col opacity-60">
      {cardContent}
    </Card>
  );
}
