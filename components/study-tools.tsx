"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, NotebookPen, Target, Plus, Edit, Trash2, Clock, CheckCircle } from "lucide-react"

const bookmarkedHadith = [
  {
    id: "1",
    title: "The Importance of Intentions",
    collection: "Sahih Bukhari",
    hadithNumber: "1",
    dateBookmarked: "2024-01-15",
    tags: ["Intentions", "Actions", "Faith"],
  },
  {
    id: "2",
    title: "The Pillars of Islam",
    collection: "Sahih Muslim",
    hadithNumber: "16",
    dateBookmarked: "2024-01-14",
    tags: ["Pillars", "Islam", "Foundation"],
  },
]

const studyNotes = [
  {
    id: "1",
    hadithId: "1",
    title: "Personal Reflection on Intentions",
    content:
      "This hadith reminds me that every action should be done with the right intention. It's not just about what we do, but why we do it. This applies to my daily prayers, work, and relationships.",
    dateCreated: "2024-01-15",
    tags: ["Personal", "Reflection"],
  },
  {
    id: "2",
    hadithId: "2",
    title: "Historical Context Notes",
    content:
      "This hadith was narrated during a time when the Muslim community was establishing the fundamental practices of Islam. Understanding this context helps appreciate its significance.",
    dateCreated: "2024-01-14",
    tags: ["Historical", "Context"],
  },
]

const studyPlans = [
  {
    id: "1",
    title: "40 Hadith Nawawi Study",
    description: "Complete study of Imam Nawawi's collection of 40 essential hadith",
    totalHadith: 40,
    completedHadith: 12,
    targetDate: "2024-03-01",
    status: "active",
  },
  {
    id: "2",
    title: "Hadith on Character Building",
    description: "Focus on hadith related to Islamic ethics and moral character",
    totalHadith: 25,
    completedHadith: 25,
    targetDate: "2024-01-01",
    status: "completed",
  },
]

export function StudyTools() {
  const [activeTab, setActiveTab] = useState("bookmarks")
  const [newNote, setNewNote] = useState({ title: "", content: "", tags: "" })
  const [newPlan, setNewPlan] = useState({ title: "", description: "", targetDate: "" })

  const handleAddNote = () => {
    // Add note logic here
    setNewNote({ title: "", content: "", tags: "" })
  }

  const handleAddPlan = () => {
    // Add study plan logic here
    setNewPlan({ title: "", description: "", targetDate: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <NotebookPen className="h-5 w-5 text-secondary" />
        <h2 className="text-2xl font-bold text-foreground">Study Tools</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="plans">Study Plans</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        {/* Bookmarks Tab */}
        <TabsContent value="bookmarks" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Saved Hadith</h3>
            <Badge variant="secondary">{bookmarkedHadith.length} bookmarked</Badge>
          </div>

          <div className="space-y-3">
            {bookmarkedHadith.map((hadith) => (
              <Card key={hadith.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{hadith.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{hadith.collection}</span>
                        <span>•</span>
                        <span>Hadith {hadith.hadithNumber}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {hadith.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Study Notes</h3>
            <Button size="sm" className="bg-secondary hover:bg-secondary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>

          {/* Add New Note Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Create New Note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Note title..."
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <Textarea
                placeholder="Write your notes, reflections, or insights..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                rows={4}
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Tags (comma separated)"
                  value={newNote.tags}
                  onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                  className="flex-1"
                />
                <Button onClick={handleAddNote} className="bg-secondary hover:bg-secondary/90">
                  Save Note
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Existing Notes */}
          <div className="space-y-3">
            {studyNotes.map((note) => (
              <Card key={note.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h4 className="font-medium text-foreground">{note.title}</h4>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{note.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{note.dateCreated}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Study Plans Tab */}
        <TabsContent value="plans" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Study Plans</h3>
            <Button size="sm" className="bg-secondary hover:bg-secondary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Plan
            </Button>
          </div>

          {/* Create New Plan Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Create Study Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Plan title..."
                value={newPlan.title}
                onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
              />
              <Textarea
                placeholder="Plan description..."
                value={newPlan.description}
                onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                rows={3}
              />
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={newPlan.targetDate}
                  onChange={(e) => setNewPlan({ ...newPlan, targetDate: e.target.value })}
                  className="flex-1"
                />
                <Button onClick={handleAddPlan} className="bg-secondary hover:bg-secondary/90">
                  Create Plan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Existing Plans */}
          <div className="space-y-3">
            {studyPlans.map((plan) => (
              <Card key={plan.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">{plan.title}</h4>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                    <Badge
                      variant={plan.status === "completed" ? "default" : "secondary"}
                      className={
                        plan.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : ""
                      }
                    >
                      {plan.status === "completed" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {plan.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground">
                        {plan.completedHadith}/{plan.totalHadith} hadith
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-secondary h-2 rounded-full transition-all"
                        style={{ width: `${(plan.completedHadith / plan.totalHadith) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Target: {plan.targetDate}</span>
                      <span>{Math.round((plan.completedHadith / plan.totalHadith) * 100)}% complete</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Study Progress</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-secondary" />
                  Reading Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Hadith Read</span>
                  <span className="font-medium text-foreground">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="font-medium text-foreground">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Study Streak</span>
                  <span className="font-medium text-foreground">12 days</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-4 w-4 text-secondary" />
                  Goals & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Plans Completed</span>
                  <span className="font-medium text-foreground">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Notes Created</span>
                  <span className="font-medium text-foreground">28</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Bookmarks Saved</span>
                  <span className="font-medium text-foreground">67</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
