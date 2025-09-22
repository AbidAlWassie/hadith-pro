import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, User, Calendar, Star, ArrowRight } from "lucide-react"

const collections = [
  {
    id: "bukhari",
    name: "Sahih Bukhari",
    fullName: "Al-Jami' al-Sahih",
    author: "Imam Bukhari",
    authorDates: "194-256 AH",
    totalHadith: 7563,
    authenticityRating: 100,
    description: "The most authentic collection of hadith after the Quran",
    books: 97,
    compilationPeriod: "16 years",
    status: "Complete",
    featured: true,
  },
  {
    id: "muslim",
    name: "Sahih Muslim",
    fullName: "Al-Musnad al-Sahih",
    author: "Imam Muslim",
    authorDates: "204-261 AH",
    totalHadith: 5362,
    authenticityRating: 99,
    description: "Second most authentic collection, known for systematic organization",
    books: 56,
    compilationPeriod: "15 years",
    status: "Complete",
    featured: true,
  },
  {
    id: "tirmidhi",
    name: "Jami' at-Tirmidhi",
    fullName: "Al-Jami' al-Kabir",
    author: "Imam at-Tirmidhi",
    authorDates: "209-279 AH",
    totalHadith: 3956,
    authenticityRating: 85,
    description: "Known for detailed grading and commentary on hadith",
    books: 46,
    compilationPeriod: "20 years",
    status: "Complete",
    featured: false,
  },
  {
    id: "abudawud",
    name: "Sunan Abu Dawud",
    fullName: "Al-Sunan",
    author: "Imam Abu Dawud",
    authorDates: "202-275 AH",
    totalHadith: 4800,
    authenticityRating: 80,
    description: "Focuses on legal hadith and jurisprudential matters",
    books: 43,
    compilationPeriod: "20 years",
    status: "Complete",
    featured: false,
  },
  {
    id: "nasai",
    name: "Sunan an-Nasa'i",
    fullName: "Al-Sunan al-Kubra",
    author: "Imam an-Nasa'i",
    authorDates: "215-303 AH",
    totalHadith: 5761,
    authenticityRating: 82,
    description: "Known for strict criteria in hadith authentication",
    books: 51,
    compilationPeriod: "25 years",
    status: "Complete",
    featured: false,
  },
  {
    id: "ibnmajah",
    name: "Sunan Ibn Majah",
    fullName: "Al-Sunan",
    author: "Imam Ibn Majah",
    authorDates: "209-273 AH",
    totalHadith: 4341,
    authenticityRating: 75,
    description: "Completes the six major collections (Kutub as-Sittah)",
    books: 37,
    compilationPeriod: "18 years",
    status: "Complete",
    featured: false,
  },
]

export function CollectionsOverview() {
  const featuredCollections = collections.filter((c) => c.featured)
  const otherCollections = collections.filter((c) => !c.featured)

  return (
    <div className="space-y-8">
      {/* Featured Collections */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Star className="h-5 w-5 text-secondary" />
          <h2 className="text-2xl font-bold text-foreground">Featured Collections</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {featuredCollections.map((collection) => (
            <Card key={collection.id} className="border-l-4 border-l-secondary">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-foreground">{collection.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{collection.fullName}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {collection.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{collection.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-secondary" />
                      <span className="text-foreground">{collection.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-secondary" />
                      <span className="text-muted-foreground">{collection.authorDates}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-secondary" />
                      <span className="text-muted-foreground">{collection.totalHadith} hadith</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-secondary" />
                      <span className="text-muted-foreground">{collection.books} books</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">Authenticity Rating</span>
                    <span className="text-sm font-medium text-secondary">{collection.authenticityRating}%</span>
                  </div>
                  <Progress value={collection.authenticityRating} className="h-2" />
                </div>

                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  Explore Collection
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Other Collections */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Other Major Collections</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherCollections.map((collection) => (
            <Card key={collection.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base text-foreground">{collection.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{collection.author}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {collection.authenticityRating}%
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed">{collection.description}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{collection.totalHadith} hadith</span>
                  <span>{collection.books} books</span>
                </div>

                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
