import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bookmark,
  BookOpen,
  ExternalLink,
  Share,
  Sparkles,
  Star,
} from "lucide-react";

const featuredHadith = {
  id: "featured-1",
  title: "The Importance of Intentions",
  arabicText:
    "عَنْ أَمِيرِ الْمُؤْمِنِينَ أَبِي حَفْصٍ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ: إنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوْ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إلَى مَا هَاجَرَ إلَيْهِ",
  englishText:
    "On the authority of Amir al-Mu'minin, Abu Hafs Umar bin al-Khattab (ra), who said: I heard the Messenger of Allah (ﷺ) say: 'Actions are (judged) by motives (niyyah), so each man will have what he intended. Thus, he whose migration (hijrah) was to Allah and His Messenger, his migration is to Allah and His Messenger; but he whose migration was for some worldly thing he might gain, or for a wife he might marry, his migration is to that for which he migrated.'",
  collection: "Sahih Bukhari & Sahih Muslim",
  book: "Book of Revelation",
  hadithNumber: "1",
  narrator: "Umar ibn al-Khattab",
  grade: "Sahih",
  explanation:
    "This hadith is considered one of the most important in Islam as it establishes the fundamental principle that all actions are judged by their underlying intentions. It emphasizes the importance of sincerity (ikhlas) in worship and daily life.",
};

export function FeaturedHadith() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Featured Hadith</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
      </div>

      <Card className="border-l-4 border-l-emerald-500 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <CardTitle className="text-xl text-foreground">
                {featuredHadith.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">{featuredHadith.collection}</span>
                <span>•</span>
                <span>{featuredHadith.book}</span>
                <span>•</span>
                <span className="font-medium">
                  Hadith {featuredHadith.hadithNumber}
                </span>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 font-semibold">
              {featuredHadith.grade}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="arabic-text bg-gradient-to-br from-muted/30 to-muted/10 p-8 rounded-xl border border-border/50 shadow-inner">
            <p className="text-xl leading-loose font-medium">
              {featuredHadith.arabicText}
            </p>
          </div>

          <div className="english-text bg-gradient-to-br from-card to-muted/10 p-8 rounded-xl border border-border/50">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full"></div>
              Translation:
            </h4>
            <p className="text-foreground leading-relaxed text-lg">
              {featuredHadith.englishText}
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/30 dark:to-teal-950/20 p-8 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              Scholarly Explanation:
            </h4>
            <p className="text-foreground leading-relaxed text-lg">
              {featuredHadith.explanation}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-border/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Narrator:</span>
                <span className="text-sm font-semibold text-foreground bg-muted/50 px-3 py-1 rounded-full">
                  {featuredHadith.narrator}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-amber-100 dark:hover:bg-amber-900/20"
              >
                <Star className="h-4 w-4" />
                <span className="ml-1">Favorite</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-blue-100 dark:hover:bg-blue-900/20"
              >
                <Bookmark className="h-4 w-4" />
                <span className="ml-1">Save</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-green-100 dark:hover:bg-green-900/20"
              >
                <Share className="h-4 w-4" />
                <span className="ml-1">Share</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 hover:from-emerald-600 hover:to-teal-700"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="ml-1">View Details</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
