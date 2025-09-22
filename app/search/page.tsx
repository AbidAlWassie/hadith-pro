import { Header } from "@/components/header"
import { HadithSearch } from "@/components/hadith-search"
import { SearchResults } from "@/components/search-results"

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <HadithSearch />
          <SearchResults />
        </div>
      </main>
    </div>
  )
}
