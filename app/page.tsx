import { FeaturedHadith } from "@/components/featured-hadith";
import { HadithSearch } from "@/components/hadith-search";
import { Header } from "@/components/header";
import { StudyCategories } from "@/components/study-categories";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-20 space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent text-balance leading-tight">
              Hadith Study Platform
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed font-medium">
              Explore authentic hadith with scholarly sources, translations, and
              comprehensive research tools for Islamic studies
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-full text-base font-semibold border border-emerald-200 dark:border-emerald-800">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              Authentic Sources
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-full text-base font-semibold border border-blue-200 dark:border-blue-800">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              Arabic & English
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-full text-base font-semibold border border-purple-200 dark:border-purple-800">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              Study Tools
            </div>
          </div>
        </div>

        <HadithSearch />

        <div className="grid lg:grid-cols-3 gap-16 mt-20">
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
