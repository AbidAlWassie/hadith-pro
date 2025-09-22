"use client"

import { useState } from "react"
import { Search, Filter, BookOpen, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function HadithSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCollection, setSelectedCollection] = useState("")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedGrades, setSelectedGrades] = useState<string[]>([])
  const [selectedNarrators, setSelectedNarrators] = useState<string[]>([])

  const handleGradeChange = (grade: string, checked: boolean) => {
    if (checked) {
      setSelectedGrades([...selectedGrades, grade])
    } else {
      setSelectedGrades(selectedGrades.filter((g) => g !== grade))
    }
  }

  const handleNarratorChange = (narrator: string, checked: boolean) => {
    if (checked) {
      setSelectedNarrators([...selectedNarrators, narrator])
    } else {
      setSelectedNarrators(selectedNarrators.filter((n) => n !== narrator))
    }
  }

  const clearFilters = () => {
    setSelectedCollection("")
    setSelectedGrades([])
    setSelectedNarrators([])
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-secondary" />
            <h2 className="text-lg font-semibold text-foreground">Search Hadith</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by text, narrator, or topic..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bukhari">Sahih Bukhari</SelectItem>
                  <SelectItem value="muslim">Sahih Muslim</SelectItem>
                  <SelectItem value="tirmidhi">Jami' at-Tirmidhi</SelectItem>
                  <SelectItem value="abudawud">Sunan Abu Dawud</SelectItem>
                  <SelectItem value="nasai">Sunan an-Nasa'i</SelectItem>
                  <SelectItem value="ibnmajah">Sunan Ibn Majah</SelectItem>
                </SelectContent>
              </Select>

              <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>

              <Button className="bg-secondary hover:bg-secondary/90">Search</Button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCollection || selectedGrades.length > 0 || selectedNarrators.length > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedCollection && (
                <Badge variant="secondary" className="gap-1">
                  Collection: {selectedCollection}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCollection("")} />
                </Badge>
              )}
              {selectedGrades.map((grade) => (
                <Badge key={grade} variant="secondary" className="gap-1">
                  Grade: {grade}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleGradeChange(grade, false)} />
                </Badge>
              ))}
              {selectedNarrators.map((narrator) => (
                <Badge key={narrator} variant="secondary" className="gap-1">
                  Narrator: {narrator}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleNarratorChange(narrator, false)} />
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}

          {/* Advanced Filters */}
          <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
            <CollapsibleContent className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Advanced Filters</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Hadith Grades */}
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Hadith Grade</Label>
                    <div className="space-y-2">
                      {["Sahih", "Hasan", "Da'if", "Mawdu'"].map((grade) => (
                        <div key={grade} className="flex items-center space-x-2">
                          <Checkbox
                            id={grade}
                            checked={selectedGrades.includes(grade)}
                            onCheckedChange={(checked) => handleGradeChange(grade, checked as boolean)}
                          />
                          <Label htmlFor={grade} className="text-sm">
                            {grade}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Famous Narrators */}
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">Famous Narrators</Label>
                    <div className="space-y-2">
                      {["Abu Hurairah", "Aisha", "Ibn Umar", "Anas ibn Malik", "Abu Bakr"].map((narrator) => (
                        <div key={narrator} className="flex items-center space-x-2">
                          <Checkbox
                            id={narrator}
                            checked={selectedNarrators.includes(narrator)}
                            onCheckedChange={(checked) => handleNarratorChange(narrator, checked as boolean)}
                          />
                          <Label htmlFor={narrator} className="text-sm">
                            {narrator}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowAdvancedFilters(false)}>
                    Apply Filters
                  </Button>
                  <Button variant="ghost" onClick={clearFilters}>
                    Reset
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  )
}
