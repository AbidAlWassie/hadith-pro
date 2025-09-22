import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Star, Share, Bookmark } from "lucide-react"

interface HadithResult {
  id: string
  arabicText: string
  englishText: string
  collection: string
  book: string
  hadithNumber: string
  narrator: string
  grade: string
  gradeColor: "green" | "yellow" | "red" | "gray"
}

const mockResults: HadithResult[] = [
  {
    id: "1",
    arabicText:
      "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    englishText:
      "Abu Hurairah reported: The Messenger of Allah, peace and blessings be upon him, said: 'Verily, deeds are only with intentions. Verily, every person will have only what they intended.'",
    collection: "Sahih Bukhari",
    book: "Book of Revelation",
    hadithNumber: "1",
    narrator: "Abu Hurairah",
    grade: "Sahih",
    gradeColor: "green",
  },
  {
    id: "2",
    arabicText:
      "عَنْ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: بَيْنَمَا نَحْنُ عِنْدَ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ ذَاتَ يَوْمٍ إِذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيدُ بَيَاضِ الثِّيَابِ",
    englishText:
      "Umar ibn al-Khattab reported: While we were sitting with the Messenger of Allah, peace and blessings be upon him, one day there appeared before us a man whose clothes were exceedingly white...",
    collection: "Sahih Muslim",
    book: "Book of Faith",
    hadithNumber: "8",
    narrator: "Umar ibn al-Khattab",
    grade: "Sahih",
    gradeColor: "green",
  },
]

export function SearchResults() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Search Results</h2>
        <p className="text-sm text-muted-foreground">Found {mockResults.length} hadith</p>
      </div>

      <div className="space-y-4">
        {mockResults.map((hadith) => (
          <Card key={hadith.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-secondary" />
                  <span className="font-medium text-sm text-foreground">{hadith.collection}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{hadith.book}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">Hadith {hadith.hadithNumber}</span>
                </div>
                <Badge
                  variant={hadith.gradeColor === "green" ? "default" : "secondary"}
                  className={
                    hadith.gradeColor === "green"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : ""
                  }
                >
                  {hadith.grade}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Arabic Text */}
              <div className="arabic-text bg-muted/30 p-4 rounded-lg">
                <p className="text-lg leading-relaxed">{hadith.arabicText}</p>
              </div>

              {/* English Translation */}
              <div className="english-text">
                <p className="text-foreground leading-relaxed">{hadith.englishText}</p>
              </div>

              {/* Narrator and Actions */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Narrator:</span>
                  <span className="text-sm font-medium text-foreground">{hadith.narrator}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
