"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRandomHadith, type Hadith } from "@/lib/hadith-api";
import {
  BookOpen,
  Grid,
  Heart,
  List,
  Scale,
  Search,
  Star,
  Users,
  Volume2,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { HadithCard } from "./hadith-card";

const browseCategories = [
  {
    id: "faith",
    title: "Faith & Belief",
    icon: Heart,
    description: "Hadith about Iman, Tawhid, and Islamic creed",
    count: 1247,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "worship",
    title: "Worship & Prayer",
    icon: BookOpen,
    description: "Salah, Dhikr, and acts of worship",
    count: 2156,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "character",
    title: "Character & Ethics",
    icon: Users,
    description: "Akhlaq, manners, and moral conduct",
    count: 1834,
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    id: "law",
    title: "Islamic Law",
    icon: Scale,
    description: "Fiqh, legal rulings, and jurisprudence",
    count: 1923,
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: "prophetic",
    title: "Prophetic Guidance",
    icon: Zap,
    description: "Life lessons and guidance from the Prophet",
    count: 2847,
    color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    id: "social",
    title: "Social Relations",
    icon: Users,
    description: "Family, community, and social interactions",
    count: 1456,
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    gradient: "from-pink-500 to-rose-600",
  },
];

const collections = [
  { id: "bukhari", name: "Sahih Bukhari", count: 7563, authenticity: 100 },
  { id: "muslim", name: "Sahih Muslim", count: 5362, authenticity: 99 },
  { id: "tirmidhi", name: "Jami' at-Tirmidhi", count: 3956, authenticity: 85 },
  { id: "abudawud", name: "Sunan Abu Dawud", count: 4800, authenticity: 80 },
  { id: "nasai", name: "Sunan an-Nasa'i", count: 5761, authenticity: 82 },
  { id: "ibnmajah", name: "Sunan Ibn Majah", count: 4341, authenticity: 75 },
];

export function BrowseInterface() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sampleHadiths, setSampleHadiths] = useState<Hadith[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSampleHadiths = async () => {
    setIsLoading(true);
    try {
      const hadiths = await Promise.all([
        getRandomHadith(),
        getRandomHadith(),
        getRandomHadith(),
      ]);
      setSampleHadiths(hadiths);
    } catch (error) {
      console.error("Failed to load sample hadiths:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <Card className="border-2 border-border/50">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by topic, keyword, or Arabic text..."
                className="pl-10 h-12 text-lg border-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Select
                value={selectedCollection}
                onValueChange={setSelectedCollection}
              >
                <SelectTrigger className="w-48 h-12 border-2">
                  <SelectValue placeholder="All Collections" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Collections</SelectItem>
                  {collections.map((collection) => (
                    <SelectItem key={collection.id} value={collection.id}>
                      {collection.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex border-2 border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="categories" className="text-base">
            Browse by Topic
          </TabsTrigger>
          <TabsTrigger value="collections" className="text-base">
            Browse by Collection
          </TabsTrigger>
          <TabsTrigger value="recent" className="text-base">
            Recently Added
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-6">
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {browseCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.id}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/30"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg`}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                            {category.title}
                          </CardTitle>
                          <Badge className={`${category.color} mt-1`}>
                            {category.count} hadith
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {category.description}
                    </p>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                      Explore Category
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="collections" className="space-y-6">
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {collections.map((collection) => (
              <Card
                key={collection.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/30"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                        {collection.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {collection.count} hadith
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-muted-foreground">
                            {collection.authenticity}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${collection.authenticity}%` }}
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                      Browse Collection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">
              Recently Added Hadith
            </h3>
            <Button
              onClick={loadSampleHadiths}
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? "Loading..." : "Load Sample"}
            </Button>
          </div>

          {sampleHadiths.length > 0 ? (
            <div className="grid gap-6">
              {sampleHadiths.map((hadith) => (
                <HadithCard key={hadith.id} hadith={hadith} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Recent Hadith Loaded
              </h3>
              <p className="text-muted-foreground mb-4">
                Click "Load Sample" to see recently added hadith
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
