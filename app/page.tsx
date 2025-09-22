import { FeaturedHadith } from "@/components/featured-hadith";
import { HadithSearch } from "@/components/hadith-search";
import { Header } from "@/components/header";
import { StudyCategories } from "@/components/study-categories";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent text-balance leading-tight">
              Hadith Study Platform
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Explore authentic hadith with scholarly sources, translations, and
              comprehensive research tools for Islamic studies
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Authentic Sources
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Arabic & English
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Study Tools
            </div>
          </div>
        </div>

        <HadithSearch />

        <div className="grid lg:grid-cols-3 gap-12 mt-16">
          <div className="lg:col-span-2">
            <FeaturedHadith />
          </div>
          <div>
            <StudyCategories />
          </div>
        </div>
      </main>
    </div>
  );
}
