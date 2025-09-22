import { Header } from "@/components/header"
import { SourceDetails } from "@/components/source-details"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface SourcePageProps {
  params: {
    id: string
  }
}

export default function SourcePage({ params }: SourcePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Collections
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-4">Source Details</h1>
          <p className="text-lg text-muted-foreground">
            Detailed information about this hadith's authenticity, chain of narration, and scholarly context.
          </p>
        </div>

        <SourceDetails hadithId={params.id} />
      </main>
    </div>
  )
}
