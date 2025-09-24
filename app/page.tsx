import { FeaturedHadith } from "@/components/featured-hadith";
import { HadithCollections } from "@/components/hadith-collections";
import { HadithSearch } from "@/components/hadith-search";
import { Header } from "@/components/header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <HadithSearch />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <HadithCollections />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Featured Hadith
              </h2>
              <FeaturedHadith />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
