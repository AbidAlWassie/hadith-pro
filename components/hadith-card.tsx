import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Star, Share, Bookmark, ExternalLink, Copy } from "lucide-react"

interface HadithCardProps {
  hadith: {
    id: string
    arabicText: string
    englishText: string
    collection: string
    book: string
    hadithNumber: string
    narrator: string
    grade: string
    gradeColor?: "green" | "yellow" | "red" | "gray"
    explanation?: string
  }
  showExplanation?: boolean
  compact?: boolean
}

export function HadithCard({ hadith, showExplanation = false, compact = false }: HadithCardProps) {
  const getGradeColor = (grade: string) => {
    switch (grade.toLowerCase()) {
      case "sahih":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "hasan":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "da'if":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className={compact ? "pb-2" : "pb-3"}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-secondary" />
            <span className="font-medium text-foreground">{hadith.collection}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{hadith.book}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">Hadith {hadith.hadithNumber}</span>
          </div>
          <Badge className={getGradeColor(hadith.grade)}>{hadith.grade}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Arabic Text */}
        <div className={`arabic-text bg-muted/30 rounded-lg border ${compact ? "p-3" : "p-4"}`}>
          <p className={`leading-relaxed ${compact ? "text-base" : "text-lg"}`}>{hadith.arabicText}</p>
        </div>

        {/* English Translation */}
        <div className="english-text">
          <p className={`text-foreground leading-relaxed ${compact ? "text-sm" : ""}`}>{hadith.englishText}</p>
        </div>

        {/* Explanation (if provided and requested) */}
        {showExplanation && hadith.explanation && (
          <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-secondary" />
              Explanation:
            </h4>
            <p className="text-sm text-foreground leading-relaxed">{hadith.explanation}</p>
          </div>
        )}

        {/* Narrator and Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Narrator:</span>
            <span className="text-sm font-medium text-foreground">{hadith.narrator}</span>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
            {!compact && (
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
