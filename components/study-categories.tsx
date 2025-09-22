import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Heart, Scale, Zap, ArrowRight } from "lucide-react"

const categories = [
  {
    id: "faith",
    title: "Faith & Belief",
    icon: Heart,
    description: "Hadith about Iman, Tawhid, and Islamic creed",
    count: 1247,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  {
    id: "worship",
    title: "Worship & Prayer",
    icon: BookOpen,
    description: "Salah, Dhikr, and acts of worship",
    count: 2156,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  {
    id: "character",
    title: "Character & Ethics",
    icon: Users,
    description: "Akhlaq, manners, and moral conduct",
    count: 1834,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  {
    id: "law",
    title: "Islamic Law",
    icon: Scale,
    description: "Fiqh, legal rulings, and jurisprudence",
    count: 1923,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
  {
    id: "prophetic",
    title: "Prophetic Guidance",
    icon: Zap,
    description: "Life lessons and guidance from the Prophet",
    count: 2847,
    color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  },
]

const recentStudies = [
  {
    title: "The Concept of Tawakkul in Hadith",
    author: "Dr. Ahmad Hassan",
    date: "2 days ago",
    hadithCount: 23,
  },
  {
    title: "Prophetic Medicine: Health Guidance",
    author: "Dr. Fatima Al-Zahra",
    date: "1 week ago",
    hadithCount: 45,
  },
  {
    title: "Social Justice in Islamic Teachings",
    author: "Prof. Muhammad Ali",
    date: "2 weeks ago",
    hadithCount: 67,
  },
]

export function StudyCategories() {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Study Categories</h2>
        <div className="space-y-3">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <IconComponent className="h-5 w-5 text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-foreground text-sm">{category.title}</h3>
                        <Badge variant="secondary" className={category.color}>
                          {category.count}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{category.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View All Categories
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Recent Studies */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Studies</h2>
        <div className="space-y-3">
          {recentStudies.map((study, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground text-sm leading-tight">{study.title}</h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>by {study.author}</span>
                    <span>{study.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {study.hadithCount} hadith
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View All Studies
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
