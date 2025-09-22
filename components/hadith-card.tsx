"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Hadith } from "@/lib/hadith-api";
import {
  Bookmark,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Share,
  Star,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface HadithCardProps {
  hadith: Hadith;
  showExplanation?: boolean;
  compact?: boolean;
}

export function HadithCard({
  hadith,
  showExplanation = false,
  compact = false,
}: HadithCardProps) {
  const [isExplanationOpen, setIsExplanationOpen] = useState(showExplanation);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  const getGradeColor = (grade: string) => {
    switch (grade.toLowerCase()) {
      case "sahih":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800";
      case "hasan":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800";
      case "da'if":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800";
      case "mawdu'":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800";
    }
  };

  const handleCopy = async () => {
    const textToCopy = `${hadith.textArabic}\n\n${hadith.text}\n\nNarrator: ${hadith.narrator}\nReference: ${hadith.reference}`;
    await navigator.clipboard.writeText(textToCopy);
    toast.success("Hadith copied to clipboard");
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(
      isBookmarked ? "Removed from bookmarks" : "Added to bookmarks"
    );
  };

  const handleStar = () => {
    setIsStarred(!isStarred);
    toast.success(isStarred ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Hadith from ${hadith.collection}`,
        text: hadith.text,
        url: window.location.href,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-background to-background/50">
      <CardHeader className={compact ? "pb-3" : "pb-4"}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">
                {hadith.collection}
              </span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground font-medium">
              {hadith.book}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              #{hadith.hadithNumber}
            </span>
          </div>
          <Badge
            className={`${getGradeColor(
              hadith.grade
            )} border font-semibold px-3 py-1`}
          >
            {hadith.grade}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Arabic Text */}
        <div
          className={`bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border-2 border-muted/50 ${
            compact ? "p-4" : "p-6"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Arabic Text
            </span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
          <p
            className={`font-arabic leading-loose text-right ${
              compact ? "text-lg" : "text-xl"
            } text-foreground`}
          >
            {hadith.textArabic}
          </p>
        </div>

        {/* English Translation */}
        <div className="space-y-3">
          <span className="text-sm font-medium text-muted-foreground">
            English Translation
          </span>
          <p
            className={`text-foreground leading-relaxed ${
              compact ? "text-base" : "text-lg"
            } font-medium`}
          >
            {hadith.text}
          </p>
        </div>

        {/* Explanation Section */}
        {hadith.explanation && (
          <Collapsible
            open={isExplanationOpen}
            onOpenChange={setIsExplanationOpen}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-12 bg-transparent"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Scholarly Explanation
                </span>
                {isExplanationOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                <p className="text-foreground leading-relaxed">
                  {hadith.explanation}
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Narrator and Reference */}
        <div className="bg-muted/20 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Narrator:
            </span>
            <span className="text-sm font-semibold text-foreground">
              {hadith.narrator}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Reference:
            </span>
            <span className="text-sm font-mono text-foreground bg-background px-2 py-1 rounded border">
              {hadith.reference}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t-2">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStar}
              className={`hover:bg-yellow-100 hover:text-yellow-700 ${
                isStarred ? "bg-yellow-100 text-yellow-700" : ""
              }`}
            >
              <Star className={`h-4 w-4 ${isStarred ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`hover:bg-blue-100 hover:text-blue-700 ${
                isBookmarked ? "bg-blue-100 text-blue-700" : ""
              }`}
            >
              <Bookmark
                className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="hover:bg-green-100 hover:text-green-700"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="hover:bg-purple-100 hover:text-purple-700"
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>

          {!compact && (
            <Button
              variant="outline"
              size="sm"
              className="font-medium bg-transparent"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
