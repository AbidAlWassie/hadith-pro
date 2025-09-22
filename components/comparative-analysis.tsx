import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BookOpen, GitCompare, ExternalLink } from "lucide-react"

const comparisonData = {
  topic: "The Importance of Prayer",
  hadithComparisons: [
    {
      id: "1",
      collection: "Sahih Bukhari",
      hadithNumber: "528",
      arabicText: "عَنْ أَبِي هُرَيْرَةَ أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم قَالَ الصَّلاَةُ خَيْرٌ مَوْضُوعٌ",
      englishText:
        "Abu Hurairah reported that the Messenger of Allah (ﷺ) said: 'Prayer is the best thing that has been established.'",
      grade: "Sahih",
      context: "Emphasizes the supreme importance of prayer in Islam",
    },
    {
      id: "2",
      collection: "Sahih Muslim",
      hadithNumber: "232",
      arabicText: "عَنْ جَابِرٍ قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم بَيْنَ الرَّجُلِ وَبَيْنَ الشِّرْكِ وَالْكُفْرِ تَرْكُ الصَّلاَةِ",
      englishText:
        "Jabir reported that the Messenger of Allah (ﷺ) said: 'Between a man and polytheism and unbelief is the abandonment of prayer.'",
      grade: "Sahih",
      context: "Warns about the serious consequences of abandoning prayer",
    },
    {
      id: "3",
      collection: "Jami' at-Tirmidhi",
      hadithNumber: "2616",
      arabicText: "عَنْ أَبِي هُرَيْرَةَ قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم أَوَّلُ مَا يُحَاسَبُ بِهِ الْعَبْدُ يَوْمَ الْقِيَامَةِ الصَّلاَةُ",
      englishText:
        "Abu Hurairah reported that the Messenger of Allah (ﷺ) said: 'The first thing for which a servant will be held accountable on the Day of Judgment is prayer.'",
      grade: "Hasan",
      context: "Highlights prayer as the first matter to be judged in the afterlife",
    },
  ],
  scholarlyAnalysis: {
    commonThemes: [
      "Prayer is fundamental to Islamic faith",
      "Abandoning prayer has serious spiritual consequences",
      "Prayer will be the first act judged in the afterlife",
    ],
    differences: [
      "Bukhari emphasizes prayer's excellence, while Muslim warns about abandonment",
      "Tirmidhi focuses on accountability in the afterlife",
      "Different narrators provide various perspectives on the same core message",
    ],
    conclusion:
      "These hadith collectively establish prayer as the cornerstone of Islamic practice, with both positive encouragement and serious warnings about its importance.",
  },
}

export function ComparativeAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <GitCompare className="h-5 w-5 text-secondary" />
        <h2 className="text-2xl font-bold text-foreground">Comparative Analysis</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-secondary" />
            Topic: {comparisonData.topic}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Comparing {comparisonData.hadithComparisons.length} hadith from different collections on this topic
          </p>
        </CardContent>
      </Card>

      {/* Hadith Comparisons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Related Hadith</h3>
        {comparisonData.hadithComparisons.map((hadith, index) => (
          <Card key={hadith.id} className="border-l-4 border-l-secondary/50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">#{index + 1}</Badge>
                  <span className="font-medium text-foreground">{hadith.collection}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">Hadith {hadith.hadithNumber}</span>
                </div>
                <Badge
                  className={
                    hadith.grade === "Sahih"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
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

              {/* Context */}
              <div className="bg-secondary/10 p-3 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>Context:</strong> {hadith.context}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scholarly Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Scholarly Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Common Themes */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Common Themes</h4>
            <ul className="space-y-2">
              {comparisonData.scholarlyAnalysis.commonThemes.map((theme, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-muted-foreground">{theme}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Differences */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Key Differences</h4>
            <ul className="space-y-2">
              {comparisonData.scholarlyAnalysis.differences.map((difference, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-muted-foreground">{difference}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Conclusion */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Conclusion</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {comparisonData.scholarlyAnalysis.conclusion}
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="bg-transparent">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Detailed Analysis
            </Button>
            <Button variant="outline" className="bg-transparent">
              <BookOpen className="h-4 w-4 mr-2" />
              Find More Related Hadith
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
