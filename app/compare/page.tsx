import { Header } from "@/components/header"
import { ComparativeAnalysis } from "@/components/comparative-analysis"

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Comparative Analysis</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Compare hadith across different collections to gain deeper insights into Islamic teachings. Analyze common
            themes, differences, and scholarly interpretations.
          </p>
        </div>

        <ComparativeAnalysis />
      </main>
    </div>
  )
}
