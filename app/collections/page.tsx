import { CollectionStats } from "@/components/collection-stats";
import { CollectionsOverview } from "@/components/collections-overview";
import { Header } from "@/components/header";

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent text-balance">
              Hadith Collections
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Explore the six major collections of hadith (Kutub as-Sittah) and
              other authentic sources
            </p>
          </div>

          <CollectionStats />
          <CollectionsOverview />
        </div>
      </main>
    </div>
  );
}
