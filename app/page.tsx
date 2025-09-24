import { FeaturedHadith } from "@/components/featured-hadith";
import { HadithCollections } from "@/components/hadith-collections";
import { HadithSearch } from "@/components/hadith-search";
import { Header } from "@/components/header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <HadithSearch />
        </div>

        <div className="mb-16">
          <HadithCollections />
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Featured Hadith
          </h2>
          <FeaturedHadith />
        </div>
      </main>
    </div>
  );
}
