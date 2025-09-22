import { Header } from "@/components/header"
import { CollectionsOverview } from "@/components/collections-overview"

export default function SourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Hadith Collections & Sources</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore the authentic collections of hadith compiled by renowned Islamic scholars. Each collection has been
            meticulously verified and includes detailed source information and chains of narration.
          </p>
        </div>

        <CollectionsOverview />
      </main>
    </div>
  )
}
