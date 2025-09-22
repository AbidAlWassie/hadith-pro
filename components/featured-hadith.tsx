"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getRandomHadith, type Hadith } from "@/lib/hadith-api";
import {
  Bookmark,
  BookOpen,
  ExternalLink,
  RefreshCw,
  Share,
  Sparkles,
  Star,
  Volume2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function FeaturedHadith() {
  const [featuredHadith, setFeaturedHadith] = useState<Hadith | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    loadRandomHadith();
  }, []);

  const loadRandomHadith = async () => {
    setIsLoading(true);
    try {
      const hadith = await getRandomHadith();
      setFeaturedHadith(hadith);
    } catch (error) {
      console.error("Failed to load hadith:", error);
      toast.error("Failed to load featured hadith");
    } finally {
      setIsLoading(false);
    }
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
    if (!featuredHadith) return;

    if (navigator.share) {
      await navigator.share({
        title: `Featured Hadith from ${featuredHadith.collection}`,
        text: featuredHadith.text,
        url: window.location.href,
      });
    } else {
      const textToCopy = `${featuredHadith.textArabic}\n\n${featuredHadith.text}\n\nNarrator: ${featuredHadith.narrator}\nReference: ${featuredHadith.reference}`;
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Hadith copied to clipboard");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-xl shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Featured Hadith
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border via-border/50 to-transparent"></div>
        </div>

        <Card className="border-2 border-dashed border-muted animate-pulse">
          <CardContent className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading featured hadith...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!featuredHadith) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-xl shadow-lg">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Featured Hadith
          </h2>
          <p className="text-muted-foreground mt-1">
            Daily inspiration from authentic Islamic teachings
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadRandomHadith}
          disabled={isLoading}
          className="gap-2 bg-transparent"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          New Hadith
        </Button>
      </div>

      <Card className="border-2 border-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-50"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>

        <CardHeader className="pb-6 relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-primary">
                    {featuredHadith.collection}
                  </span>
                </div>
                <span>•</span>
                <span className="font-medium">{featuredHadith.book}</span>
                <span>•</span>
                <span className="font-mono bg-muted/50 px-2 py-0.5 rounded">
                  #{featuredHadith.hadithNumber}
                </span>
              </div>
            </div>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 font-semibold px-4 py-2 text-sm">
              {featuredHadith.grade}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 relative z-10">
          {/* Arabic Text */}
          <div className="bg-gradient-to-br from-muted/40 via-muted/20 to-transparent p-8 rounded-2xl border-2 border-muted/30 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Arabic Text
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-primary/10"
              >
                <Volume2 className="h-4 w-4 text-primary" />
              </Button>
            </div>
            <p className="text-2xl leading-loose font-arabic text-right text-foreground font-medium">
              {featuredHadith.textArabic}
            </p>
          </div>

          {/* English Translation */}
          <div className="bg-gradient-to-br from-background via-muted/10 to-transparent p-8 rounded-2xl border-2 border-border/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500"></div>
            <h4 className="font-bold text-foreground mb-4 flex items-center gap-3 text-lg">
              <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full"></div>
              English Translation
            </h4>
            <p className="text-foreground leading-relaxed text-lg font-medium">
              {featuredHadith.text}
            </p>
          </div>

          {/* Explanation */}
          {featuredHadith.explanation && (
            <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent p-8 rounded-2xl border-2 border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-3 text-lg">
                <BookOpen className="h-6 w-6 text-primary" />
                Scholarly Explanation
              </h4>
              <p className="text-foreground leading-relaxed text-lg">
                {featuredHadith.explanation}
              </p>
            </div>
          )}

          {/* Narrator and Actions */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-8 border-t-2 border-gradient-to-r from-transparent via-border to-transparent">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Narrator:
                </span>
                <span className="text-lg font-bold text-foreground bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full border border-primary/20">
                  {featuredHadith.narrator}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Reference:
                </span>
                <span className="text-sm font-mono text-foreground bg-muted/50 px-3 py-1.5 rounded-lg border">
                  {featuredHadith.reference}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStar}
                className={`hover:bg-amber-100 hover:text-amber-700 dark:hover:bg-amber-900/20 gap-2 ${
                  isStarred
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20"
                    : ""
                }`}
              >
                <Star
                  className={`h-4 w-4 ${isStarred ? "fill-current" : ""}`}
                />
                Favorite
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={`hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 gap-2 ${
                  isBookmarked
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20"
                    : ""
                }`}
              >
                <Bookmark
                  className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
                />
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/20 gap-2"
              >
                <Share className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 hover:from-primary/90 hover:to-secondary/90 gap-2 font-semibold"
              >
                <ExternalLink className="h-4 w-4" />
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
