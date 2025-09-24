"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  searchHadiths,
  type Hadith,
  type HadithCollection,
} from "@/lib/hadith-api";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HadithCard } from "./hadith-card";

interface ChapterBrowserProps {
  collection: HadithCollection;
  chapterNumber: number;
}

export function ChapterBrowser({
  collection,
  chapterNumber,
}: ChapterBrowserProps) {
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const hadithsPerPage = 10;

  useEffect(() => {
    loadChapterHadiths();
  }, [collection.id, chapterNumber, currentPage]);

  const loadChapterHadiths = async () => {
    setIsLoading(true);
    try {
      const allHadiths = await searchHadiths("", { collection: collection.id });

      const startIndex = (chapterNumber - 1) * 50;
      const endIndex = chapterNumber * 50;
      const chapterHadiths = allHadiths.slice(startIndex, endIndex);

      const startPageIndex = (currentPage - 1) * hadithsPerPage;
      const endPageIndex = startPageIndex + hadithsPerPage;
      const paginatedHadiths = chapterHadiths.slice(
        startPageIndex,
        endPageIndex
      );

      setHadiths(paginatedHadiths);
      setTotalPages(Math.ceil(chapterHadiths.length / hadithsPerPage));
    } catch (error) {
      console.error("Failed to load chapter hadiths:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getChapterTitle = (chapterNumber: number): string => {
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
    ];

    return commonChapters[chapterNumber - 1] || `Chapter ${chapterNumber}`;
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading chapter hadiths...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {collection.name}
        </Button>

        <div className="flex items-center gap-2">
          {chapterNumber > 1 && (
            <Link href={`/browse/${collection.id}/${chapterNumber - 1}`}>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
            </Link>
          )}
          <Link href={`/browse/${collection.id}/${chapterNumber + 1}`}>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Chapter Info */}
      <Card className="border-2 border-border/50">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              {getChapterTitle(chapterNumber)}
            </h2>
            <p className="text-muted-foreground">
              Chapter {chapterNumber} of {collection.name} • {hadiths.length}{" "}
              hadiths on this page
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hadiths */}
      {hadiths.length > 0 ? (
        <div className="space-y-6">
          {hadiths.map((hadith) => (
            <HadithCard key={hadith.id} hadith={hadith} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            No hadiths found for this chapter.
          </p>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
