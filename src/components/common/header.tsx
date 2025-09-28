"use client";

import Link from "next/link";
import { Search, Bot, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";


const toolsLinks = [
  { name: "Smart Notes", href: "/tools/smart-notes" },
  { name: "Note Categorization", href: "/tools/note-categorization" },
  { name: "Task Generation", href: "/tools/task-generation" },
  { name: "Web Clipper", href: "/tools/web-clipper" },
  { name: "Semantic Search", href: "/tools/semantic-search" },
  { name: "Text Rewrite", href: "/tools/text-rewrite" },
  { name: "Online Notepad", href: "/tools/online-notepad" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "My Subjects", href: "/subjects" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Bot className="h-6 w-6 mr-2 text-primary" />
          <Link href="/" className="font-bold text-lg tracking-tight">
            NOTER
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.name}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 focus:outline-none">
              Tools <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {toolsLinks.map((link) => (
                <DropdownMenuItem key={link.name} asChild>
                  <Link href={link.href}>{link.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="relative w-full max-w-sm hidden sm:block">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 h-9"
              aria-label="Search"
            />
          </div>
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="py-6">
                <Link href="/" className="flex items-center mb-6">
                  <Bot className="h-6 w-6 mr-2 text-primary" />
                  <span className="font-bold text-lg tracking-tight">NOTER</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="transition-colors hover:text-foreground text-muted-foreground"
                    >
                      {link.name}
                    </Link>
                  ))}
                   <p className="font-medium text-foreground">Tools</p>
                  {toolsLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="transition-colors hover:text-foreground text-muted-foreground pl-4"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
