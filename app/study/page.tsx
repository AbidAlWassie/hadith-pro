import { Header } from "@/components/header"
import { StudyTools } from "@/components/study-tools"

export default function StudyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Personal Study Center</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Organize your hadith study with bookmarks, notes, and personalized study plans. Track your progress and
            build a deeper understanding of Islamic teachings.
          </p>
        </div>

        <StudyTools />
      </main>
    </div>
  )
}
