"use client";

import { HadithCard } from "@/components/hadith-card";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSavedHadiths } from "@/hooks/use-local-storage";
import { getRandomHadith, type Hadith } from "@/lib/hadith-api";
import { Bookmark, Heart, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function SavedHadithsPage() {
  const { savedHadiths, favoriteHadiths } = useSavedHadiths();
  const [savedHadithData, setSavedHadithData] = useState<Hadith[]>([]);
  const [favoriteHadithData, setFavoriteHadithData] = useState<Hadith[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch the actual hadith data by IDs
    // For demo purposes, we'll generate some sample data
    const loadSampleData = async () => {
      setIsLoading(true);
      try {
        const sampleSaved = await Promise.all(
          Array.from({ length: Math.min(savedHadiths.length, 3) }, () =>
            getRandomHadith()
          )
        );
        const sampleFavorites = await Promise.all(
          Array.from({ length: Math.min(favoriteHadiths.length, 3) }, () =>
            getRandomHadith()
          )
        );
        setSavedHadithData(sampleSaved);
        setFavoriteHadithData(sampleFavorites);
      } catch (error) {
        console.error("Failed to load sample data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (savedHadiths.length > 0 || favoriteHadiths.length > 0) {
      loadSampleData();
    } else {
      setIsLoading(false);
    }
  }, [JSON.stringify(savedHadiths), JSON.stringify(favoriteHadiths)]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Header />
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            My Saved Hadiths
          </h1>
        </div>

        <Card className="border-2 border-dashed border-muted animate-pulse">
          <CardContent className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              Loading your saved hadiths...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          My Saved Hadiths
        </h1>
      </div>

      <Tabs defaultValue="bookmarks" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="bookmarks" className="text-base gap-2">
            <Bookmark className="h-4 w-4" />
            Bookmarks ({savedHadiths.length})
          </TabsTrigger>
          <TabsTrigger value="favorites" className="text-base gap-2">
            <Star className="h-4 w-4" />
            Favorites ({favoriteHadiths.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bookmarks" className="space-y-6">
          {savedHadiths.length === 0 ? (
            <Card className="p-12 text-center">
              <Bookmark className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Bookmarked Hadiths
              </h3>
              <p className="text-muted-foreground mb-4">
                Start bookmarking hadiths to save them for later reading
              </p>
              <Button variant="outline" onClick={() => window.history.back()}>
                Browse Hadiths
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  You have {savedHadiths.length} bookmarked hadith
                  {savedHadiths.length !== 1 ? "s" : ""}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
              <div className="grid gap-6">
                {savedHadithData.map((hadith) => (
                  <HadithCard key={hadith.id} hadith={hadith} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          {favoriteHadiths.length === 0 ? (
            <Card className="p-12 text-center">
              <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Favorite Hadiths
              </h3>
              <p className="text-muted-foreground mb-4">
                Mark hadiths as favorites to create your personal collection
              </p>
              <Button variant="outline" onClick={() => window.history.back()}>
                Browse Hadiths
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  You have {favoriteHadiths.length} favorite hadith
                  {favoriteHadiths.length !== 1 ? "s" : ""}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
              <div className="grid gap-6">
                {favoriteHadithData.map((hadith) => (
                  <HadithCard key={hadith.id} hadith={hadith} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
