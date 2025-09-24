"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSavedHadiths } from "@/hooks/use-local-storage";
import type { Hadith } from "@/lib/hadith-api";
import {
  Bookmark,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Loader2,
  Share,
  Star,
  Volume2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

// Declare global puter object for TypeScript
declare global {
  interface Window {
    puter: {
      ai: {
        txt2speech: (text: string, options?: any) => Promise<HTMLAudioElement>;
      };
    };
  }
}

interface HadithCardProps {
  hadith: Hadith;
  showExplanation?: boolean;
  compact?: boolean;
  variant?: "default" | "featured";
}

export function HadithCard({
  hadith,
  showExplanation = false,
  compact = false,
  variant = "default",
}: HadithCardProps) {
  const [isExplanationOpen, setIsExplanationOpen] = useState(showExplanation);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    isHadithSaved,
    isHadithFavorited,
    toggleSavedHadith,
    toggleFavoriteHadith,
  } = useSavedHadiths();

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
    toggleSavedHadith(hadith.id);
    toast.success(
      isHadithSaved(hadith.id) ? "Removed from bookmarks" : "Added to bookmarks"
    );
  };

  const handleStar = () => {
    toggleFavoriteHadith(hadith.id);
    toast.success(
      isHadithFavorited(hadith.id)
        ? "Removed from favorites"
        : "Added to favorites"
    );
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

  const handlePlayAudio = async () => {
    console.log("[v0] Audio button clicked for hadith:", hadith.hadithNumber);

    if (currentAudio && isPlaying) {
      // Stop current audio
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
      setCurrentAudio(null);
      console.log("[v0] Stopped current audio");
      return;
    }

    setIsLoadingAudio(true);

    try {
      console.log(
        "[v0] Using Puter.js TTS for Arabic text:",
        hadith.textArabic.substring(0, 50) + "..."
      );

      if (!window.puter) {
        throw new Error("Puter.js not loaded");
      }

      const audio = await window.puter.ai.txt2speech(hadith.textArabic, {
        voice: "Zayd",
        engine: "neural",
        language: "ar-SA",
      });

      console.log("[v0] Puter.js TTS audio generated successfully");

      audio.onplay = () => {
        console.log("[v0] Audio started playing");
        setIsPlaying(true);
      };

      audio.onended = () => {
        console.log("[v0] Audio finished playing");
        setIsPlaying(false);
        setCurrentAudio(null);
      };

      audio.onerror = (e: any) => {
        console.error("[v0] Audio playback error:", e);
        toast.error("Failed to play audio");
        setIsPlaying(false);
        setCurrentAudio(null);
      };

      setCurrentAudio(audio);
      console.log("[v0] Starting audio playback");
      await audio.play();
      toast.success("Playing Arabic recitation");
    } catch (error) {
      console.error("[v0] Puter.js TTS Error:", error);
      toast.error("Failed to generate audio. Please try again.");
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const cardClassName =
    variant === "featured"
      ? "border-2 border-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden relative"
      : "group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-background to-background/50";

  const headerClassName =
    variant === "featured" ? "pb-6 relative z-10" : compact ? "pb-3" : "pb-4";

  return (
    <Card className={cardClassName}>
      {variant === "featured" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
        </>
      )}

      <CardHeader className={headerClassName}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                variant === "featured" ? "bg-primary/10 py-1.5" : "bg-muted/50"
              }`}
            >
              <BookOpen className="h-4 w-4 text-primary" />
              <span
                className={`font-semibold ${
                  variant === "featured" ? "text-primary" : "text-foreground"
                }`}
              >
                {hadith.collection}
              </span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground font-medium">
              {hadith.book}
            </span>
            <span className="text-muted-foreground">•</span>
            <span
              className={`font-mono px-2 py-0.5 rounded ${
                variant === "featured" ? "bg-muted/50" : "text-muted-foreground"
              }`}
            >
              #{hadith.hadithNumber}
            </span>
          </div>
          <Badge
            className={`${getGradeColor(hadith.grade)} border font-semibold ${
              variant === "featured" ? "px-4 py-2 text-sm" : "px-3 py-1"
            }`}
          >
            {hadith.grade}
          </Badge>
        </div>
      </CardHeader>

      <CardContent
        className={`space-y-6 ${
          variant === "featured" ? "space-y-8 relative z-10" : ""
        }`}
      >
        {/* Arabic Text */}
        <div
          className={`rounded-xl border-2 ${
            variant === "featured"
              ? "bg-gradient-to-br from-muted/40 via-muted/20 to-transparent p-8 rounded-2xl border-muted/30 shadow-inner relative overflow-hidden"
              : `bg-gradient-to-r from-muted/30 to-muted/10 border-muted/50 ${
                  compact ? "p-4" : "p-6"
                }`
          }`}
        >
          {variant === "featured" && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
          )}
          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-sm font-medium text-muted-foreground ${
                variant === "featured"
                  ? "font-semibold uppercase tracking-wide"
                  : ""
              }`}
            >
              Arabic Text
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-primary/10"
              onClick={handlePlayAudio}
              disabled={isLoadingAudio}
            >
              {isLoadingAudio ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Volume2
                  className={`h-4 w-4 ${isPlaying ? "text-primary" : ""}`}
                />
              )}
            </Button>
          </div>
          <p
            className={`font-arabic leading-loose text-right text-foreground ${
              variant === "featured"
                ? "text-2xl font-medium"
                : compact
                ? "text-lg"
                : "text-xl"
            }`}
          >
            {hadith.textArabic}
          </p>
        </div>

        {/* English Translation */}
        <div
          className={
            variant === "featured"
              ? "bg-gradient-to-br from-background via-muted/10 to-transparent p-8 rounded-2xl border-2 border-border/50 relative overflow-hidden"
              : "space-y-3"
          }
        >
          {variant === "featured" && (
            <>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500"></div>
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-3 text-lg">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full"></div>
                English Translation
              </h4>
            </>
          )}
          {variant !== "featured" && (
            <span className="text-sm font-medium text-muted-foreground">
              English Translation
            </span>
          )}
          <p
            className={`text-foreground leading-relaxed font-medium ${
              variant === "featured"
                ? "text-lg"
                : compact
                ? "text-base"
                : "text-lg"
            }`}
          >
            {hadith.text}
          </p>
        </div>

        {/* Explanation Section */}
        {hadith.explanation && (
          <>
            {variant === "featured" ? (
              <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent p-8 rounded-2xl border-2 border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
                <h4 className="font-bold text-foreground mb-4 flex items-center gap-3 text-lg">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Scholarly Explanation
                </h4>
                <p className="text-foreground leading-relaxed text-lg">
                  {hadith.explanation}
                </p>
              </div>
            ) : (
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
          </>
        )}

        {/* Narrator and Reference */}
        <div
          className={
            variant === "featured"
              ? "flex items-center gap-4"
              : "bg-muted/20 rounded-lg p-4 space-y-2"
          }
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Narrator:
            </span>
            <span
              className={`font-semibold text-foreground ${
                variant === "featured"
                  ? "text-lg bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full border border-primary/20"
                  : "text-sm"
              }`}
            >
              {hadith.narrator}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Reference:
            </span>
            <span
              className={`font-mono text-foreground rounded border ${
                variant === "featured"
                  ? "text-sm bg-muted/50 px-3 py-1.5 rounded-lg"
                  : "text-sm bg-background px-2 py-1"
              }`}
            >
              {hadith.reference}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex items-center justify-between pt-4 border-t-2 ${
            variant === "featured"
              ? "flex-col lg:flex-row gap-6 pt-8 border-gradient-to-r from-transparent via-border to-transparent"
              : ""
          }`}
        >
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStar}
              className={`hover:bg-yellow-100 hover:text-yellow-700 ${
                variant === "featured" ? "gap-2 dark:hover:bg-amber-900/20" : ""
              } ${
                isHadithFavorited(hadith.id)
                  ? "bg-yellow-100 text-yellow-700 dark:bg-amber-900/20"
                  : ""
              }`}
            >
              <Star
                className={`h-4 w-4 ${
                  isHadithFavorited(hadith.id) ? "fill-current" : ""
                }`}
              />
              {variant === "featured" && "Favorite"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`hover:bg-blue-100 hover:text-blue-700 ${
                variant === "featured" ? "gap-2 dark:hover:bg-blue-900/20" : ""
              } ${
                isHadithSaved(hadith.id)
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20"
                  : ""
              }`}
            >
              <Bookmark
                className={`h-4 w-4 ${
                  isHadithSaved(hadith.id) ? "fill-current" : ""
                }`}
              />
              {variant === "featured" && "Save"}
            </Button>
            {variant !== "featured" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="hover:bg-green-100 hover:text-green-700"
              >
                <Copy className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className={`hover:bg-green-100 hover:text-green-700 ${
                variant === "featured"
                  ? "gap-2 dark:hover:bg-green-900/20"
                  : "hover:bg-purple-100 hover:text-purple-700"
              }`}
            >
              <Share className="h-4 w-4" />
              {variant === "featured" && "Share"}
            </Button>
          </div>

          {!compact && (
            <Link
              href={`/browse/${hadith.collection.toLowerCase()}/${hadith.book
                .toLowerCase()
                .replace(/\s+/g, "-")}/${hadith.id}`}
            >
              <Button
                variant="outline"
                size="sm"
                className={`font-medium bg-transparent ${
                  variant === "featured"
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 hover:from-primary/90 hover:to-secondary/90 gap-2 font-semibold"
                    : ""
                }`}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
