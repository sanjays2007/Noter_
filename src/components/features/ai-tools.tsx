"use client";

import React from 'react';
import { NotebookText, Tags, ListTodo, Scissors, BrainCircuit, PenSquare, FilePenLine, Rocket } from 'lucide-react';

import { FeatureCard } from './feature-card';

const features = [
  {
    id: 'smart-notes',
    title: 'Smart Notes',
    description: 'Automatically summarize your notes using AI.',
    icon: NotebookText,
    href: '/tools/smart-notes',
  },
  {
    id: 'note-categorization',
    title: 'Note Categorization',
    description: 'AI auto-categorizes and tags your notes.',
    icon: Tags,
    href: '/tools/note-categorization',
  },
  {
    id: 'task-generation',
    title: 'Task Generation',
    description: 'AI generates to-do lists and prioritizes tasks.',
    icon: ListTodo,
    href: '/tools/task-generation',
  },
  {
    id: 'web-clipper',
    title: 'Web Clipper',
    description: 'Save web content with AI summarization.',
    icon: Scissors,
    href: '/tools/web-clipper',
  },
  {
    id: 'semantic-search',
    title: 'Semantic Search',
    description: 'AI semantic search across notes & documents.',
    icon: BrainCircuit,
    href: '/tools/semantic-search',
  },
  {
    id: 'text-rewrite',
    title: 'Text Rewrite',
    description: 'Rewrite or paraphrase text with AI.',
    icon: PenSquare,
    href: '/tools/text-rewrite',
  },
  {
    id: 'online-notepad',
    title: 'Online Notepad',
    description: 'Rich-text editor with AI writing assistance.',
    icon: FilePenLine,
    href: '/tools/online-notepad',
  },
  {
    id: 'placeholder-8',
    title: 'More On The Way',
    description: 'More AI features are coming soon.',
    icon: Rocket,
  }
];

export function AITools() {
  return (
    <section className="container pb-12 md:pb-24">
       <div id="solutions" className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Core AI Toolkit</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">A suite of AI-powered tools to supercharge your productivity. Click on any card to try the feature.</p>
        </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            href={feature.href}
          />
        ))}
      </div>
    </section>
  );
}
