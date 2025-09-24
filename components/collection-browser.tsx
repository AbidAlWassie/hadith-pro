"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  searchHadiths,
  type Hadith,
  type HadithCollection,
} from "@/lib/hadith-api";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HadithCard } from "./hadith-card";

interface CollectionBrowserProps {
  collection: HadithCollection;
}

export function CollectionBrowser({ collection }: CollectionBrowserProps) {
  const [chapters, setChapters] = useState<
    Array<{ number: number; title: string; hadithCount: number }>
  >([]);
  const [recentHadiths, setRecentHadiths] = useState<Hadith[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadCollectionData();
  }, [collection.id]);

  const loadCollectionData = async () => {
    setIsLoading(true);
    try {
      const chapterCount = getChapterCount(collection.id);
      const generatedChapters = Array.from(
        { length: chapterCount },
        (_, i) => ({
          number: i + 1,
          title: getChapterTitle(collection.id, i + 1),
          hadithCount:
            Math.floor(collection.totalHadiths / chapterCount) +
            Math.floor(Math.random() * 50),
        })
      );
      setChapters(generatedChapters);

      const sampleHadiths = await searchHadiths("", {
        collection: collection.id,
      });
      setRecentHadiths(sampleHadiths.slice(0, 6));
    } catch (error) {
      console.error("Failed to load collection data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getChapterCount = (collectionId: string): number => {
    const chapterCounts: Record<string, number> = {
      bukhari: 97,
      muslim: 56,
      abudawud: 43,
      tirmidhi: 50,
      nasai: 51,
      ibnmajah: 37,
    };
    return chapterCounts[collectionId] || 50;
  };

  const getChapterTitle = (
    collectionId: string,
    chapterNumber: number
  ): string => {
    const commonChapters = [
      "Revelation",
      "Faith",
      "Knowledge",
      "Ablution",
      "Prayer",
      "Prayer Times",
      "Call to Prayer",
      "Friday Prayer",
      "Fear Prayer",
      "Eid Prayer",
      "Witr Prayer",
      "Seeking Rain",
      "Eclipse",
      "Prostration",
      "Shortening Prayer",
      "Funerals",
      "Zakat",
      "Hajj",
      "Umrah",
      "Fasting",
      "Night Prayer",
      "Virtues of Prayer",
      "Mosques",
      "Marriage",
      "Divorce",
      "Expenditures",
      "Food",
      "Sacrifice",
      "Drinks",
      "Medicine",
      "Dress",
      "Good Manners",
      "Asking Permission",
      "Invocations",
      "Hunting",
      "Slaughtering",
      "Al-Adha Festival",
      "Drinks",
      "Patients",
      "Medicine",
      "Dress",
      "Good Manners",
      "Invocations",
      "Divine Will",
      "Oaths and Vows",
      "Inheritance",
      "Limits",
      "Blood Money",
      "Dealing with Apostates",
      "Forcing",
      "Tricks",
      "Interpretation of Dreams",
    ];

    return commonChapters[chapterNumber - 1] || `Chapter ${chapterNumber}`;
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading collection...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Browse
        </Button>
      </div>

      {/* Collection Stats */}
      <Card className="border-2 border-border/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {collection.totalHadiths.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Hadiths</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {chapters.length}
              </div>
              <div className="text-sm text-muted-foreground">Chapters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Authenticity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {collection.compilationPeriod.split("-")[0]}
              </div>
              <div className="text-sm text-muted-foreground">Compiled</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chapters Grid */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Browse by Chapter
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => (
            <Link
              key={chapter.number}
              href={`/browse/${collection.id}/${chapter.number}`}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base text-foreground group-hover:text-primary transition-colors">
                          Chapter {chapter.number}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {chapter.hadithCount} hadiths
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {chapter.title}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Hadiths from Collection */}
      {recentHadiths.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Recent Hadiths from {collection.name}
          </h2>
          <div className="grid gap-6">
            {recentHadiths.map((hadith) => (
              <HadithCard key={hadith.id} hadith={hadith} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
