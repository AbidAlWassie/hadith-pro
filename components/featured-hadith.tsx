"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRandomHadith, type Hadith } from "@/lib/hadith-api";
import { RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HadithCard } from "./hadith-card";

export function FeaturedHadith() {
  const [featuredHadith, setFeaturedHadith] = useState<Hadith | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

      <HadithCard
        hadith={featuredHadith}
        variant="featured"
        showExplanation={true}
      />
    </div>
  );
}
