"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchHadiths, type Hadith } from "@/lib/hadith-api";
import { BookOpen, Filter, Loader2, Search, X } from "lucide-react";
import { useState } from "react";
import { HadithCard } from "./hadith-card";

export function HadithSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedNarrators, setSelectedNarrators] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Hadith[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleGradeChange = (grade: string, checked: boolean) => {
    if (checked) {
      setSelectedGrades([...selectedGrades, grade]);
    } else {
      setSelectedGrades(selectedGrades.filter((g) => g !== grade));
    }
  };

  const handleNarratorChange = (narrator: string, checked: boolean) => {
    if (checked) {
      setSelectedNarrators([...selectedNarrators, narrator]);
    } else {
      setSelectedNarrators(selectedNarrators.filter((n) => n !== narrator));
    }
  };

  const clearFilters = () => {
    setSelectedCollection("");
    setSelectedGrades([]);
    setSelectedNarrators([]);
  };

  const handleSearch = async () => {
    if (
      !searchQuery.trim() &&
      !selectedCollection &&
      selectedGrades.length === 0 &&
      selectedNarrators.length === 0
    ) {
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchHadiths(searchQuery, {
        collection: selectedCollection,
        grade: selectedGrades,
        narrator: selectedNarrators,
      });
      setSearchResults(results);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full border-2 border-border/50 shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Search Hadith Database
                </h2>
                <p className="text-muted-foreground">
                  Search through thousands of authenticated hadith
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by text, narrator, topic, or Arabic keywords..."
                  className="pl-12 h-12 text-lg border-2 focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <div className="flex gap-3">
                <Select
                  value={selectedCollection}
                  onValueChange={setSelectedCollection}
                >
                  <SelectTrigger className="w-48 h-12 border-2">
                    <SelectValue placeholder="Select Collection" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bukhari">Sahih al-Bukhari</SelectItem>
                    <SelectItem value="muslim">Sahih Muslim</SelectItem>
                    <SelectItem value="tirmidhi">Jami' at-Tirmidhi</SelectItem>
                    <SelectItem value="abudawud">Sunan Abu Dawud</SelectItem>
                    <SelectItem value="nasai">Sunan an-Nasa'i</SelectItem>
                    <SelectItem value="ibnmajah">Sunan Ibn Majah</SelectItem>
                  </SelectContent>
                </Select>

                <Collapsible
                  open={showAdvancedFilters}
                  onOpenChange={setShowAdvancedFilters}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 px-4 border-2 bg-transparent"
                    >
                      <Filter className="h-5 w-5 mr-2" />
                      Filters
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>

                <Button
                  className="bg-primary hover:bg-primary/90 h-12 px-8 text-lg font-semibold"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCollection ||
              selectedGrades.length > 0 ||
              selectedNarrators.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 p-4 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium text-muted-foreground">
                  Active filters:
                </span>
                {selectedCollection && (
                  <Badge variant="secondary" className="gap-1 px-3 py-1">
                    Collection: {selectedCollection}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedCollection("")}
                    />
                  </Badge>
                )}
                {selectedGrades.map((grade) => (
                  <Badge
                    key={grade}
                    variant="secondary"
                    className="gap-1 px-3 py-1"
                  >
                    Grade: {grade}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleGradeChange(grade, false)}
                    />
                  </Badge>
                ))}
                {selectedNarrators.map((narrator) => (
                  <Badge
                    key={narrator}
                    variant="secondary"
                    className="gap-1 px-3 py-1"
                  >
                    Narrator: {narrator}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleNarratorChange(narrator, false)}
                    />
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-2"
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Advanced Filters */}
            <Collapsible
              open={showAdvancedFilters}
              onOpenChange={setShowAdvancedFilters}
            >
              <CollapsibleContent className="space-y-4">
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Advanced Search Filters
                  </h3>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Hadith Grades */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium text-foreground">
                        Authenticity Grade
                      </Label>
                      <div className="space-y-3">
                        {[
                          {
                            value: "Sahih",
                            label: "Sahih (Authentic)",
                            color: "bg-emerald-100 text-emerald-800",
                          },
                          {
                            value: "Hasan",
                            label: "Hasan (Good)",
                            color: "bg-blue-100 text-blue-800",
                          },
                          {
                            value: "Da'if",
                            label: "Da'if (Weak)",
                            color: "bg-yellow-100 text-yellow-800",
                          },
                          {
                            value: "Mawdu'",
                            label: "Mawdu' (Fabricated)",
                            color: "bg-red-100 text-red-800",
                          },
                        ].map((grade) => (
                          <div
                            key={grade.value}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox
                              id={grade.value}
                              checked={selectedGrades.includes(grade.value)}
                              onCheckedChange={(checked) =>
                                handleGradeChange(
                                  grade.value,
                                  checked as boolean
                                )
                              }
                            />
                            <Label
                              htmlFor={grade.value}
                              className="text-sm font-medium cursor-pointer"
                            >
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${grade.color}`}
                              >
                                {grade.label}
                              </span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Famous Narrators */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium text-foreground">
                        Famous Narrators
                      </Label>
                      <div className="space-y-3">
                        {[
                          "Abu Hurairah (رضي الله عنه)",
                          "Aisha (رضي الله عنها)",
                          "Ibn Umar (رضي الله عنهما)",
                          "Anas ibn Malik (رضي الله عنه)",
                          "Abu Bakr (رضي الله عنه)",
                        ].map((narrator) => (
                          <div
                            key={narrator}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox
                              id={narrator}
                              checked={selectedNarrators.includes(narrator)}
                              onCheckedChange={(checked) =>
                                handleNarratorChange(
                                  narrator,
                                  checked as boolean
                                )
                              }
                            />
                            <Label
                              htmlFor={narrator}
                              className="text-sm font-medium cursor-pointer"
                            >
                              {narrator}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowAdvancedFilters(false)}
                      className="px-6"
                    >
                      Apply Filters
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={clearFilters}
                      className="px-6"
                    >
                      Reset All
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>

      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-foreground">
              Search Results ({searchResults.length} found)
            </h3>
            {searchResults.length > 0 && (
              <Button variant="outline" size="sm">
                Export Results
              </Button>
            )}
          </div>

          {searchResults.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground text-lg">
                No hadith found matching your search criteria. Try adjusting
                your filters or search terms.
              </p>
            </Card>
          ) : (
            <div className="grid gap-6">
              {searchResults.map((hadith) => (
                <HadithCard key={hadith.id} hadith={hadith} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
