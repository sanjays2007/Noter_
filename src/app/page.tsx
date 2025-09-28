import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { AITools } from "@/components/features/ai-tools";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
              The Next-Gen Productivity Suite,{" "}
              <span className="text-primary">Powered by AI</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              NOTER is a modern, responsive AI-powered productivity website with a clean UI and UX. Enhance your workflow with smart suggestions, real-time collaboration, and powerful AI tools.
            </p>
          </div>
        </div>
        <AITools />
      </main>
      <Footer />
    </div>
  );
}
