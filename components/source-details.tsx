import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Calendar,
  ExternalLink,
  Info,
  MapPin,
  User,
} from "lucide-react";

interface SourceDetailsProps {
  hadithId: string;
}

const sourceData = {
  collection: {
    name: "Sahih Bukhari",
    fullName: "Al-Jami' al-Sahih",
    author: "Imam Muhammad ibn Ismail al-Bukhari",
    authorDates: "194-256 AH / 810-870 CE",
    compilationDate: "846-862 CE",
    totalHadith: 7563,
    description:
      "Considered the most authentic collection of hadith after the Quran. Imam Bukhari spent 16 years collecting and verifying these narrations.",
    methodology:
      "Bukhari applied extremely strict criteria for accepting hadith, requiring continuous chains of reliable narrators and meeting specific conditions for authenticity.",
  },
  book: {
    name: "Book of Revelation",
    arabicName: "كتاب بدء الوحي",
    number: 1,
    hadithCount: 7,
    description:
      "This book discusses the beginning of divine revelation to Prophet Muhammad (ﷺ).",
  },
  hadith: {
    number: 1,
    inBook: 1,
    grade: "Sahih",
    narrator: "Umar ibn al-Khattab",
    narratorInfo: {
      fullName: "Abu Hafs Umar ibn al-Khattab",
      title: "Amir al-Mu'minin (Commander of the Faithful)",
      dates: "584-644 CE",
      relationship: "Second Caliph of Islam",
      reliability:
        "Extremely reliable narrator, known for his precision and memory",
    },
  },
  chainOfNarration: [
    {
      name: "Umar ibn al-Khattab",
      role: "Companion - Direct witness",
      reliability: "Sahabi (Companion)",
      dates: "584-644 CE",
    },
    {
      name: "Alqamah ibn Waqqas",
      role: "Tabi'i - Student of companions",
      reliability: "Thiqah (Trustworthy)",
      dates: "Unknown-85 AH",
    },
    {
      name: "Muhammad ibn Ibrahim",
      role: "Tabi' al-Tabi'in",
      reliability: "Thiqah (Trustworthy)",
      dates: "Unknown-120 AH",
    },
    {
      name: "Yahya ibn Sa'id",
      role: "Early scholar",
      reliability: "Thiqah (Trustworthy)",
      dates: "143-198 AH",
    },
    {
      name: "Imam Bukhari",
      role: "Compiler",
      reliability: "Hafiz (Master scholar)",
      dates: "194-256 AH",
    },
  ],
};

export function SourceDetails({ hadithId }: SourceDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Collection Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-secondary" />
            Collection Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                {sourceData.collection.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {sourceData.collection.fullName}
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-secondary" />
                  <span className="text-foreground">
                    {sourceData.collection.author}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">
                    {sourceData.collection.authorDates}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">
                    {sourceData.collection.totalHadith} total hadith
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">
                About this Collection
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {sourceData.collection.description}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium text-foreground mb-2">
              Compilation Methodology
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {sourceData.collection.methodology}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Book Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-secondary" />
            Book Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground">
                {sourceData.book.name}
              </h3>
              <p className="text-sm text-muted-foreground arabic-text">
                {sourceData.book.arabicName}
              </p>
            </div>
            <div className="text-right">
              <Badge variant="outline">Book {sourceData.book.number}</Badge>
              <p className="text-sm text-muted-foreground mt-1">
                {sourceData.book.hadithCount} hadith
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {sourceData.book.description}
          </p>
        </CardContent>
      </Card>

      {/* Chain of Narration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-secondary" />
            Chain of Narration (Isnad)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sourceData.chainOfNarration.map((narrator, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-sm font-medium text-secondary">
                    {index + 1}
                  </div>
                  {index < sourceData.chainOfNarration.length - 1 && (
                    <div className="w-px h-8 bg-border mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-foreground">
                      {narrator.name}
                    </h4>
                    <Badge variant="secondary" className="text-xs">
                      {narrator.reliability}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {narrator.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {narrator.dates}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Primary Narrator Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-secondary" />
            Primary Narrator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground">
                {sourceData.hadith.narratorInfo.fullName}
              </h3>
              <p className="text-sm text-secondary font-medium">
                {sourceData.hadith.narratorInfo.title}
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {sourceData.hadith.narratorInfo.reliability}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">
                    {sourceData.hadith.narratorInfo.dates}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">
                    {sourceData.hadith.narratorInfo.relationship}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">
                Reliability Assessment
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {sourceData.hadith.narratorInfo.reliability}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-secondary" />
            Additional Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              View Complete Collection
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <User className="h-4 w-4 mr-2" />
              Learn About the Author
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Cross-Reference in Other Collections
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
